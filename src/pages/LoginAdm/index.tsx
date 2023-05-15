import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalLogin from '../../components/ModalLogin';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import InputTexto from '../../components/InputTexto';
import ModalRecuperarSenha from '../../components/ModalRecuperarSenha';
import "./LoginAdm.css"

export default function LoginAdm() {
    const [show, setShow] = useState(false);
    const [cpf, setCPF] = useState('');
    const [senha, setSenha] = useState('');
    const [userType, setUserType] = useState('cliente');
    const [captchavalidate, setcaptchavalidate] = useState(false);
    const [captchastatus, setcaptchastatus] = useState(false);
    return(
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
                    <p className='Texto-MuitoPequeno Texto-Preto text-center' style={{marginTop: '20px'}}>
                        Bem vindo novamente! Por gentileza realize o Login em sua conta.
                    </p>
                </Row>


                <Row className='justify-content-center'>
                    <InputTexto defaultValue={''} required={true} label={"CPF"} placeholder={""} controlId={"cpf"} data={cpf} setData={setCPF} type=''/>
                    <InputTexto defaultValue={''} required={true} label={"Senha"} placeholder={""} controlId={"senha"} data={senha} setData={setSenha} type="password"/>
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
                    <ModalRecuperarSenha />
                </Row>

                <Row className='justify-content-center'>

                        <Button className='Botão-Primario Texto-Branco' type='submit'>
                        Entrar
                        </Button>
                </Row>
        </Modal.Body>
    </Container>

    );
}