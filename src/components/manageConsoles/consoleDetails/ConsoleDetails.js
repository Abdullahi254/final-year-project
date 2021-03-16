import React, { useState, useRef } from 'react'
import './ConsoleDetails.css'
function ConsoleDetails(props) {
    const nameRef = useRef()
    const [inputState, setInputState] = useState(true)
    function editInputsHandler() {
        setInputState(!inputState)
        nameRef.current.focus()
    }
    return (
        <form className="ConsoleDetails" onSubmit={props.updateConsole}>
            <input className="InfoInput" placeholder={props.name} value={props.newName} disabled={inputState} ref={nameRef} />
            <input className="InfoInput" placeholder={props.brand} value={props.newBrand} disabled={inputState} />
            <input className="InfoInput" disabled={inputState} value={props.newGeneration} placeholder={props.generation} />
            <div className="Icons">
                {inputState?<button className="Iconi Edit" onClick={editInputsHandler}>Edit</button>:
                            <button className="Iconi save" type="submit">Save</button>}
                <button className="Iconi">Delete</button>
            </div>
        </form>
    )
}

export default ConsoleDetails
