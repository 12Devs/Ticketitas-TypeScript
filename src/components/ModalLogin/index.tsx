import React, { ReactNode, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../Button/Button.css';
import InputTexto from '../InputTexto';
import ModalRecuperarSenha from '../ModalRecuperarSenha';
import { Form, Row } from 'react-bootstrap';

export default function ModalLogin() {
    const [show, setShow] = useState(false);
    const [cpf, setCPF] = useState('');
    const [senha, setSenha] = useState('');
    const [userType, setUserType] = useState('cliente');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='Botão-Terciário' onClick={handleShow}>
                Entrar
            </Button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Body className="">
                    <Row className='justify-content-center'>
                        <img
                            src="/img/logo.svg"
                            width="100"
                            height="100"
                            className="align-items-center"
                            alt=''
                        />{''}
                        <p className='Texto-MuitoPequeno Texto-Preto text-center'>
                            Bem vindo novamente! Por gentileza realize o Login em sua conta.
                        </p>
                    </Row>

                    <Row className='justify-content-center'>
                        <Form.Select aria-label="Sou cliente" style={{width: '150px', borderStyle: 'hidden'}}>
                            <option value="cliente">Sou cliente</option>
                            <option value="promoter">Sou promoter</option>
                        </Form.Select>
                    </Row>

                    <Row className='justify-content-center'>
                        <InputTexto defaultValue={''} required={true} label={"CPF"} placeholder={""} controlId={"cpf"} data={cpf} setData={setCPF} />
                        <InputTexto defaultValue={''} required={true} label={"Senha"} placeholder={""} controlId={"senha"} data={senha} setData={setSenha} />
                    </Row>

                    <Row className='justify-content-center'>
                        aqui vai ter um captcha
                    </Row>

                    <Row className='justify-content-center'>
                        <ModalRecuperarSenha />
                    </Row>

                    <Row className='justify-content-center'>
                        <Button className='Botão-Primario Texto-Branco' type='submit'>
                            Entrar
                        </Button>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

