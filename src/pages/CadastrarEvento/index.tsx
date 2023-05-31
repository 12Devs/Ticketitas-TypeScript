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
import {api} from '../../services/api';
import { useNavigate } from 'react-router-dom';

import '../pages.css';
import '../../components/Texto/Texto.css';
import '../../components/Button/Button.css';

export default function CadastrarEvento() {
    const [primeiroNome, setprimeiroNome] = useState('');
    const [sobrenome, setSobreome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const navigate = useNavigate();

    const realizarCadastro = (event: any) => {
        event.preventDefault();
        var dadosCliente: any = {
            nome: `${primeiroNome} ${sobrenome}`, 
            telefone,
            cpf,
            cep,
            cidade,
            estado,
            bairro,
            rua,
            numero,
            email,
            senha,
            confirmacaoSenha
        }
        
        api.post("/user/client", dadosCliente).then((response)=>{console.log(response)});

        navigate('/');
        
    }

    // Acompanha as mudanças na variavel CEP e chama o conteudo quando ocorrem
    useEffect(() => {
        if(cep.length == 8 && !isNaN(parseInt(cep))){
            
            api.get(`/endereco/${cep}`).then((endereco) => {
                setCidade(endereco.data.localidade);
                setEstado(endereco.data.uf);
                setBairro(endereco.data.bairro);
                setRua(endereco.data.logradouro);
            });
        }
    }, [cep]);

    return (
        <>
            <NavBarGeral />
            <Form style={{minHeight: '75vh'}} onSubmit={realizarCadastro}>
                <Container>

                    <Row >
                        <FormLabel label='Cadastrar Evento'/>
                    </Row> 

                    <Row>
                        <Col sm={6}>
                            <InputTexto type='text' defaultValue={''} required={true} label={"Nome do evento"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type='date' defaultValue={''} required={true} label={"Data do evento"} placeholder={""} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type='text' defaultValue={''} required={true} label={"Descrição do evento"} placeholder={""} controlId={"telefone"} data={telefone} setData={setTelefone}  />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Quantidade de ingressos"} placeholder={""} controlId={"cpf"} data={cpf} setData={setCpf} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Valor Pista"} placeholder={""} controlId={"cep"} data={cep} setData={setCep} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Valor Vip"} placeholder={""} controlId={"cidade"} data={cidade} setData={setCidade} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type='Number' defaultValue={''} required={true} label={"Valor Backstage"} placeholder={""} controlId={"estado"} data={estado} setData={setEstado} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Horário"} placeholder={""} controlId={"bairro"} data={bairro} setData={setBairro} />
                        </Col>
                    </Row>


                    <Row className='d-flex justify-content-center'>
                            <Button href='/' style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Secundario Texto-Azul'>
                                Cancelar
                            </Button>
                            <Button style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Primario Texto-Branco' type="submit">
                                Confirmar
                            </Button>
                    </Row>

                </Container>
            </Form>
        </>
    )
}