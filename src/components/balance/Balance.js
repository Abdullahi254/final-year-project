import React,{useEffect,useState} from 'react'
import './Balance.css'
import logo from '../../assets/imgs/logo.png'
import { Card,Alert } from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'
import {projectFireStore} from '../../firebase'
function Balance() {
    const {currentUser } = useAuth()
    const [balance,setBalance] = useState()
    const [error,setError] = useState()
    useEffect(()=>{
        //make request to database
        async function fetchBalance(){
            //fetching balance from the database using authenticated user's credentials
            try { 
                const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
                const balnc = await data.data().balance.toFixed(2)
                setBalance(balnc)
            } catch (er) {
                console.log(er)
                setError('Balance Information Unavailable!')
            }
        }
        fetchBalance()
    },[currentUser])
    return (
        <div className="Balance">
            {error&& <Alert variant="danger" className="text-center">{error}</Alert>}
            <Card className="Details">
                <img src={logo} alt="logo" className="Blogo" />
                <Card.Body className="text-center">
                    <Card.Title>Account Balance</Card.Title>
                    <Card.Text className="Amount">KSH {balance||'0.00'}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Available</Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Balance
