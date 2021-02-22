import Button from "./Button"

const Header = ({ showAddButton, addTask }) => {

    return (
        <header className='header'>
          <h1>Task Tracker</h1>
          <Button 
            onClick={showAddButton} 
            color= {addTask ? 'red' : 'green'} 
            text={addTask ? 'Close' : 'Add'}
            />
        </header>
    )
}

export default Header
