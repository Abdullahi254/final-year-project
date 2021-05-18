import React, { useEffect,useState } from 'react'
import io from 'socket.io-client'
import {Alert} from 'react-bootstrap'
const socket = io("http://localhost:4000");

function Socket(props) {
    const [status,setStatus] = useState('')
    const [message,setMessage] = useState('')
    useEffect(() => {
        socket.on('metaData', (data) => {
            console.log(data)
            props.loading(false)
            if (data.ResultCode === 0) {
                setStatus('success')
                setMessage("Payment Was a Success.")
            }
            else {
                setStatus('failed')
                let message = `Payment Failed! ${data.ResultDesc}`
                setMessage(message)
            }
        })
    })
    return (
        <>
            {status==='success'?<Alert variant='success' className="text-center" dismissible>{message}</Alert>:null}
            {status==='failed'?<Alert variant='danger' className="text-center" dismissible>{message}</Alert>:null}
        </>
    )
}

export default Socket