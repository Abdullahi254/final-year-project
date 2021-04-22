import React, { useState, useEffect } from 'react'
import "./ActiveConsoles.css"
import Navigation from '../navigation/Navigation'
import { useAuth } from '../../contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ConsoleInfo from '../consoleInfo/ConsoleInfo'
import { projectFireStore } from '../../firebase'
import QrComponent from '../qrComponent/QrComponent'
function ActiveConsoles() {
    const { logout, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [consoles, setConsoles] = useState([])
    const [qrComponent,showQrComponent]  = useState(false)
    const [startHour, setStartHour] = useState(0)
    const [startMinute, setStartMinute] = useState(0)
    const [startSecond, setStartSecond] = useState(0)
    const [qrConsole,setQrConsole] = useState('')
    const history = useHistory()
    useEffect(() => {  
        async function getConsoles() {
            try { 
                const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
                const activeConsoles = await data.data().myConsoles
                setConsoles(activeConsoles)
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

    function qrCodeHandler(h,m,s,index){
        showQrComponent(true)
        setStartHour(h)
        setStartMinute(m)
        setStartSecond(s)
        setQrConsole(consoles[index])
    }

    function closeQrComponentHandler(){
        showQrComponent(false)
    }

    return (
        <div className="ActiveConsoles">
            {
                qrComponent ?<QrComponent show={qrComponent} close={closeQrComponentHandler} name={qrConsole.name} hour={startHour} 
                minutes={startMinute} seconds={startSecond} price={qrConsole.price}/>:null
            }
            <Navigation onLogout={handleLogout} />
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {
                    consoles.map((obj, index) => {
                        return (
                            obj.active ?<ConsoleInfo name={obj.name} key={index} showIcons setActive={(status)=>statusHandler(status,index)}
                            qrCodeHandler={(h,m,s)=>qrCodeHandler(h,m,s,index)}/>:null
                        )
                    })
                }
            </Container>
        </div>
    )
}

export default ActiveConsoles
