import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReCAPTCHA from "react-google-recaptcha";
import InputTexto from '../InputTexto';
import { Alert, Form, Row } from 'react-bootstrap';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

import "./ModalLogin.css"
import '../Button/Button.css';

export default function ModalLogin() {
    const [mensagem, setMensagem] = useState(false);
    const navigate = useNavigate();
    const [mensagemString, setMensagemString] = useState('');
    const [userType, setUserType] = useState('cliente');
    const [email, setEmail] = useState('');
    const [emailRecuperacao, setEmailRecuperacao] = useState('');
    const [senha, setSenha] = useState('');

    const [captchavalidate, setcaptchavalidate] = useState(false);
    const [captchastatus, setcaptchastatus] = useState(false);

    const [show, setShow] = useState(false);
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

        if (userType == 'promoter') {
            api.post('user/promoter/login', data)
                .then((response) => { (response.status == 200) ?  loginPromoterAccepted(response) : console.log(response) })
                .catch((erro) => {setMensagem(true); setMensagemString(erro.response.data.message)});
        }
        else if (userType == 'cliente') {
            api.post('user/client/login', data)
                .then((response) => { (response.status == 200) ? loginClienteAccepted(response) : console.log(response) })
                .catch((erro) => {setMensagem(true); setMensagemString(erro.response.data.message)});
        }
    }

    // Pós login actions
    const loginPromoterAccepted = (response: any) => {
        localStorage.setItem("userType", "promoter");
        localStorage.setItem("token", response.data.authenticateInfo.token);
        localStorage.setItem("refreshToken", response.data.authenticateInfo.refreshToken);
        navigate('/');
        refresh();
    }

    const loginClienteAccepted = (response: any) => {
        localStorage.setItem("userType", "cliente");
        localStorage.setItem("token", response.data.authenticateInfo.token);
        localStorage.setItem("refreshToken", response.data.authenticateInfo.refreshToken);
        navigate('/');
        refresh();
    }
    
    // Handlers modal de recuperar senha
    const handleCloseRecuperar = () => {
        setShowRecuperar(false)
    };
    const handleShowRecuperar = () => {
        setShowRecuperar(true);
        setShow(false)
    };

    // Handlers modal de login
    const handleClose = () => {
        setShow(false)
        setcaptchavalidate(false)
        setcaptchastatus(false)
    };
    const handleShow = () => {
        setcaptchastatus(true)
        setShow(true)
    };
    const validateCaptcha = () => {
        setcaptchavalidate(true)

    };

    return (
        <>
            <Button className='Botão-Terciário' onClick={handleShow}>
                Entrar
            </Button>

            <Modal show={show} onHide={handleClose}>
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

                    <Row className='justify-content-center'>
                        <Form.Select aria-label="Sou cliente" style={{ width: '150px', borderStyle: 'hidden', backgroundColor: '#1F82B2', color: 'white' }}
                            onChange={(event) => setUserType(event.target.value)}>
                            <option value="cliente" >Sou cliente</option>
                            <option value="promoter">Sou promoter</option>
                        </Form.Select>
                    </Row>
                    <Form onSubmit={fazerLogin}>
                        <Row className='justify-content-center'>
                            <InputTexto defaultValue={''} required={true} label={"E-mail"} placeholder={"email@gmail.com"} controlId={"email"} data={email} setData={setEmail} type='email' />
                            <InputTexto defaultValue={''} required={true} label={"Senha"} placeholder={""} controlId={"senha"} data={senha} setData={setSenha} type="password" />
                        </Row>

                        <Alert style={{ width: 'fit-content' }} show={mensagem} variant="danger">
                            <p>{mensagemString}</p>
                        </Alert>
                        {
                            /*
                            <Row className='justify-content-center'>
                            <ReCAPTCHA 
                            sitekey="6LdLG-ElAAAAAN34jptkg-UA6ASYNmnM9_CXjvFM"
                            onChange={validateCaptcha}
                            />
                            </Row>
                            */
                        }

                        <Row className='justify-content-center' >
                            <Button className='Botão-Terciário Texto-Azul' onClick={handleShowRecuperar}>
                                Esqueci minha senha
                            </Button>
                        </Row>

                        <Row className='justify-content-center'>

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
