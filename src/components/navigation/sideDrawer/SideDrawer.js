import React from 'react'
import BackDrop from '../../backDrop/BackDrop'
import "./SideDrawer.css"
import NavigationItems from '../navigationItems/NavigationItems'
import NavigationItem from '../navigationItem/NavigationItem'
function SideDrawer(props) {
    let attachedClasses = props.show?" SideDrawer Open": "SideDrawer Close"
    return (
        <>
            <BackDrop show={props.show} clicked={props.close}/>
            <div className={attachedClasses}>
                <nav>
                    <NavigationItems />
                </nav>
                <ul>
                    <NavigationItem path="/settings">Settings</NavigationItem>
                    <NavigationItem path="/logout" clicked={props.onLogout}>Log Out</NavigationItem>
                </ul>
            </div>
        </>
    )
}

export default SideDrawer
