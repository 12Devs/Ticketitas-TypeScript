import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react';
import { Button, Container } from 'react-bootstrap';

import './InputBuscar.css';
import '../Texto/Texto.css';

function InputBuscar({ placeholder, controlId, data, setData }:
    { placeholder: string, controlId: string, data: string, setData: Function }) {
    return (
        <InputGroup>
            <Form.Control
                type="search"
                placeholder={placeholder}
                aria-label="Barra de pesquisa"
                className='Input-Primario Texto-Branco'
                value={data}
                onChange={(e) => setData(e.target.value)}
            />
            {/* <InputGroup.Text className='Input-Primario' id="basic-addon1">🔍︎</InputGroup.Text> */}
        </InputGroup>

        // <Form.Group controlId={controlId}>
        //     <Form.Control
        //         type="search"
        //         placeholder={placeholder}
        //         aria-label="Barra de pesquisa"
        //         className='Input-Primario Texto-Branco'
        //         value={data}
        //         onChange={(e) => setData(e.target.value)}
        //     />
        //     {/* <Button variant="none" id="button-addon2">
        //         🔍︎
        //     </Button> */}
        // </Form.Group>
    )
}

export default InputBuscar;


