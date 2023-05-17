import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReCAPTCHA from "react-google-recaptcha";
import '../Button/Button.css';
import InputTexto from '../InputTexto';
import ModalRecuperarSenha from '../ModalRecuperarSenha';
import { Form, Row } from 'react-bootstrap';

import "./ModalLogin.css"
export default function ModalLogin() {
    const fazerLogin = (event: any) => {
        event.preventDefault();
        var data: any = {
            cpf,
            senha,
        }
        if(userType == 'promoter'){
            ///api promoter
        }
        else if(userType == 'cliente'){
            /// api cliente
        }

        
    }
    const [show, setShow] = useState(false);
    const [cpf, setCPF] = useState('');
    const [senha, setSenha] = useState('');
    const [userType, setUserType] = useState('cliente');
    const [captchavalidate, setcaptchavalidate] = useState(false);
    const [captchastatus, setcaptchastatus] = useState(false);
 

    const handleClose = () => {
        setShow(false)
        setcaptchavalidate(false)
        setcaptchastatus(false)
    };
    const handleShow = () => {
        setcaptchastatus(true)
        setShow(true)};
    

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
                        <p className='Texto-MuitoPequeno Texto-Preto text-center' style={{marginTop: '20px'}}>
                            Bem vindo novamente! Por gentileza realize o Login em sua conta.
                        </p>
                    </Row>

                    <Row className='justify-content-center'>
                        <Form.Select aria-label="Sou cliente" style={{width: '150px', borderStyle: 'hidden', backgroundColor: '#1F82B2',color: 'white'}} 
                        onChange={(event) => setUserType(event.target.value)}>
                            <option value="cliente" >Sou cliente</option>
                            <option value="promoter">Sou promoter</option>
                        </Form.Select>
                    </Row>
                    <Form onSubmit={fazerLogin}>
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

                    <Row className='justify-content-center' >
                        <ModalRecuperarSenha />
                    </Row>

                    <Row className='justify-content-center'>

                    <Button className='Botão-Primario Texto-Branco' type='submit'>
                            Entrar
                    </Button>
                
                    </Row>
                </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

