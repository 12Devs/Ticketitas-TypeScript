import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalLogin from '../../components/ModalLogin';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import InputTexto from '../../components/InputTexto';
import "./LoginAdm.css"
import NavBarGeral from '../../components/NavBarGeral';

export default function LoginAdm() {
    const [show, setShow] = useState(false);
    const [cpf, setCPF] = useState('');
    const [senha, setSenha] = useState('');
    const [userType, setUserType] = useState('cliente');
    const [emailRecuperacao, setEmailRecuperacao] = useState('');

    const [showRecuperar, setShowRecuperar] = useState(false);

    const [captchavalidate, setcaptchavalidate] = useState(false);
    const [captchastatus, setcaptchastatus] = useState(false);

    // Handlers modal de recuperar senha
    const handleCloseRecuperar = () => {
        setShowRecuperar(false)
    };
    const handleShowRecuperar = () => {
        setShowRecuperar(true);
    };

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


                    <Row className='justify-content-center'>
                        <InputTexto defaultValue={''} required={true} label={"CPF"} placeholder={""} controlId={"cpf"} data={cpf} setData={setCPF} type='' />
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

                    <Row className='justify-content-center'>

                        <Button className='Botão-Primario Texto-Branco' type='submit'>
                            Entrar
                        </Button>
                    </Row>
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