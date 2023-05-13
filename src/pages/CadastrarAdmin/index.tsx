import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import React, { useEffect } from 'react';
import InputTexto from '../../components/InputTexto';
import FormLabel from '../../components/FormLabel';
import Footer from '../../components/Footer';
import { api } from '../../services/api';
import '../pages.css';


export default function CadastrarAdmin() {
    const [primeiroNome, setprimeiroNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');


    const realizarCadastro = (event: any) => {
        event.preventDefault();

        var dadosAdmin = {
            primeiroNome,
            sobrenome,
            telefone,
            cpf,
            cep,
            cidade,
            estado,
            bairro,
            rua,
            numero,
            email,
        }
        console.log(dadosAdmin);
    }

    // Acompanha as mudanças na variavel CEP e chama o conteudo quando ocorrem
    useEffect(() => {
        if (cep.length == 8 && !isNaN(parseInt(cep))) {

            var cepObj: any = {
                cep: parseInt(cep)
            };

            api.post('/endereco/complet', cepObj).then((endereco) => {

                setCidade(endereco.data.localidade);
                setEstado(endereco.data.uf);
                setBairro(endereco.data.bairro);
                setRua(endereco.data.logradouro);
            });
        }
    }, [cep]);

    return (
        <>
        <Form style={{minHeight: '75vh'}} onSubmit={realizarCadastro} className='mainContent'>
            <Container>

                <Row>
                    <FormLabel label='Cadastrar admin'/>
                </Row> 

                <Row>
                    <Col sm={6}>
                        <InputTexto type="text" defaultValue={''} required={true} label={"Primeiro nome"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type="text" defaultValue={''} required={true} label={"Sobrenome"} placeholder={""} controlId={"inputSobrenome"} data={sobrenome} setData={setSobrenome} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type="" defaultValue={''} required={true} label={"Telefone"} placeholder={""} controlId={"telefone"} data={telefone} setData={setTelefone} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type="number" defaultValue={''} required={true} label={"CPF"} placeholder={""} controlId={"cpf"} data={cpf} setData={setCpf} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type="" defaultValue={''} required={true} label={"CEP"} placeholder={""} controlId={"cep"} data={cep} setData={setCep} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={8}>
                        <InputTexto type="" defaultValue={''} required={true} label={"Cidade"} placeholder={""} controlId={"cidade"} data={cidade} setData={setCidade} />
                    </Col>
                    { <Col sm={4}>
                        <InputTexto type="" defaultValue={''} required={true} label={"Estado"} placeholder={""} controlId={"estado"} data={estado} setData={setEstado} />
                    </Col> }
                </Row>

                <Row>
                    <Col>
                        <InputTexto type="" defaultValue={''} required={true} label={"Bairro"} placeholder={""} controlId={"bairro"} data={bairro} setData={setBairro} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={8}>
                        <InputTexto type="" defaultValue={''} required={true} label={"Rua"} placeholder={""} controlId={"rua"} data={rua} setData={setRua} />
                    </Col>
                    <Col sm={4}>
                        <InputTexto type="" defaultValue={''} required={true} label={"Número"} placeholder={""} controlId={"numero"} data={numero} setData={setNumero} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <InputTexto type="email" defaultValue={''} required={true} label={"Email"} placeholder={"email@gmail.com"} controlId={"email"} data={email} setData={setEmail} />
                    </Col>
                </Row>


                <Row className='d-flex justify-content-center'>
                        <Button style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Secundario Texto-Azul'>
                            Cancelar
                        </Button>
                        <Button style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Primario Texto-Branco' type="submit" >
                            Confirmar
                        </Button>
                </Row>

            </Container>
        </Form>
        </>
    )
}