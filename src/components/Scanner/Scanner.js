import React,{useEffect,useRef, useState} from 'react'
import './Scanner.css'
import {useParams} from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import io from 'socket.io-client'
const socket = io("http://localhost:4000");
function Scanner() {
    const {time,price} = useParams()
    const phoneRef = useRef()
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        socket.on('metaData',(data)=>{
            console.log(data)
        },[])
    })
    
    function handleSubmit(){

    }
    return (
        <div className="Payment">
            <Card className="Card">
                <Card.Body>
                    <h2 className="mb-4 text-center">That will be KSH.{time*price}.</h2>
                    <Card.Text className="mb-4">Kindly insert your <b>safaricom</b> number to get a payment prompt.</Card.Text>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicPayment">
                            <Form.Label className="Labels">Phone Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter Phone" ref={phoneRef}/>
                            <Form.Text className="text-muted">
                                We'll never share your number with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="dark" type="submit" className="w-100" disabled={loading}>
                            PAY
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Scanner
