import React from 'react'
import './NavigationItem.css'
import {NavLink} from 'react-router-dom'
function NavigationItem(props) {
    return (
        <li className={`NavigationItem ${props.styleName}`}  onClick={props.clicked}>
            <NavLink exact to={props.path}>
                {props.children}
            </NavLink>
            <span className="ToolTip">{props.tip}</span>
        </li>
    )
}

export default NavigationItem
