import React from 'react'
import NavigationItem from '../navigationItem/NavigationItem'
import Notification from '../../notification/Notification'
import {Settings} from "@material-ui/icons"
import './NavigationIcons.css'
function NavigationIcon(props) {
    return (
        <ul className="Group">
            <NavigationItem path="/notification" tip="notification" ><Notification /></NavigationItem>
            <NavigationItem path="/settings" tip="settings" ><Settings /></NavigationItem>
            <NavigationItem path="/logout" clicked={props.onLogout}>Log Out</NavigationItem>
        </ul>
    )
}

export default NavigationIcon
