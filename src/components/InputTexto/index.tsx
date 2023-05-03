import './InputTexto.css'
import Form from 'react-bootstrap/Form';
import React from 'react';

function InputTexto({ type, label, placeholder, controlId, defaultValue, data, setData, required }:
{label: string, placeholder: string, controlId: string, defaultValue: string, data: string, setData: Function, required: boolean, type : string}) {
    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label className='labelInputConfig'>{label}</Form.Label>
            <Form.Control 
                required={required} 
                type= {type} 
                placeholder={placeholder} 
                defaultValue={defaultValue} 
                value={data} 
                onChange={(e) => setData(e.target.value)} />
        </Form.Group>
    );
}

export default InputTexto;