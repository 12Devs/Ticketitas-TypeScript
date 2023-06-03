import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputTexto from '../../../components/InputTexto';
import { Alert, Form, Row } from 'react-bootstrap';
import { api } from '../../../services/api';
import { Navigate, useNavigate } from 'react-router-dom';

import "./ModalLogin.css"
//import '../Button/Button.css';

export default function ModalLoginCompra({data,setData}:{data:boolean, setData:Function}) {
    const [mensagem, setMensagem] = useState(false);
    const navigate = useNavigate();
    const [mensagemString, setMensagemString] = useState('');
    const [userType, setUserType] = useState('cliente');
    const [email, setEmail] = useState('');
    const [emailRecuperacao, setEmailRecuperacao] = useState('');
    const [senha, setSenha] = useState('');

    console.log("Chamada")

    //const [show, setShow] = useState(false);
    const [showRecuperar, setShowRecuperar] = useState(false);

    // Recarrega a tela
    const refresh = () => window.location.reload();

    // Login
    const fazerLogin = (event: any) => {
        event.preventDefault();
        setMensagem(false);

        var data: any = {
            email,
            senha,
        }

        
        if (userType == 'cliente') {
            api.post('user/client/login', data)
                .then((response) => { (response.status == 200) ? loginClienteAccepted(response) : console.log(response) })
                .catch((erro) => {setMensagem(true); setMensagemString(erro.response.data.message)});
        }
    }

    // Pós login actions
        const loginClienteAccepted = (response: any) => {
        localStorage.setItem("CPF", response.data.authenticateInfo.client.cpf);
        localStorage.setItem("email", response.data.authenticateInfo.client.email);
        localStorage.setItem("nome", response.data.authenticateInfo.client.nome);
        localStorage.setItem("userType", "cliente");
        localStorage.setItem("token", response.data.authenticateInfo.token);
        localStorage.setItem("refreshToken", response.data.authenticateInfo.refreshToken);
        setData(false);
        refresh();
    }
    
    // Handlers modal de recuperar senha
    const handleCloseRecuperar = () => {
        setShowRecuperar(false)
    };
    const handleShowRecuperar = () => {
        setShowRecuperar(true);
        setData(false)
    };

    const handleNavigateCadastroClienteCompra = () => {
        navigate('/cadastrarCliente');
    };

    // Handlers modal de login
    const handleClose = () => {
        setData(false)
        
        
    };
    const handleShow = () => {
        setData(true)
    };
    

    return (
        <>
        
            <Modal show={data} onHide={handleClose}>
                <Modal.Body className=" modal-content">
                    <Row className='justify-content-center' >
                        <img
                            src="/img/logo.svg"
                            width="100"
                            height="100"
                            className="align-items-center"
                            alt=''
                        />{''}
                        <p className='Texto-MuitoPequeno Texto-Preto text-center' style={{ marginTop: '20px' }}>
                            Bem vindo novamente! Por gentileza realize o Login em sua conta.
                        </p>
                    </Row>

                    
                    <Form onSubmit={fazerLogin}>
                        <Row className='justify-content-center'>
                            <InputTexto defaultValue={''} required={true} label={"E-mail"} placeholder={"email@gmail.com"} controlId={"email"} data={email} setData={setEmail} type='email' />
                            <InputTexto defaultValue={''} required={true} label={"Senha"} placeholder={""} controlId={"senha"} data={senha} setData={setSenha} type="password" />
                        </Row>

                        <Alert style={{ width: 'fit-content' }} show={mensagem} variant="danger">
                            <p>{mensagemString}</p>
                        </Alert>
                       
                        
                        <Row >
                            <Col className="d-flex justify-content-center">
                            
                                <Button className='Botão-Terciário Texto-Azul' onClick={handleShowRecuperar}>
                                    Esqueci minha senha
                                </Button>
                            
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <Button className='Botão-Terciário Texto-Azul' onClick={handleNavigateCadastroClienteCompra}>
                                    Cadastrar-se
                                </Button>
                            </Col>
                        </Row>

                        <Row className='justify-content-center p-4'>

                            <Button className='Botão-Primario Texto-Branco' type='submit'>
                                Entrar
                            </Button>
                           

                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showRecuperar} onHide={handleCloseRecuperar}>
                <Modal.Body>
                    <Row className='justify-content-center'>
                        <img
                            src="/img/logo.svg"
                            width="100"
                            height="100"
                            className="align-items-center"
                            alt=''
                        />{''}
                        <p className='Texto-Grande Texto-Preto text-center'>
                            Recuperar senha
                        </p>

                    </Row>

                    <Row className='justify-content-center'>
                        <InputTexto 
                            defaultValue={''} 
                            required={true} 
                            label={"Email"} 
                            placeholder={"Digite o email associado a sua conta"} 
                            controlId={"email"} 
                            data={emailRecuperacao} 
                            setData={setEmailRecuperacao} 
                            type=''/>
                    </Row>
                    <Row className='justify-content-center'>
                        <Button className='Botão-Primario Texto-Branco' type='submit'>
                            Enviar
                        </Button>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}
