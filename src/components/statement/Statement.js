import React from 'react'
import './Statement.css'
function Statement(props) {
    return (
        <tbody >
            <tr>
                <td className="p-3">{props.type}</td>
                <td className="p-3">{props.date}</td>
                <td className="p-3">{props.amount}</td>
                <td className="p-3">{props.from}</td>
                <td className="p-3">{props.receiptNumber}</td>
            </tr>
        </tbody>
    )
}

export default Statement
