import React from 'react'
import './SettingNav.css'
import NavigationItem from '../../navigation/navigationItem/NavigationItem'
function SettingNav() {
    return (
        <div className="SettingNav">
            <NavigationItem path="/settings/user" styleName="Nav2"> User </NavigationItem>
            <NavigationItem path="/settings/consoles" styleName="Nav2"> Consoles </NavigationItem>
        </div>
    )
}

export default SettingNav
