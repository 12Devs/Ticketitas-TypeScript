import React, { ReactNode, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../Button/Button.css';
import InputTexto from '../InputTexto';

export default function ModalRecuperarSenha() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='Botão-Terciário Texto-Preto' onClick={handleShow}>
                Esqueci minha senha
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <img
                        src="/img/logo.svg"
                        width="100"
                        height="100"
                        className="align-items-center"
                        alt=''
                    />{''}
                    <p className='Texto-Grande Texto-Preto'>
                        Recuperar senha
                    </p>

                    <InputTexto defaultValue={''} required={true} label={"Email"} placeholder={""} controlId={"email"} data={email} setData={setEmail} />

                    <p>
                        aqui vai ter um captcha
                    </p>

                    <Button className='Botão-Primário Texto-Branco' type='submit'>
                        Enviar
                    </Button>

                </Modal.Body>
            </Modal>
        </>
    );
}

