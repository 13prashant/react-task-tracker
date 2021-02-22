import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <div>
            {
                tasks.map(task => (
                    <Task  onToggle={onToggle} onDelete = {onDelete} key={task.id} task={task} />
                ))
            }
        </div>
    )
}

export default Tasks
