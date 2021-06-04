import React,{useRef,useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Profile.css'
import {useAuth} from '../../contexts/AuthContext'
import logo from '../../assets/imgs/logo.png'

export default function Profile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updatePassword,updateEmail} = useAuth()

    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [show,setShow] = useState(false)
    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        setShow(true)
        setError('')
        if(passwordRef.current.value !==passwordConfirmRef.current.value){
            return setError('passwords do not match!')
        }
        const promises = []
        if(emailRef.current.value !==currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
            setSuccess('Successfully Updated Profile!')
        }).catch(error=>{
            console.log(error)
            setError('Failed to Update Profile!')
        })
    }

    function closeMessageHandler(){
        setShow(false)
        setLoading(false)
    }

    return (
        <div className="Profile">
            <Card className="PCard">
                <Card.Body>
                    <h2 className="text-center ">Update Profile</h2>
                    {show && error?<Alert className="text-center" variant="danger" dismissible onClose={closeMessageHandler}>{error}</Alert>:null}
                    {show && success?<Alert className="text-center" variant="success" dismissible onClose={closeMessageHandler}>{success}</Alert>:null}
                    <img src={logo} alt="logo" className="Plogo" />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="Labels">Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={emailRef} defaultValue={currentUser.email}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="Labels">Password</Form.Label>
                            <Form.Control type="password" placeholder="Leave blank to keep the same" ref={passwordRef} />
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicPasswordConfirm">
                            <Form.Label className="Labels">Password Confirm</Form.Label>
                            <Form.Control type="password" placeholder="Leave blank to keep the same"  ref={passwordConfirmRef} />
                        </Form.Group>

                        <Button variant="dark" type="submit" className="w-100" disabled={loading}>
                            Update
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-4 Message"><Link to="/" style={{color:'red'}}>Cancel</Link></div>
                </Card.Body>
            </Card>     
        </div>
    )
}
