import {useState} from 'react'
import AddTask from './components/AddTask';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
 

function App() {

  const [showAddButton, setShowAddButton] = useState(false)

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: `Doctor's Appointment`,
      day: 'Feb 5th at 2:30 pm',
      reminder: true
    },
    {
      id: 2,
      text: `Meeting at school`,
      day: 'Feb 6th at 2:30 pm',
      reminder: true
    },
    {
      id: 3,
      text: `Food Shopping`,
      day: 'Feb 6th at 4:30 pm',
      reminder: false
    }
  ])

  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task=> task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map(task=>(
      task.id === id ? { ...task, reminder: !task.reminder } : task
    )))
  }

  return (
    <div className="container">
      <Header showAddButton= {()=>setShowAddButton(!showAddButton)} addTask={showAddButton} />
      {showAddButton && <AddTask onAdd = {addTask} />}
      {
        tasks.length > 0 ?
        <Tasks 
        onToggle= {toggleReminder}
        onDelete = {deleteTask}
        tasks={tasks}
      />
      :
      'There are no tasks.'
      }
    </div>
  );
}

export default App;
