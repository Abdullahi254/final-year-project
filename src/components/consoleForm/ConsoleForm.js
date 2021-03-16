import React, { useRef, useState } from 'react'
import { Form, Col } from 'react-bootstrap'
import './ConsoleForm.css'
function ConsoleForm() {
    const brandRef = useRef()
    const generationRef = useRef()
    const nameRef = useRef()
    const [brand, setBrand] = useState('PlayStation')
    function selectBrandHandler(e) {
        setBrand(e.target.value)
    }
    const brandList = ["PlayStation", "X-Box", "Arcade", "Computer(PC)"]
    const brandOptions = brandList.map((brand, index) => <option className="Options" key={index}>{brand}</option>)
    const xboxList = ["X-Box Original", "X-Box 360", "X-Box one", "X-Box Series S", "X-Box Series X"]
    const psOptions = xboxList.map((xbox, index) => <option className="Options" key={index}>PlayStation {index + 1}</option>)
    const xboxOptions = xboxList.map((xbox, index) => <option className="Options" key={index}>{xbox}</option>)
    function generation() {
        if (brand === "PlayStation") {
            return <Col>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Control as="select" placeholder="Select Generation" ref={generationRef}>
                        {psOptions}
                    </Form.Control>
                </Form.Group>
            </Col>
        }
        if (brand === "X-Box") {
            return <Col>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Control as="select" placeholder="Select Generation" ref={generationRef}>
                        {xboxOptions}
                    </Form.Control>
                </Form.Group>
            </Col>
        }
    }
    return (
        <Form className="mt-3">
            <Form.Row>
                <Col>
                    <Form.Control placeholder="Console NickName" ref={nameRef}/>
                </Col>
                <Col>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select" placeholder="Select Brand" ref={brandRef} onChange={selectBrandHandler}>
                            {brandOptions}
                        </Form.Control>
                    </Form.Group>
                </Col>
                {generation()}
                <Col>
                    <button type="submit" className="CustomButton">Add Console</button>
                </Col>
            </Form.Row>
        </Form>

    )
}

export default ConsoleForm
