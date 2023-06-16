import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import React, { useEffect } from 'react';
import InputTexto from '../../components/InputTexto';
import FormLabel from '../../components/FormLabel';
import NavBarGeral from '../../components/NavBarGeral';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Alert, Modal } from 'react-bootstrap';

import '../pages.css';
import '../../components/Texto/Texto.css';
import '../../components/Button/Button.css';
import jwtDecode from 'jwt-decode';
import OutputInfo from '../../components/OutputInfo';
import Forbidden403 from '../Forbidden403';



export default function EditarCliente() {
    const [userType, setUserType] = useState('');
    const [cpf, setCpf] = useState('undefined');
    const [nomeCompleto, SetnomeCompleto] = useState('undefined');
    const [primeiroNome, setprimeiroNome] = useState('undefined');
    const [sobrenome, setSobrenome] = useState('undefined');
    const [telefone, setTelefone] = useState('undefined');
    const [cep, setCep] = useState('undefined');
    const [cidade, setCidade] = useState('undefined');
    const [estado, setEstado] = useState('undefined');
    const [bairro, setBairro] = useState('undefined');
    const [rua, setRua] = useState('undefined');
    const [numero, setNumero] = useState('undefined');
    const [email, setEmail] = useState('undefined');
    const [cardNumber, setcardNumber] = useState('');
    const [cardNumberFour, setcardNumberFour] = useState('');
    const [saldo, setSaldo] = useState('0');
    const [show, setShow] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [senhaAtual, setsenhaAtual] = useState('');
    const [novaSenha, setnovaSenha] = useState('');
    const [confirmarSenha, setconfirmarSenha] = useState('');
    const [novoEmail, setnovoEmail] = useState('');
    const [confirmarEmail, setconfirmarEmail] = useState('');

    const [mensagem, setMensagem] = useState(false);
    const [mensagemString, setMensagemString] = useState('');

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    const handleCloseEmail = () => {
        setShowEmail(false)
    };
    const handleShowEmail = () => {
        setShowEmail(true)
    };

    const voltarPerfil = () => {
        navigate('/perfil');
    }

    const refresh = () => window.location.reload();

    const navigate = useNavigate();

    function pegarNome(nomeCompleto: string) {
        let partesNome = nomeCompleto.split(' ');

        let nome = partesNome[0];
        setprimeiroNome(nome)
    }
    function pegarSobrenome(nomeCompleto: string) {
        let partesNome = nomeCompleto.split(' ');

        if (partesNome.length < 2) {
            setSobrenome("")
        }
        else {
            let sobrenome = partesNome[partesNome.length - 1];
            setSobrenome(sobrenome)
        }
    }

    function pegarUltimosQuatroDigitos(numero: string) {
        let ultimosQuatroDigitos = numero.slice(-4);
        setcardNumberFour(ultimosQuatroDigitos);
    }


    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        const user = localStorage.getItem('userType');
        if (user != null) {
            setUserType(user);
        }
        const cpfLocalStorage = localStorage.getItem('CPF');
        if (cpfLocalStorage != null) {
            setCpf(cpfLocalStorage);
        }


        api.get("user/client/", config).then((response) => {
            console.log(response)
            SetnomeCompleto(response.data.ClientInfos.client.nome);
            setEmail(response.data.ClientInfos.client.email);
            setSaldo(response.data.ClientInfos.client.saldo);
            setCpf(response.data.ClientInfos.client.cpf);
            setTelefone(response.data.ClientInfos.client.telefone);
            setCep(response.data.ClientInfos.enderecoClient.cep);
            setEstado(response.data.ClientInfos.enderecoClient.estado)
            setBairro(response.data.ClientInfos.enderecoClient.bairro)
            setRua(response.data.ClientInfos.enderecoClient.rua)
            setBairro(response.data.ClientInfos.enderecoClient.bairro)
            setNumero(response.data.ClientInfos.enderecoClient.numero)
            setCidade(response.data.ClientInfos.enderecoClient.cidade)
            pegarUltimosQuatroDigitos(cardNumber)
            console.log(response.data.ClientInfos.client.nome)
            pegarNome(response.data.ClientInfos.client.nome)
            pegarSobrenome(response.data.ClientInfos.client.nome)

        });


    }, [])


    useEffect(() => {

        if (cep.length == 8 && !isNaN(parseInt(cep))) {

            api.get(`/endereco/${cep}`).then((endereco) => {
                setCidade(endereco.data.localidade);
                setEstado(endereco.data.uf);
                setBairro(endereco.data.bairro);
                setRua(endereco.data.logradouro);
            });
        }
    }, [cep]);

    const editarCliente = (event: any) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        event.preventDefault();
        let nomeCliente: any = {
            newName: `${primeiroNome} ${sobrenome}`,
            tipo: userType,
            cpf
        }
        let telefoneCliente: any = {
            newPhone: telefone,
            tipo: userType,
            cpf
        }
        let enderecoCliente: any = {
            cep,
            cidade,
            estado,
            bairro,
            rua,
            numero,
            tipo: userType,
        }

        api.post("user/client/update-address", enderecoCliente, config).then((response) => { console.log(response) });
        api.post("user/client/update-name", nomeCliente, config).then((response) => { console.log(response) });
        api.post("user/client/update-phone", telefoneCliente, config).then((response) => { console.log(response) });
        navigate('/perfil');
        refresh()
    }


    const alterarSenha = (event: any) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        event.preventDefault();
        let senha: any = {
            tipo: userType,
            cpf,
            passwordAuth: senhaAtual,
            newPassword: novaSenha,
            newPasswordConfirmation: confirmarSenha
        }
        api.post("user/client/update-password", senha, config).then((response) => { console.log(response) });
        refresh()
    }


    const alterarEmail = (event: any) => {
        setMensagem(false);

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        event.preventDefault();
        let email: any = {
            tipo: userType,
            cpf,
            newEmail: novoEmail,
            newEmailConfirmation: confirmarEmail,
            passwordAuth: senhaAtual
        }
        api.post("user/client/update-email", email, config).then((response) => { console.log(response); refresh() }).catch((erro) => { setMensagemString(erro.response.data.message); setMensagem(true) });

    }

    if (localStorage.getItem("userType") == "cliente") {
        return (
            <>
                <NavBarGeral />
                <Form style={{ minHeight: '75vh' }} onSubmit={editarCliente}>
                    <Container>

                        <Row >
                            <FormLabel label='Editar informações' />
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <InputTexto type='text' defaultValue={''} required={true} label={"Primeiro nome"} placeholder={primeiroNome} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                            </Col>
                            <Col sm={6}>
                                <InputTexto type='text' defaultValue={''} required={true} label={"Sobrenome"} placeholder={sobrenome} controlId={"inputSobrenome"} data={sobrenome} setData={setSobrenome} />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <InputTexto type='number' defaultValue={''} required={true} label={"Telefone"} placeholder={telefone} controlId={"telefone"} data={telefone} setData={setTelefone} />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <InputTexto type='number' defaultValue={''} required={true} label={"CEP"} placeholder={cep} controlId={"cep"} data={cep} setData={setCep} />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={8}>
                                <InputTexto type='text' defaultValue={''} required={true} label={"Cidade"} placeholder={cidade} controlId={"cidade"} data={cidade} setData={setCidade} />
                            </Col>
                            <Col sm={4}>
                                <InputTexto type='text' defaultValue={''} required={true} label={"Estado"} placeholder={estado} controlId={"estado"} data={estado} setData={setEstado} />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <InputTexto type='text' defaultValue={''} required={true} label={"Bairro"} placeholder={bairro} controlId={"bairro"} data={bairro} setData={setBairro} />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={8}>
                                <InputTexto type='text' defaultValue={''} required={true} label={"Rua"} placeholder={rua} controlId={"rua"} data={rua} setData={setRua} />
                            </Col>
                            <Col sm={4}>
                                <InputTexto type='text' defaultValue={''} required={true} label={"Número"} placeholder={numero} controlId={"numero"} data={numero} setData={setNumero} />
                            </Col>
                        </Row>

                        <Row>

                            <Col md={{ span: 3, offset: 3 }}>
                                <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Terciário Texto-Azul' onClick={handleShowEmail}>
                                    Alterar email
                                </Button>
                                <Modal show={showEmail} onHide={handleCloseEmail}>
                                    <Modal.Body className=" modal-content">
                                        <Row className='d-flex justify-content-center' >
                                            <h1 style={{ fontSize: 20 }}>Alterar email</h1>
                                        </Row>

                                        <Form >
                                            <Row className='justify-content-center'>
                                                <InputTexto defaultValue={''} required={true} label={"Novo email"} placeholder={""} controlId={"Novo email"} data={novoEmail} setData={setnovoEmail} type="text" />
                                                <InputTexto defaultValue={''} required={true} label={"Confirmar novo email"} placeholder={""} controlId={"Confirmar novo email"} data={confirmarEmail} setData={setconfirmarEmail} type="text" />
                                                <InputTexto defaultValue={''} required={true} label={"Senha atual"} placeholder={""} controlId={"Senha atual"} data={senhaAtual} setData={setsenhaAtual} type='password' />
                                            </Row>
                                            <Row className='justify-content-center'>
                                                <Button className='Botão-Primario Texto-Branco' onClick={alterarEmail}>
                                                    Confirmar alteração
                                                </Button>
                                            </Row>
                                            <Row>
                                                <Alert style={{ width: 'fit-content' }} className='m-3' show={mensagem} variant="danger">
                                                    <p>{mensagemString}</p>
                                                </Alert>
                                            </Row>
                                        </Form>
                                    </Modal.Body>
                                </Modal>

                            </Col>
                            <Col md={3}>
                                <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Terciário Texto-Azul' onClick={handleShow}>
                                    Alterar senha
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Body className=" modal-content">
                                        <Row className='d-flex justify-content-center' >
                                            <h1 style={{ fontSize: 20 }}>Alterar senha</h1>
                                        </Row>

                                        <Form onSubmit={alterarSenha}>
                                            <Row className='justify-content-center'>
                                                <InputTexto defaultValue={''} required={true} label={"Senha atual"} placeholder={""} controlId={"Senha atual"} data={senhaAtual} setData={setsenhaAtual} type='password' />
                                                <InputTexto defaultValue={''} required={true} label={"Nova senha"} placeholder={""} controlId={"Nova Senha"} data={novaSenha} setData={setnovaSenha} type="password" />
                                                <InputTexto defaultValue={''} required={true} label={"Confirmar nova senha"} placeholder={""} controlId={"Confirmar nova senha"} data={confirmarSenha} setData={setconfirmarSenha} type="password" />
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
                            <Button onClick={voltarPerfil} style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Secundario Texto-Azul'>
                                Cancelar
                            </Button>
                            <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Primario Texto-Branco' type="submit">
                                Confirmar alterações
                            </Button>
                        </Row>
                    </Container>
                </Form>
            </>
        );
    } else {
        return (<Forbidden403 />)
    }
}