import React,{useState} from 'react'
import "./ActiveConsoles.css"
import Navigation from '../navigation/Navigation'
import {useAuth} from '../../contexts/AuthContext'
import {Alert} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {Container} from 'react-bootstrap'
// import ConsoleForm from '../consoleForm/ConsoleForm'
import ConsoleInfo from '../consoleInfo/ConsoleInfo'
function ActiveConsoles() {
    const {logout} = useAuth()
    const [error,setError] = useState('')
    const history = useHistory()
    async function handleLogout (){
        try{
            setError('')
            await logout()
            history.push('/login')
        }
        catch(err){
            setError('Failed to Logout')
            console.log(err)
        }
    }
    return (
        <div className="ActiveConsoles">
            <Navigation onLogout={handleLogout}/>
            {error&&<Alert variant="danger" className="text-center">{error}</Alert>}
            <Container style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                {/* <ConsoleForm/> */}
                <ConsoleInfo/>
                <ConsoleInfo/>
                <ConsoleInfo/>
                <ConsoleInfo/>
            </Container>
        </div>
    )
}

export default ActiveConsoles
