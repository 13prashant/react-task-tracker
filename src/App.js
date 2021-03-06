import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AddTask from './components/AddTask';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from './components/Footer';
import About from './components/About'


function App() {

  const [showAddButton, setShowAddButton] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter(task => task.id !== id))
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: await JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map(task => (
      task.id === id ? { ...task, reminder: data.reminder } : task
    )))
  }

  return (
    <Router>
      <div className="container">
        <Header showAddButton={() => setShowAddButton(!showAddButton)} addTask={showAddButton} />

        <Route path='/' exact render={() => (
          <>
            {showAddButton && <AddTask onAdd={addTask} />}
            {
              tasks.length > 0 ?
                <Tasks
                  onToggle={toggleReminder}
                  onDelete={deleteTask}
                  tasks={tasks}
                />
                :
                'There are no tasks.'
            }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
