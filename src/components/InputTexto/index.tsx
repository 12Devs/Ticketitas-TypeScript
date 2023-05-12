import './InputTexto.css'
import Form from 'react-bootstrap/Form';
import React from 'react';
import { Row } from 'react-bootstrap';

function InputTexto({ type, label, placeholder, controlId, defaultValue, data, setData, required }:
{type: string, label: string, placeholder: string, controlId: string, defaultValue: string, data: string, setData: Function, required: boolean }) {
    return (
        <>
            <Form.Group className="mb-3" controlId={controlId}>
                <Row className='me-1 ms-1'> 
                    <Form.Label className='text-start'>{label}</Form.Label>
                </Row>
                <Row className='me-1 ms-1'>
                    <Form.Control 
                        required={required} 
                        type={type} 
                        placeholder={placeholder} 
                        defaultValue={defaultValue} 
                        value={data} 
                        onChange={(e) => setData(e.target.value)} />
                </Row>
            </Form.Group>
        </>
    );
}

export default InputTexto;