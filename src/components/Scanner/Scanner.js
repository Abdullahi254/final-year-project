import React, { useEffect, useRef, useState } from 'react'
import './Scanner.css'
import { useParams } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io("http://localhost:4000");
function Scanner() {
    const { time, price } = useParams()
    const [amount] = useState(price)
    const phoneRef = useRef()
    const [loading, setLoading] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [error, setError] = useState('')
    useEffect(() => {
        const tokenUrl = "/oauth/v1/generate?grant_type=client_credentials"
        const auth = "Basic " + new Buffer(process.env.REACT_APP_SAFARICOM_CONSUMER_KEY + ':' + process.env.REACT_APP_SAFARICOM_CONSUMER_SECRET).toString("base64")
        axios({
            method: 'get',
            url: tokenUrl,
            headers: {
                "Authorization": auth
            }
        }).then((res) => {
            setAccessToken(res.data.access_token)
        }).catch(er => {
            setError('Something went wrong (Token Error)')
            console.log(er)
        })
    },[])

    function handleSubmit(e) {
        e.preventDefault()
        const url = "/mpesa/stkpush/v1/processrequest"
        const shortCode = process.env.REACT_APP_SAFARICOM_SHORTCODE.toString()
        const passKey = process.env.REACT_APP_SAFARICOM_PASSKEY.toString()
        const eventSring = new Date().toLocaleString('en-GB')
        const eventList = eventSring.split(',')
        const fullDateList = eventList[0].split('/')
        const fullTimeList = eventList[1].trim().split(':')
        let dateString = ""
        let fullTimeString = ""
        for (let i = fullDateList.length - 1; i >= 0; i--) {
            dateString += fullDateList[i];
        }
        for (let i = 0; i < fullTimeList.length; i++) {
            fullTimeString += fullTimeList[i];
        }
        const timeStamp = dateString+fullTimeString
        const password = new Buffer(shortCode + passKey+timeStamp).toString("base64")
        const price = amount.toString()
        const phone = phoneRef.current.value.toString()
        axios({
            method: 'post',
            url,
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json"
            },
            data: {
                "BusinessShortCode": shortCode,
                "Password":password,
                "Timestamp": timeStamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": price,
                "PartyA": phone,
                "PartyB": shortCode,
                "PhoneNumber": phone,
                "CallBackURL": "https://1a35a85767da.ngrok.io/lipanampesa",
                "AccountReference": "Gamer001",
                "TransactionDesc": "GAMING SERVICE"
            }
        }).then(res=>{
            setLoading(true)
        }).catch(er=>{
            console.log(er)
            setError('something went wrong (SPT error)')
        })
    }
    socket.on('metaData',(data)=>{
        console.log(data)
    })
    return (
        <div className="Payment">
            <Card className="Card">
                <Card.Body>
                    {error?<Alert className="text-center" variant="danger">{error}</Alert>:null}
                    <h2 className="mb-4 text-center">That will be KSH.{time * price}.</h2>
                    <Card.Text className="mb-4 Text">Kindly insert your <b>safaricom</b> number to get a payment prompt.</Card.Text>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicPayment">
                            <Form.Label className="Labels">Phone Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter Phone" ref={phoneRef} />
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
