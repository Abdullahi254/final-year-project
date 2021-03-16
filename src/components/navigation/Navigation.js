import React,{useState} from 'react'
import './Navigation.css'
import DrawerButton from './sideDrawer/drawerButton/DrawerButton'
import SideDrawer from './sideDrawer/SideDrawer'
import NavigationItems from './navigationItems/NavigationItems'
import NavigationIcon from './navigationIcons/NavigationIcon'
import Notification from '../notification/Notification'
import NavigationItem from './navigationItem/NavigationItem'
function Navigation(props) {
    const [sideDrawer, setSideDrawer]  = useState(false)
    function sideDrawerHandler() {
        setSideDrawer(!sideDrawer)
    }
    return (
        <div className="Navigation">
            <DrawerButton clicked={sideDrawerHandler}/>
            <SideDrawer show={sideDrawer} close={sideDrawerHandler} onLogout={props.onLogout}/>
            <div></div>
               <nav className="NavItems">
               <NavigationItems/>
                </nav> 
                <nav className="NavItems">
                    <NavigationIcon onLogout={props.onLogout}/>
                </nav>
                <nav className="Notification">
                    <NavigationItem path="/notification" tip="notification" ><Notification /></NavigationItem>
                </nav>
            <div></div>
        </div>
    )
}

export default Navigation
