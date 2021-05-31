import React,{useState} from 'react'
import './Wallet.css'
import Navigation from '../navigation/Navigation'
import Balance from '../balance/Balance'
import Statements from '../statements/Statements'
import { useHistory } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
function Wallet() {
    const [error, setError] = useState('')
    const history = useHistory()
    const { logout} = useAuth()
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
    return (
        <div>
            <Navigation onLogout={handleLogout}/>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Balance/>
            <Statements/>
        </div>
    )
}

export default Wallet
