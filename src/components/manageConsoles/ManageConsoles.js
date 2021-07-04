import React,{useState,useEffect} from 'react'
import ConsoleDetails from './consoleDetails/ConsoleDetails'
import ConsoleForm from '../consoleForm/ConsoleForm'
import {useAuth} from '../../contexts/AuthContext'
import {projectFireStore} from '../../firebase'
import firebase from "firebase/app"
import {Container, Alert} from 'react-bootstrap'
import './ManageConsoles.css'

function ManageConsoles() {
    const [consoles,setConsoles] = useState([])
    const {currentUser} = useAuth()
    const [update,setUpdate] = useState(false)
    const [successMessage,setSuccesstMessage] = useState('')
    const [error,setErrorMessage] = useState('')
    const [show, setShow] = useState(false)
    useEffect(()=>{
        //fetch name, brand and generation from database
        async function getData(){
            try{
                const doc = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
                setConsoles(doc.data().myConsoles)
            }catch(er){
                console.log(er)
            }
        }
        getData()
    },[update,currentUser])
    
   async function updateConsole(e,data,index){
        e.preventDefault()
        /// updating the database with new console data
        
        setConsoles(prevInfo=>{
            prevInfo.splice(index,1,{...data})
            return [...prevInfo]
        })
        try{
            const doc = projectFireStore.collection('consoles').doc(currentUser.uid)
            await doc.update({myConsoles:[...consoles]})
            setSuccesstMessage('Successfuly Updated Console!')
            setShow(true)
        }catch(error){
            setErrorMessage("Error Saving Console!")
            setShow(true)
            console.log(error)
        }
    }
  
    function newConsoleHandler(){
        setTimeout(()=>{
            setUpdate(!update)
        },3000)
    }
    async function deleteConsoleHandler(e,index){
        //delete element from array in firestore
        e.preventDefault();
        const consoleObj = consoles[index]
        console.log(consoles[index])  
        try{
            const doc = projectFireStore.collection('consoles').doc(currentUser.uid)
            await doc.update({myConsoles:firebase.firestore.FieldValue.arrayRemove(consoleObj)})
            const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
            setConsoles(data.data().myConsoles)
            setSuccesstMessage('Successfuly deleted Console!')
            setShow(true)
            console.log('deleted')
        }catch(error){
            console.log(error)
            setErrorMessage("Error Deleting Console!")
            setShow(true)
        }
    }
    // close the alert message div
    function closeMessageHandler(){
        setShow(false)
    }
    return (
        <div className="ManageConsoles">
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center',}} className="mt-3">
                {show && successMessage && <Alert variant="success" className="text-center" dismissible onClose={closeMessageHandler}>{successMessage}</Alert>}
                {show && error && <Alert variant="danger" className="text-center" dismissible onClose={closeMessageHandler}> {error}</Alert>}
                <h4>LIST OF YOUR CONSOLES: </h4>
                {   consoles.length < 1 ? <i className="text-center p-5">No Consoles Available!</i>:
                    consoles.map((val,index)=>{
                        return (
                            <ConsoleDetails name={val.name} brand={val.brand} generation={val.generation} price={val.price} updateConsole={(e,data)=>updateConsole(e,data,index)}  key={index} delete={(e)=>deleteConsoleHandler(e,index)}/>
                        )
                    })
                } 
                <h4>ADD A NEW CONSOLE</h4>
                <ConsoleForm clicked={newConsoleHandler}/>
            </Container>
        </div>
    )
}

export default ManageConsoles
