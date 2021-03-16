import React,{useRef,useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {Link,useHistory} from "react-router-dom"
import '../signUp/SignUp.css'
import {useAuth} from '../../contexts/AuthContext'



export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    async function handleSubmit(e){
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            setLoading(false)
            history.push('/')
        }catch(er){
            setError(er.message)
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div className="SignUp">
            <Card className="Card" style={{maxWidth:'600px'}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error&&<Alert className="text-center" variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="Labels">Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="Labels">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                        </Form.Group>
                        <Button variant="dark" type="submit" className="w-100" disabled={loading}>
                            Submit
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-4 Message"> Don't have and account ? <Link to="/signup">Sign Up</Link></div>
                </Card.Body>
            </Card>     
        </div>
    )
}
