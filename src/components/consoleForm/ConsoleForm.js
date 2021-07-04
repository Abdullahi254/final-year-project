import React, { useRef, useState, } from 'react'
import { Form, Col } from 'react-bootstrap'
import './ConsoleForm.css'
import { projectFireStore } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
function ConsoleForm(props) {
    const { currentUser } = useAuth()
    const brandRef = useRef()
    const generationRef = useRef()
    const nameRef = useRef()
    const priceRef = useRef()
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
        if (brand === "Arcade" || "Computer(PC)") {
            return (
                <Col>
                    <Form.Control placeholder={brand} ref={generationRef} />
                </Col>
            )
        }
    }
    async function saveConsoleHandler(e) {
        //saving console information to database as an array
        e.preventDefault()
        const consoleData = {
            name: nameRef.current.value,
            brand: brandRef.current.value,
            generation: generationRef.current.value,
            price: priceRef.current.value,
            active: false
        }
        try {
            const data = await projectFireStore.collection('consoles').doc(currentUser.uid).get()
            if (!data.data()) {
                const newdata = {
                    ...data.data(),
                    myConsoles: [consoleData],
                }
                await projectFireStore.collection('consoles').doc(currentUser.uid).set(newdata)
            }
            else {
                const myArray = data.data().myConsoles
                myArray.push(consoleData)
                const updatedObj = {
                    ...data.data(),
                    myConsoles: [...myArray],
                }
                await projectFireStore.collection('consoles').doc(currentUser.uid).set(updatedObj)
            }
        } catch (er) {
            console.log(er)
        }

    }
    return (
        <Form className="mt-3" onSubmit={saveConsoleHandler}>
            <Form.Row>
                <Col>
                    <Form.Control placeholder="Console NickName" ref={nameRef} />
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
                    <Form.Control placeholder="price/min" ref={priceRef} />
                </Col>
                <Col>
                    <button type="submit" className="CustomButton" onClick={props.clicked}>Add Console</button>
                </Col>
            </Form.Row>
        </Form>

    )
}

export default ConsoleForm
