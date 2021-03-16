import React from 'react'
import {Menu} from '@material-ui/icons'
import './DrawerButton.css'
function DrawerButton(props) {
    return (
        <div className="Menu" onClick={props.clicked}>
            <Menu/>
        </div>
    )
}

export default DrawerButton
