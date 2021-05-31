import React from 'react'
import { Table } from 'react-bootstrap'
import Statement from '../statement/Statement'
import './Statements.css'
function Statements() {
    return (
        <Table striped bordered hover className="mt-4 Statements" responsive >
            <thead>
                <tr className="Heading">
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                </tr>
            </thead>
            <Statement/>
            <Statement/>
            <Statement/>
            <Statement/>
            <Statement/>
        </Table>
    )
}

export default Statements
