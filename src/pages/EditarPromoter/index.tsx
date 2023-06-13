import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import FormLabel from '../../components/FormLabel';
import { useState } from 'react';
import React, { useEffect } from 'react';
import InputTexto from '../../components/InputTexto';
import { api } from '../../services/api';
import '../pages.css'
import NavBarGeral from '../../components/NavBarGeral';
import { useNavigate } from 'react-router-dom';

import { Modal } from 'react-bootstrap';

export default function CadastrarPromoter() {
    const [userType, setUserType] = useState('');
    const [primeiroNome, setprimeiroNome] = useState('');
    const [sobrenome, setSobreome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');
    // const [senha, setSenha] = useState('');
    // const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [senhaAtual, setsenhaAtual] = useState('');
    const [novaSenha, setnovaSenha] = useState('');
    const [confirmarSenha, setconfirmarSenha] = useState('');

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    const alterarSenha = (event: any) => {
        event.preventDefault();
    }

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    let dados: any;
    useEffect(() => {
        const user = localStorage.getItem('userType');
        if (user != null) {
            setUserType(user)
        }

        api.get("user/promoter", config).then((response) => {
            console.log(response)
            setprimeiroNome(response.data.ClientInfos.client.nome)
            setEmail(response.data.ClientInfos.client.email)
            setTelefone(response.data.ClientInfos.client.telefone)
            setCep(response.data.enderecoClient.enderecoClient.cep)
            setEstado(response.data.ClientInfos.enderecoClient.estado)
            setBairro(response.data.ClientInfos.enderecoClient.bairro)
            setRua(response.data.ClientInfos.enderecoClient.rua)
            setBairro(response.data.ClientInfos.enderecoClient.bairro)
        });
    }, [])

    const editarCadastro = (event: any) => {
        event.preventDefault();

    }


    return (
        <>
            <NavBarGeral />
            <Form style={{ minHeight: '75vh' }} onSubmit={editarCadastro}>
                <Container>
                    <Row >
                        <FormLabel label='Editar informações' />
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Primeiro nome"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Sobrenome"} placeholder={""} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"Telefone"} placeholder={""} controlId={"telefone"} data={telefone} setData={setTelefone} />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"CPF/CNPJ"} placeholder={""} controlId={"cpfCnpj"} data={cpfCnpj} setData={setCpfCnpj} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"CEP"} placeholder={""} controlId={"cep"} data={cep} setData={setCep} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Cidade"} placeholder={""} controlId={"cidade"} data={cidade} setData={setCidade} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Estado"} placeholder={""} controlId={"estado"} data={estado} setData={setEstado} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Bairro"} placeholder={""} controlId={"bairro"} data={bairro} setData={setBairro} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Rua"} placeholder={""} controlId={"rua"} data={rua} setData={setRua} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Número"} placeholder={""} controlId={"numero"} data={numero} setData={setNumero} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <InputTexto type='email' defaultValue={''} required={true} label={"Email"} placeholder={email} controlId={"email"} data={email} setData={setEmail} />
                        </Col>
                        <Col sm={4}>
                            <Button href='/' style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Terciário Texto-Azul' onClick={handleShow}>
                                Alterar senha
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Body className=" modal-content">
                                    <Row className='d-flex justify-content-center' >
                                        <h1 style={{ fontSize: 20 }}>Alterar senha</h1>
                                    </Row>

                                    <Form onSubmit={alterarSenha}>
                                        <Row className='justify-content-center'>
                                            <InputTexto defaultValue={''} required={true} label={"Senha atual"} placeholder={""} controlId={"Senha atual"} data={senhaAtual} setData={setsenhaAtual} type='text' />
                                            <InputTexto defaultValue={''} required={true} label={"Nova senha"} placeholder={""} controlId={"Nova Senha"} data={novaSenha} setData={setnovaSenha} type="text" />
                                            <InputTexto defaultValue={''} required={true} label={"Confirmar nova senha"} placeholder={""} controlId={"Confirmar nova senha"} data={confirmarSenha} setData={setconfirmarSenha} type="text" />
                                        </Row>
                                        <Row className='justify-content-center'>
                                            <Button className='Botão-Primario Texto-Branco' type='submit'>
                                                Confirmar alteração
                                            </Button>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>

                    <Row className='d-flex justify-content-center'>
                        <Button href='/' style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Secundario Texto-Azul'>
                            Cancelar
                        </Button>
                        <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Primario Texto-Branco' type="submit" >
                            Confirmar alterações
                        </Button>
                    </Row>

                </Container>
            </Form>
        </>
    )
}