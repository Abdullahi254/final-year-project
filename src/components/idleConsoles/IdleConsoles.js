import React, { useState, useEffect } from 'react'
import Navigation from '../navigation/Navigation'
import { useAuth } from '../../contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ConsoleInfo from '../consoleInfo/ConsoleInfo'
import { projectFireStore } from '../../firebase'

function IdleConsoles() {
    const { logout, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [consoles, setConsoles] = useState([])
    const history = useHistory()
    useEffect(() => {
        async function getConsoles() {
            try {
                const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
                const idleConsoles = data.data().myConsoles
                setConsoles(idleConsoles)
            } catch (er) {
                console.log(er)
            }
        }
        getConsoles()
    }, [currentUser])
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

    async function statusHandler(status,index){
        try{
            console.log(status,index)
            const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
            const consoleArray = data.data().myConsoles
            consoleArray[index].active = status
            await projectFireStore.collection('consoles').doc(currentUser.uid).set({
                myConsoles:[...consoleArray]
            })
            setConsoles(consoleArray) 
        }catch(er){
            console.log('did not set active status',er)
        }
    }

    return (
        <div className="ActiveConsoles">
            <Navigation onLogout={handleLogout} />
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {
                    consoles.map((obj, index) => {
                        return (
                            !obj.active?<ConsoleInfo name={obj.name} key={index} setActive={(status)=>statusHandler(status,index)} addIcon/>:null
                        )
                    })
                }
            </Container>
        </div>
    )
}

export default IdleConsoles
