import React,{useState,useEffect} from 'react'
import ConsoleDetails from './consoleDetails/ConsoleDetails'
import ConsoleForm from '../consoleForm/ConsoleForm'
import {useAuth} from '../../contexts/AuthContext'
import {projectFireStore} from '../../firebase'
import firebase from "firebase/app"
import {Container} from 'react-bootstrap'
import './ManageConsoles.css'

function ManageConsoles() {
    const [dummyInfo,setDummyInfo] = useState([])
    const {currentUser} = useAuth()
    const [update,setUpdate] = useState(false)
    useEffect(()=>{
        //fetch name, brand and generation from database
        async function getData(){
            try{
                const doc = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
                setDummyInfo(doc.data().myConsoles)
            }catch(er){
                console.log(er)
            }
        }
        getData()
    },[update,currentUser])
    
    const [name,setName] = useState([])
    const [brand,setBrand] = useState([])
    const [generation,setGeneration] = useState([])
    const [price,setPrice]= useState([])

   async function updateConsole(e,index){
        e.preventDefault()
        /// updating the database
        
        setDummyInfo(prevInfo=>{
            prevInfo.splice(index,1,{
                name:name[index],
                brand:brand[index],
                generation:generation[index],
                price:price[index]
            })
            return [...prevInfo]
        })
        try{
            const doc = projectFireStore.collection('consoles').doc(currentUser.uid)
            await doc.update({myConsoles:[...dummyInfo]})
        }catch(error){
            console.log(error)
        }
    }
    function updateName (e,index){
        setName(prev=>{
            prev.splice(index,1,e.target.value)
            return [...prev]
        })     
    }
    function updateBrand (e,index){
        setBrand(prev=>{
            prev.splice(index,1,e.target.value)
            return [...prev]
        })
    }
    function updateGeneration (e,index){
        setGeneration(prev=>{
            prev.splice(index,1,e.target.value)
            return [...prev]
        })
    }
    function updatePrice(e,index){
        setPrice(prev=>{
            prev.splice(index,1,e.target.value)
            return[...prev]
        })
    }
    function newConsoleHandler(){
        setTimeout(()=>{
            setUpdate(!update)
        },3000)
    }
    async function deleteConsoleHandler(e,index){
        //delete element from array in firestore
        e.preventDefault();
        const consoleObj = dummyInfo[index]
        console.log(dummyInfo[index])  
        try{
            const doc = projectFireStore.collection('consoles').doc(currentUser.uid)
            await doc.update({myConsoles:firebase.firestore.FieldValue.arrayRemove(consoleObj)})
            const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
            setDummyInfo(data.data().myConsoles)
            console.log('deleted')
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="ManageConsoles">
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center',}} className="mt-3">
                <h4>LIST OF YOUR CONSOLES: </h4>
                {
                    dummyInfo.map((val,index)=>{
                        return (
                            <ConsoleDetails name={val.name} brand={val.brand} generation={val.generation} price={val.price} updateConsole={(e)=>updateConsole(e,index)} getName={(e)=>updateName(e,index)} getBrand={(e)=>updateBrand(e,index)} getGeneration={(e)=>updateGeneration(e,index)} getPrice={(e)=>updatePrice(e,index)} key={index} delete={(e)=>deleteConsoleHandler(e,index)}/>
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
