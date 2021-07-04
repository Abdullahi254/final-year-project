import React, { useEffect, useRef, useState } from 'react'
import './Payment.css'
import Socket from '../socket/Socket'
import { useParams } from 'react-router-dom'
import { Form, Button, Card, Alert, InputGroup } from 'react-bootstrap'
import axios from 'axios'


function Payment() {
    const { time, price } = useParams()
    const phoneRef = useRef()
    const [loading, setLoading] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [error, setError] = useState('')
    const [isInvalid, setIsInvalid] = useState(true)
    const [show, setShow] = useState(false)
    // generating auth token for safaricom api request
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
    }, [])
    // making request to safaricom api and getting response to our callback
    function handleSubmit(e) {
        e.preventDefault()
        setShow(false)
        setError('')
        // checking if phone number provided  is valid
        if (isInvalid) {
            setError('Check Number and Try Again!')
            setShow(true)
        } else {
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
            const timeStamp = dateString + fullTimeString
            const password = new Buffer(shortCode + passKey + timeStamp).toString("base64")
            const [sHours, sMinutes] = time.split('.')
            const day = new Date()
            const hoursPlayed = day.getHours() - parseInt(sHours)
            const minutesPlayed = day.getMinutes() - parseInt(sMinutes)
            const totalMinutesPlayed = (hoursPlayed * 60) + minutesPlayed
            const amount = (totalMinutesPlayed * price).toString()
            const phone = "254" + phoneRef.current.value.toString()
            console.log(phone)
            axios({
                method: 'post',
                url,
                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "Content-Type": "application/json"
                },
                data: {
                    "BusinessShortCode": shortCode,
                    "Password": password,
                    "Timestamp": timeStamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": amount,
                    "PartyA": phone,
                    "PartyB": shortCode,
                    "PhoneNumber": phone,
                    "CallBackURL": "https://ca3cb5530d89.ngrok.io/lipanampesa",
                    "AccountReference": "Gamer001",
                    "TransactionDesc": "GAMING SERVICE"
                }
            }).then(res => {
                setLoading(true)
            }).catch(er => {
                console.log(er)
                setError('something went wrong (SPT error)')
            })
        }
    }
    // using regex to validate phone number povided
    function checkValidity(e) {
        let num = e.target.value
        const regx = /^\d{9}$/
        if (regx.test(num)) {
            setIsInvalid(false)
        }
        else setIsInvalid(true)
    }
    // handles closing error message alert
    function closeMessageHandler() {
        setShow(false)
    }

    // this code runs just before component is mounted or updated. It calculates amount of time played in minutes
    const [sHours, sMinutes] = time.split('.')
    const day = new Date()
    const hoursPlayed = day.getHours() - parseInt(sHours)
    const minutesPlayed = day.getMinutes() - parseInt(sMinutes)
    const totalMinutesPlayed = (hoursPlayed * 60) + minutesPlayed

    return (
        <div className="Payment">
            <Card className="Card">
                <Card.Body>
                    {show && error ? <Alert className="text-center" variant="danger" dismissible onClose={closeMessageHandler}>{error}</Alert> : null}
                    <Socket loading={(i) => setLoading(i)} />
                    <h2 className="mb-4 text-center">That will be KSH.{totalMinutesPlayed * price}.</h2>
                    <Card.Text className="mb-4 Text">Kindly insert your <b>safaricom</b> number to get a payment prompt.</Card.Text>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicPayment">
                            <Form.Label className="Labels">Phone Number</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>+254</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="number" placeholder="Enter Phone" ref={phoneRef} isInvalid={isInvalid} onChange={checkValidity} />
                            </InputGroup>
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

export default Payment
