import React from 'react'
import './Statement.css'
function Statement(props) {
    return (
        <tbody >
            <tr>
                <td className="p-3">{props.date || '22-01-2012'}</td>
                <td className="p-3">{props.amount || 200}</td>
                <td className="p-3">{props.type || 'Deposit'}</td>
            </tr>
        </tbody>
    )
}

export default Statement
