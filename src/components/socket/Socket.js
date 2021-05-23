import React, { useEffect,useState } from 'react'
import io from 'socket.io-client'
import {Alert} from 'react-bootstrap'
const socket = io("http://localhost:4000");

function Socket(props) {
    const [status,setStatus] = useState('')
    const [message,setMessage] = useState('')
    const [show,setShow] = useState(false)
    useEffect(() => {
        socket.on('metaData', (data) => {
            console.log(data)
            props.loading(false)
            if (data.ResultCode === 0) {
                setShow(true)
                setStatus('success')
                setMessage("Payment Was a Success.")
            }
            else {
                setShow(true)
                setStatus('failed')
                let message = `Payment Failed! ${data.ResultDesc}`
                setMessage(message)
            }
        })
    })
    return (
        <>
            {show && status==='success'?<Alert variant='success' className="text-center" dismissible onClose={()=>setShow(false)}>{message}</Alert>:null}
            {show && status==='failed'?<Alert variant='danger' className="text-center" dismissible onClose={()=>setShow(false)}>{message}</Alert>:null}
        </>
    )
}

export default Socket