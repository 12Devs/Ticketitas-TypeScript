import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import React, { useEffect } from 'react';
import InputTexto from '../../components/InputTexto';
import FormLabel from '../../components/FormLabel';
import { api } from '../../services/api';
import NavBarGeral from '../../components/NavBarGeral';
import '../pages.css';

// {
//     "name": "João Gabriel",
//     "cpf": 8587090,
//     "email": "gcmorais66@gmail.com",
//     "phone": 222
// }

export default function CadastrarAdmin() {
    const [primeiroNome, setprimeiroNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');

    // const [cep, setCep] = useState('');
    // const [cidade, setCidade] = useState('');
    // const [estado, setEstado] = useState('');
    // const [bairro, setBairro] = useState('');
    // const [rua, setRua] = useState('');
    // const [numero, setNumero] = useState('');
    

    const realizarCadastro = (event: any) => {
        event.preventDefault();
        var dadosAdmin: any = {
            name: `${primeiroNome} ${sobrenome}`,
            phone: telefone,
            cpf,
            email
        }

        api.post("/user/administrator", dadosAdmin).then((response)=>{console.log(response)});

    }
    
    

    // Acompanha as mudanças na variavel CEP e chama o conteudo quando ocorrem
    // useEffect(() => {
    //     if (cep.length == 8 && !isNaN(parseInt(cep))) {
            
    //         api.get(`/endereco/${cep}`).then((endereco) => {
    //             setCidade(endereco.data.localidade);
    //             setEstado(endereco.data.uf);
    //             setBairro(endereco.data.bairro);
    //             setRua(endereco.data.logradouro);
    //         });
    //     }
    // }, [cep]);

    return (
        <>
        <NavBarGeral />
        <Form style={{minHeight: '75vh'}} onSubmit={realizarCadastro}>
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
                        <InputTexto type="number" defaultValue={''} required={true} label={"Telefone"} placeholder={""} controlId={"telefone"} data={telefone} setData={setTelefone} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type="number" defaultValue={''} required={true} label={"CPF"} placeholder={""} controlId={"cpf"} data={cpf} setData={setCpf} />
                    </Col>
                </Row>

                {/* <Row>
                    <Col sm={6}>
                        <InputTexto type="number" defaultValue={''} required={false} label={"CEP"} placeholder={""} controlId={"cep"} data={cep} setData={setCep} />
                    </Col>
                </Row> */}
{/* 
                <Row>
                    <Col sm={8}>
                        <InputTexto type="text" defaultValue={''} required={false} label={"Cidade"} placeholder={""} controlId={"cidade"} data={cidade} setData={setCidade} />
                    </Col>
                    { <Col sm={4}>
                        <InputTexto type="text" defaultValue={''} required={false} label={"Estado"} placeholder={""} controlId={"estado"} data={estado} setData={setEstado} />
                    </Col> }
                </Row> */}

                {/* <Row>
                    <Col>
                        <InputTexto type="text" defaultValue={''} required={false} label={"Bairro"} placeholder={""} controlId={"bairro"} data={bairro} setData={setBairro} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={8}>
                        <InputTexto type="text" defaultValue={''} required={false} label={"Rua"} placeholder={""} controlId={"rua"} data={rua} setData={setRua} />
                    </Col>
                    <Col sm={4}>
                        <InputTexto type="text" defaultValue={''} required={false} label={"Número"} placeholder={""} controlId={"numero"} data={numero} setData={setNumero} />
                    </Col>
                </Row> */}

                <Row>
                    <Col>
                        <InputTexto type="email" defaultValue={''} required={true} label={"Email"} placeholder={"email@gmail.com"} controlId={"email"} data={email} setData={setEmail} />
                    </Col>
                </Row>


                <Row className='d-flex justify-content-center'>
                        <Button href='/' style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Secundario Texto-Azul'>
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