import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap'
import './ConsoleDetails.css'
function ConsoleDetails(props) {
    const [inputState, setInputState] = useState(true)
    function editInputsHandler() {
        setInputState(!inputState)
    }
    return (
        <Form onSubmit={props.updateConsole} className="m-4">
            <Form.Row>
                <Col className="text-center Label">
                    <Form.Label>Console Name</Form.Label>
                </Col>
                <Col className="text-center Label">
                    <Form.Label>Brand</Form.Label>
                </Col>
                <Col className="text-center Label">
                    <Form.Label>Generation</Form.Label>
                </Col>
                <Col className="text-center Label">
                    <Form.Label>Price/Minute</Form.Label>
                </Col>
                <Col></Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Control className="InfoInput" placeholder={props.name} disabled={inputState} onChange={props.getName} />
                </Col>
                <Col>
                    <Form.Control className="InfoInput" placeholder={props.brand} disabled={inputState} onChange={props.getBrand} />
                </Col>
                <Col>
                    <Form.Control className="InfoInput" placeholder={props.generation} disabled={inputState} onChange={props.getGeneration} />
                </Col>
                <Col>
                    <Form.Control className="InfoInput" placeholder={props.price} disabled={inputState} onChange={props.getPrice} />
                </Col>
                <Col>
                    <div className="Icons">
                        {inputState ? <button className="Iconi Edit" onClick={editInputsHandler}>Edit</button> :
                            <button className="Iconi save" type="submit" onClick={editInputsHandler}>Save</button>}
                        <button className="Iconi" onClick={props.delete}>Delete</button>
                    </div>
                </Col>

            </Form.Row>
        </Form>
    )
}

export default ConsoleDetails
