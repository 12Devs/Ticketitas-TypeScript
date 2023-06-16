import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import './InputBuscar.css';
import '../Texto/Texto.css';
import { useNavigate } from 'react-router-dom';

export default function InputBuscar(
    {placeholder, controlId, options, listaId }:
        { placeholder: string, controlId: string, options: any[], listaId: string }) {

    const navigate = useNavigate();
    const [idSelect, setIdSelect] = useState('');

    function handleNavigate(id: string) {
        console.log("Entrou la ele: ", id);
        // navigate(`/evento/${id}`)
    }

    const labelIndentificadora = (op: any) => {
        if (op.cpf === 'null'){
            return `${op.nome}, ${op.cnpj}`;
        } else {
            return `${op.nome}, ${op.cpf}`;
        }
    }

    function formatData(data: string) {
        var dataHoraOBJ = new Date(data);
        var dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();

        return dataHoraFormatada;
    }

    function renderDatalist() {
        if (options != undefined) {
            return (
                <Form.Group controlId={controlId}>
                    <Form.Control
                        type={"text"}
                        list={listaId}
                        placeholder={placeholder}
                        onChange={(e) => {handleNavigate(e.target.value)}} 
                        className='Input-Primario Texto-Branco'
                        />
        
                    <datalist className='Data-List ' id={listaId} >
                        {options.map((option, index) => (
                            <option key={index} value={option.nome} label={formatData(option.dataEvento)}  />
                        ))}
        
                    </datalist>
                </Form.Group>
            );
        }
    }

    return (
    <>
        {renderDatalist()}
    </>
    );
}


