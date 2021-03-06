import Button from "./Button"
import { useLocation } from 'react-router-dom'

const Header = ({ showAddButton, addTask }) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            { location.pathname === '/' &&
                <Button
                    onClick={showAddButton}
                    color={addTask ? 'red' : 'green'}
                    text={addTask ? 'Close' : 'Add'}
                />
            }
        </header>
    )
}

export default Header
