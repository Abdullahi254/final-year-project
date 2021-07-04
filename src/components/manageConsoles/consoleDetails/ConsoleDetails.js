import React, {useRef, useState } from 'react'
import { Form, Col } from 'react-bootstrap'
import './ConsoleDetails.css'
function ConsoleDetails(props) {
    // inputs references
    const brandRef = useRef()
    const generationRef = useRef()
    const nameRef = useRef()
    const priceRef = useRef()
    // input state changes when edit or save button is clicked
    const [inputState, setInputState] = useState(true)
    const [brand, setBrand] = useState(props.brand)
    // array of game consoles generations and brand
    const brandList = ["PlayStation", "X-Box", "Arcade", "Computer(PC)"]
    const brandOptions = brandList.map((brand, index) => <option className="Options" key={index}>{brand}</option>)
    const xboxList = ["X-Box Original", "X-Box 360", "X-Box one", "X-Box Series S", "X-Box Series X"]
    const psOptions = xboxList.map((xbox, index) => <option className="Options" key={index}>PlayStation {index + 1}</option>)
    const xboxOptions = xboxList.map((xbox, index) => <option className="Options" key={index}>{xbox}</option>)
    //this function enables inputs to be edited
    function editInputsHandler() {
        setInputState(false)
    }
    function selectBrandHandler(e) {
        setBrand(e.target.value)
    }
    // function that generates different generation depending on highlighted brand
    function generation() {
        if (brand === "PlayStation") {
            return <Col>

                <Form.Control as="select" placeholder={props.generation} ref={generationRef} className="InfoInput" >
                    {psOptions}
                </Form.Control>

            </Col>
        }
        if (brand === "X-Box") {
            return <Col>

                <Form.Control as="select" placeholder={props.generation} ref={generationRef} className="InfoInput" >
                    {xboxOptions}
                </Form.Control>

            </Col>
        }
        if (brand === "Arcade" || "Computer(PC)") {
            return (
                <Col>
                    <Form.Control placeholder={brand} ref={generationRef} className="InfoInput" />
                </Col>
            )
        }
    }
    // handles on submit form, sends data to ManageConsole to be saved to database
    function updateConsole(e){
        e.preventDefault()
        setInputState(false)
        console.log(nameRef.current.value)
        const consoleData = {
            name: nameRef.current.value,
            brand: brandRef.current.value,
            generation: generationRef.current.value,
            price:priceRef.current.value,
            active:false
        }
        console.log(consoleData)
        props.updateConsole(e,consoleData)
        setInputState(true)
    }
    return (
        <>
            <Form onSubmit={updateConsole} className="m-4">
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
                        {
                            inputState ? <Form.Control className="InfoInput" placeholder={props.name} disabled={inputState} /> :
                                <Form.Control className="InfoInput" placeholder={props.name} ref={nameRef}/>
                        }

                    </Col>
                    <Col>
                        {
                            inputState ? <Form.Control className="InfoInput" placeholder={props.brand} disabled={inputState} /> :
                                <Form.Control as="select" placeholder={props.brand} ref={brandRef} onChange={selectBrandHandler} className="InfoInput" >
                                    {brandOptions}
                                </Form.Control>

                        }
                    </Col>
                    <Col>
                        {
                            inputState ? <Form.Control className="InfoInput" placeholder={props.generation} disabled={inputState} /> :
                                generation()
                        }

                    </Col>
                    <Col>
                        {
                            inputState ? <Form.Control className="InfoInput" placeholder={props.price} disabled={inputState} onChange={props.getPrice} /> :
                                <Form.Control className="InfoInput" placeholder={props.price} ref={priceRef} />
                        }

                    </Col>
                    <Col>
                        <div className="Icons">
                            <button className="Iconi edit" onClick={editInputsHandler} disabled={!inputState}>Edit</button> 
                            <button className="Iconi save" type="submit" onClick={updateConsole} disabled={inputState}>Save</button>
                            <button className="Iconi del" onClick={props.delete}>Delete</button>
                        </div>
                    </Col>

                </Form.Row>
            </Form>
        </>
    )
}

export default ConsoleDetails
