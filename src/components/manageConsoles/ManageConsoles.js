import React,{useState} from 'react'
import Navigation from '../navigation/Navigation'
import ConsoleDetails from './consoleDetails/ConsoleDetails'
import {useAuth} from '../../contexts/AuthContext'
import {Alert} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import './ManageConsoles.css'
function ManageConsoles() {
    const { logout } = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()
    async function handleLogout() {
        try {
            setError('')
            await logout()
            history.push('/login')
        }
        catch (err) {
            setError('Failed to Logout')
            console.log(err)
        }
    }
    function updateConsole(e){
        e.preventDefault()
    }
    return (
        <div className="ManageConsoles">
            <Navigation onLogout={handleLogout} />
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center',}}>
                <ConsoleDetails name="my console" brand="Playstation" generation="Playstation 4" updateConsole={updateConsole} />
                <ConsoleDetails name="my console" brand="Playstation" generation="Playstation 4" updateConsole={updateConsole} />
                <ConsoleDetails name="my console" brand="Playstation" generation="Playstation 4" updateConsole={updateConsole} />
                <ConsoleDetails name="my console" brand="Playstation" generation="Playstation 4" updateConsole={updateConsole} />
            </Container>
        </div>
    )
}

export default ManageConsoles
