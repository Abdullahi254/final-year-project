import React from 'react'
import './BackDrop.css'
function BackDrop(props) {
    return (
       props.show&&<div className='BackDrop' onClick={props.clicked}></div>
    )
}

export default BackDrop
