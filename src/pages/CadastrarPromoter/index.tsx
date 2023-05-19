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

export default function CadastrarPromoter() {
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
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

    const realizarCadastro = (event: any) => {
        event.preventDefault();

        var dadosPromoter = {
            nome: `${primeiroNome} ${sobrenome}`,
            telefone,
            cpf: cpfCnpj,
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
        api.post("/user/promoter", dadosPromoter).then((response)=>{console.log(response)});
    }

    // Acompanha as mudanças na variavel CEP e chama o conteudo quando ocorrem
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

    return (
        <>
        <NavBarGeral user='default'/>
        <Form style={{minHeight: '75vh'}} onSubmit={realizarCadastro}>
            <Container>
                <Row >
                    <FormLabel label='Cadastro de Promoter' />
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
                    <Col>
                        <InputTexto type={'email'} defaultValue={''} required={true} label={"Email"} placeholder={"email@gmail.com"} controlId={"email"} data={email} setData={setEmail} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type={'password'} defaultValue={''} required={true} label={"Senha"} placeholder={""} controlId={"senha"} data={senha} setData={setSenha} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type={'password'} defaultValue={''} required={true} label={"Confirmar senha"} placeholder={""} controlId={"confirmarSenha"} data={confirmacaoSenha} setData={setConfirmacaoSenha} />
                    </Col>
                </Row>

                <Row className='d-flex justify-content-center'>
                    <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Secundario Texto-Azul'>
                        Cancelar
                    </Button>
                    <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Primario Texto-Branco' type="submit" >
                        Confirmar
                    </Button>
                </Row>

            </Container>
        </Form>
        </>
    )
}