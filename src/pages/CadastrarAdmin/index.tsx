import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import React, { useEffect } from 'react';
import InputTexto from '../../components/InputTexto';
import FormLabel from '../../components/FormLabel';
import { api } from '../../services/api';
import NavBarGeral from '../../components/NavBarGeral';
import { useNavigate } from 'react-router-dom';

import '../pages.css';

export default function CadastrarAdmin() {
    const [primeiroNome, setprimeiroNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [newAdminCpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    const realizarCadastro = (event: any) => {
        event.preventDefault();
        var dadosAdmin: any = {
            name: `${primeiroNome} ${sobrenome}`,
            phone: telefone,
            newAdminCpf,
            email
        }

        api.post("/user/administrator", dadosAdmin, config).then((response)=>{console.log(response)});

        navigate('/');
    }

    return (
        <>
        <NavBarGeral />
        <Form style={{minHeight: '75vh'}} onSubmit={realizarCadastro}>
            <Container>

                <Row>
                    <FormLabel label='Cadastrar admin'/>
                </Row> 

                <Row>
                    <Col sm={6}>
                        <InputTexto type="text" defaultValue={''} required={true} label={"Primeiro nome"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type="text" defaultValue={''} required={true} label={"Sobrenome"} placeholder={""} controlId={"inputSobrenome"} data={sobrenome} setData={setSobrenome} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type="number" defaultValue={''} required={true} label={"Telefone"} placeholder={""} controlId={"telefone"} data={telefone} setData={setTelefone} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type="number" defaultValue={''} required={true} label={"CPF"} placeholder={""} controlId={"cpf"} data={newAdminCpf} setData={setCpf} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <InputTexto type="email" defaultValue={''} required={true} label={"Email"} placeholder={"email@gmail.com"} controlId={"email"} data={email} setData={setEmail} />
                    </Col>
                </Row>


                <Row className='d-flex justify-content-center'>
                        <Button href='/' style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Secundario Texto-Azul'>
                            Cancelar
                        </Button>
                        <Button style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Primario Texto-Branco' type="submit" >
                            Confirmar
                        </Button>
                </Row>

            </Container>
        </Form>
        </>
    )
}