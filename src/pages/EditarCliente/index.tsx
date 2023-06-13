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

import '../pages.css';
import '../../components/Texto/Texto.css';
import '../../components/Button/Button.css';
import jwtDecode from 'jwt-decode';



export default function EditarCliente() {
    const [userType, setUserType] = useState('');
    const [cpf, setCpf] = useState('');
    const [primeiroNome, setprimeiroNome] = useState('');
    const [sobrenome, setSobreome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');

    const [show, setShow] = useState(false);
    const [showRecuperar, setShowRecuperar] = useState(false);
    const handleShowRecuperar = () => {
        setShowRecuperar(true);
        setShow(false)
    };

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    let dados: any;
    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('userType');
        if (token != null) {
            dados = jwtDecode(token);
            if (dados != null) {
                setCpf(dados.sub);
            }
        }
        if (user != null) {
            setUserType(user)
        }

        api.get("user/client", config).then((response) => {
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
        var nome: any = {
            userType,
            cpf,
            primeiroNome
        }
        var email: any = {
            userType,
            cpf,
            primeiroNome
        }
        var email: any = {
            userType,
            cpf,
            primeiroNome
        }
        api.post(`user/client/`, config).then(response) => {
        console.log

    }
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
                        <InputTexto type='text' defaultValue={''} required={true} label={"Primeiro nome"} placeholder={primeiroNome} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type='text' defaultValue={''} required={true} label={"Sobrenome"} placeholder={sobrenome} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type='number' defaultValue={''} required={true} label={"Telefone"} placeholder={telefone} controlId={"telefone"} data={telefone} setData={setTelefone} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type='number' defaultValue={''} required={true} label={"CPF"} placeholder={cpf} controlId={"cpf"} data={cpf} setData={setCpf} />
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
                    <Col sm={8}>
                        <InputTexto type='email' defaultValue={''} required={true} label={"Email"} placeholder={email} controlId={"email"} data={email} setData={setEmail} />
                    </Col>
                    <Col sm={4}>
                        <Button href='/' style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Terciário Texto-Azul'>
                            Alterar senha
                        </Button>
                    </Col>
                </Row>

                <Row className='d-flex justify-content-center'>
                    <Button href='/' style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Secundario Texto-Azul'>
                        Cancelar
                    </Button>
                    <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Primario Texto-Branco' type="submit">
                        Confirmar alterações
                    </Button>
                </Row>

            </Container>
        </Form>
    </>
)
}