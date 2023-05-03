import React, { ReactNode, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../Button/Button.css';
import InputTexto from '../InputTexto';
import { Link } from 'react-router-dom';
import ModalRecuperarSenha from '../ModalRecuperarSenha';

export default function ModalLogin() {
    const [show, setShow] = useState(false);
    const [cpf, setCPF] = useState('');
    const [senha, setSenha] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='Botão-Terciário' onClick={handleShow}>
                Entrar
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
                    <p className='Texto-MuitoPequeno Texto-Preto'>
                        Bem vindo novamente! Por gentileza realize o Login em sua conta.
                    </p>

                    <InputTexto defaultValue={''} required={true} label={"CPF"} placeholder={""} controlId={"cpf"} data={cpf} setData={setCPF} />
                    <InputTexto defaultValue={''} required={true} label={"Senha"} placeholder={""} controlId={"senha"} data={senha} setData={setSenha} />
                    
                    <p>
                        aqui vai ter um captcha
                    </p>

                    <ModalRecuperarSenha/>

                    <Button className='Botão-Primário Texto-Branco' type='submit'>
                        Entrar
                    </Button>

                </Modal.Body>
            </Modal>
        </>
    );
}

