import React,{useRef,useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './SignUp.css'
import {useAuth} from '../../contexts/AuthContext'



export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signUp} = useAuth()

    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !==passwordConfirmRef.current.value){
            return setError('passwords do not match!')
        }
        try{
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value,passwordRef.current.value)
        }catch(er){
            setError(er.message)
            console.log(er)
        }
        setLoading(false)
    }
    return (
        <div className="SignUp">
            <Card className="Card">
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error?<Alert className="text-center" variant="danger">{error}</Alert>
                    :<Alert className="text-center" variant="success" dismissible>Successfully Signed Up</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="Labels">Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="Labels">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicPasswordConfirm">
                            <Form.Label className="Labels">Password Confirm</Form.Label>
                            <Form.Control type="password" placeholder="Password Confirm"  ref={passwordConfirmRef} />
                        </Form.Group>

                        <Button variant="dark" type="submit" className="w-100" disabled={loading}>
                            Submit
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-4 Message"> Already have an account ? <Link to="/login">LogIn</Link></div>
                </Card.Body>
            </Card>     
        </div>
    )
}
