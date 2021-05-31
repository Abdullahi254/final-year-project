import React, { useEffect,useState } from 'react'
import io from 'socket.io-client'
import {Alert} from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'
import {projectFireStore} from '../../firebase'
import firebase from 'firebase/app'
const socket = io("http://localhost:4000");

function Socket(props) {
    const [status,setStatus] = useState('')
    const [message,setMessage] = useState('')
    const [show,setShow] = useState(false)
    const { currentUser } = useAuth()
    useEffect(()=>{
        // get feedback from socket io server
        socket.on('metaData', (data) => {
            console.log(data)
            props.loading(false)
            if (data.ResultCode === 0) {
                setShow(true)
                setStatus('success')
                setMessage("Payment Was a Success.")
                depositHandler(data.CallbackMetadata.Item)
            }
            else {
                setShow(true)
                setStatus('failed')
                let message = `Payment Failed! ${data.ResultDesc}`
                setMessage(message)
            }
        })
        return ()=>socket.off('metaData')
    })   
    
    async function depositHandler(items){
        //saving created statement to database and updating balance
        const statement = {
            type:'Deposit',
            date: firebase.firestore.Timestamp.now(),
            amount: items[0].Value,
            from:items[4].Value,
            receiptNumber:items[1].Value
        }
        try {
            const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
            if (!data.data().balance) {
                const newdata = {
                    ...data.data(),
                    balance:items[0].Value,
                    statements:[statement]
                }
                await projectFireStore.collection('consoles').doc(currentUser.uid).set(newdata)
            }
            else {
                const newBalance = (data.data().balance + items[0].Value)
                const statements = data.data().statements
                statements.push(statement)
                const updatedObj = {
                    ...data.data(),
                    statements: [...statements],
                    balance:newBalance
                }
                await projectFireStore.collection('consoles').doc(currentUser.uid).set(updatedObj)
            }
        } catch (er) {
            console.log(er)
        }
    }

    return (
        <>
            {show && status==='success'?<Alert variant='success' className="text-center" dismissible onClose={()=>setShow(false)}>{message}</Alert>:null}
            {show && status==='failed'?<Alert variant='danger' className="text-center" dismissible onClose={()=>setShow(false)}>{message}</Alert>:null}
        </>
    )
}

export default Socket