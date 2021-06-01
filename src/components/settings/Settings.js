import React,{useState} from 'react'
import Navigation from '../navigation/Navigation'
import {Alert} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import SettingNav from './settingNav/SettingNav'
import { Switch, Route} from 'react-router-dom'
import ManageConsoles from '../manageConsoles/ManageConsoles'
function Settings() {
    const { logout } = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()

    //handles logout logic
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
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Navigation onLogout={handleLogout} />
            <SettingNav/>


            <Switch>
                <Route exact path="/settings/consoles" component={ManageConsoles}/>
            </Switch>
        </div>
    )
}

export default Settings
