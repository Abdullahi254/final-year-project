import React from 'react'
import NavigationItem from '../navigationItem/NavigationItem'
import logo from '../../../assets/imgs/logo.png'
import "./NavigationItems.css"
function NavigationItems() {
    return (
        <>
            <ul className="Group">
                <img src={logo} alt="logo" className="Logo" />
                <NavigationItem path="/">Active Consoles</NavigationItem>
                <NavigationItem path="/idleconsoles">Idle Consoles</NavigationItem>
                <NavigationItem path="/wallet">Wallet</NavigationItem>
            </ul>
        </>
    )
}

export default NavigationItems
