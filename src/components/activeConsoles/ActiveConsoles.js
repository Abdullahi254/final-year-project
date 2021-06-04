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
        // fetching consoles data from firebase
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
    // handles logout logic on logout button click
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
    //change console state from active to idle and viceversa
    async function statusHandler(status,index){
        try{
   
            const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
            const consoleArray = data.data().myConsoles
            consoleArray[index].active = status
            await projectFireStore.collection('consoles').doc(currentUser.uid).set({
                ...data.data(),
                myConsoles:[...consoleArray]
            })
            setConsoles(consoleArray) 
        }catch(er){
            console.log('did not set active status',er)
        }
    }
// the function below takes time information from ConsoleInfo, which is later fed into the QrComponent to produce a qrcode
    function qrCodeHandler(h,m,s,index){
        showQrComponent(true)
        setStartHour(h)
        setStartMinute(m)
        setStartSecond(s)
        setQrConsole(consoles[index])
    }
//this function also take time info and sends it to the payment page via url parameter together with price/min charges
    function paymmentHandler(h,m,index){
        const day = new Date()
        const hoursPlayed = day.getHours() - h
        const minutesPlayed = day.getMinutes() - m
        const totalMinutesPlayed = (hoursPlayed * 60) + minutesPlayed
        console.log('total minutes played '+totalMinutesPlayed)
        history.push(`/payment/console/${index}/${totalMinutesPlayed}/${consoles[index].price}`)
    }
//handles unmounting of qrcomponent on click of close button
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
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {
                    consoles.map((obj, index) => {
                        return (
                            obj.active ?<ConsoleInfo name={obj.name} key={index} showIcons setActive={(status)=>statusHandler(status,index)}
                            qrCodeHandler={(h,m,s)=>qrCodeHandler(h,m,s,index)} pay={(h,m)=>paymmentHandler(h,m,index)}/>:null
                        )
                    })
                }
            </Container>
        </div>
    )
}

export default ActiveConsoles
