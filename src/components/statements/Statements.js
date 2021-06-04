import React,{useEffect,useState} from 'react'
import { Table,Alert} from 'react-bootstrap'
import Statement from '../statement/Statement'
import {useAuth} from '../../contexts/AuthContext'
import {projectFireStore} from '../../firebase'
import './Statements.css'
function Statements() {
    const {currentUser } = useAuth()
    const [statements,setStatements] = useState([])
    const [error,setError] = useState()
    useEffect(()=>{
        async function fetchStatements(){
            //fetching statements from the database using authenticated user's credentials
            try { 
                const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
                const statementsList = await data.data().statements
                setStatements(statementsList)
            } catch (er) {
                console.log(er)
                setError('Error Fetching Statements')
            }
        }
        fetchStatements()
    },[currentUser])
    return (
        <>
        {error && <Alert variant="danger" className="text-center mt-4">{error}</Alert>}
        <Table striped bordered hover className="Statements mt-3" responsive >     
            <thead>
                <tr className="Heading">
                    <th>Type</th>
                    <th>Date</th>
                    <th>Amount(Ksh)</th>
                    <th>From</th>
                    <th>Receipt Number</th>
                </tr>
            </thead>
            {
               statements ? statements.map((st,index)=><Statement type={st.type} date={st.date.toDate().toString()} amount={st.amount.toFixed(2)} from={st.from} receiptNumber={st.receiptNumber} key={index}/>):
               <Alert variant="danger" className="text-center mt-4" style={{position:'absolute',width:'100%'}}>Statements Information Unavailable!</Alert>
            }
        </Table>
        </>
    )
}

export default Statements
