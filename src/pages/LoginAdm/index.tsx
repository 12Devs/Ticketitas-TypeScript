import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalLogin from '../../components/ModalLogin';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import InputTexto from '../../components/InputTexto';
import "./LoginAdm.css"
import NavBarGeral from '../../components/NavBarGeral';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';


export default function LoginAdm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailRecuperacao, setEmailRecuperacao] = useState('');
    const [mensagem, setMensagem] = useState(false);
    const [mensagemString, setMensagemString] = useState('');

    const [showRecuperar, setShowRecuperar] = useState(false);

    const [captchavalidate, setcaptchavalidate] = useState(false);
    const [captchastatus, setcaptchastatus] = useState(false);

    // Recarrega a tela
    const refresh = () => window.location.reload();

    // Handlers modal de recuperar senha
    const handleCloseRecuperar = () => {
        setShowRecuperar(false)
    };
    const handleShowRecuperar = () => {
        setShowRecuperar(true);
    };

    const fazerLogin = (event: any) => {
        event.preventDefault();
        setMensagem(false);

        var data: any = {
            email,
            senha,
        }

        api.post('/user/administrator/login', data)
        .then((response) => { (response.status == 200) ?  loginAccepted(response) : console.log(response) })
        .catch((erro) => {setMensagem(true); setMensagemString(erro.response.data.message)});
        
    }

    const loginAccepted = (response: any) => {
        localStorage.setItem("userType", "admin");
        localStorage.setItem("token", response.data.authenticateInfo.token);
        localStorage.setItem("refreshToken", response.data.authenticateInfo.refreshToken);
        navigate('/');
        refresh();
    }

    return (
        <>
            <NavBarGeral />
            <Container className="containerModal">
                <Modal.Body className=" modal-content-adm">
                    <Row className='justify-content-center' >
                        <img
                            src="/img/logo.svg"
                            width="100"
                            height="100"
                            className="align-items-center"
                            alt=''
                        />{''}
                    </Row>
                <Form onSubmit={fazerLogin}>
                    <Row className='justify-content-center'>
                        <InputTexto defaultValue={''} required={true} label={"Email"} placeholder={""} controlId={"email"} data={email} setData={setEmail} type='' />
                        <InputTexto defaultValue={''} required={true} label={"Senha"} placeholder={""} controlId={"senha"} data={senha} setData={setSenha} type="password" />
                    </Row>
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

                    <Row className='justify-content-center'>
                        <Button className='Botão-Terciário Texto-Azul' onClick={handleShowRecuperar}>
                            Esqueci minha senha
                        </Button>
                    </Row>
                    
                    <Alert style={{ width: 'fit-content' }} show={mensagem} variant="danger">
                            <p>{mensagemString}</p>
                    </Alert>

                    <Row className='justify-content-center'>

                        <Button className='Botão-Primario Texto-Branco' type='submit'>
                            Entrar
                        </Button>
                    </Row>
                </Form>
                </Modal.Body>
            </Container>

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
                            type='' />
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