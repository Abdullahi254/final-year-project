import React, { useState} from 'react'
import './ConsoleDetails.css'
function ConsoleDetails(props) {
    const [inputState, setInputState] = useState(true)
    function editInputsHandler() {
        setInputState(!inputState)
    }
    return (
        <form className="ConsoleDetails" onSubmit={props.updateConsole}>
            <input className="InfoInput" placeholder={props.name} disabled={inputState} onChange={props.getName}/>
            <input className="InfoInput" placeholder={props.brand} disabled={inputState} onChange={props.getBrand}/>
            <input className="InfoInput" placeholder={props.generation} disabled={inputState} onChange={props.getGeneration}/>
            <div className="Icons">
                {inputState?<button className="Iconi Edit" onClick={editInputsHandler}>Edit</button>:
                            <button className="Iconi save" type="submit" onClick ={editInputsHandler}>Save</button>}
                <button className="Iconi" onClick={props.delete}>Delete</button>
            </div>
        </form>
    )
}

export default ConsoleDetails
