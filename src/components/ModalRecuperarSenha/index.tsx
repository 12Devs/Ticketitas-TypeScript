import React, { ReactNode, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../Button/Button.css';
import InputTexto from '../InputTexto';
import { Row } from 'react-bootstrap';

export default function ModalRecuperarSenha() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='Botão-Terciário Texto-Azul' onClick={handleShow}>
                Esqueci minha senha
            </Button>

            <Modal show={show} onHide={handleClose} style={{backgroundColor: "#23272E"}}>
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
                            data={email} 
                            setData={setEmail} />
                    </Row>

                    <Row className='justify-content-center'>
                        aqui vai ter um captcha
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

