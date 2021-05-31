import React,{useEffect} from 'react'
import './Balance.css'
import logo from '../../assets/imgs/logo.png'
import { Card } from 'react-bootstrap'
function Balance() {
    useEffect(()=>{
        //make request to database
    },[])
    return (
        <div className="Balance">
            <Card className="Details">
                <img src={logo} alt="logo" className="Blogo" />
                <Card.Body className="text-center">
                    <Card.Title>Account Balance</Card.Title>
                    <Card.Text className="Amount">KSH 00.00</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Available</Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Balance
