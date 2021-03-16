import React from 'react'
import './NavigationItem.css'
import {NavLink} from 'react-router-dom'
function NavigationItem(props) {
    return (
        <li className="NavigationItem" onClick={props.clicked}>
            <NavLink exact to={props.path}>
                {props.children}
            </NavLink>
            <span className="ToolTip">{props.tip}</span>
        </li>
    )
}

export default NavigationItem
