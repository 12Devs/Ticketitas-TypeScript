import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import InputTexto from '../../components/InputTexto';

// import InputText from '../InputText'
// import InputSelect from '../InputSelect';
// import AbaIndicacao from '../AbaIndicacao';
// import Footer from '../Footer';





export default function CadastrarCliente() {
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
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');

    const realizarCadastro = (event: any) => {
        event.preventDefault();

        var dadosCliente = {
            primeiroNome,
            sobrenome,
            telefone,
            cpfCnpj,
            cep,
            cidade,
            estado,
            bairro,
            rua,
            numero,
            email,
            senha,
            senhaConfirmacao
        }
        console.log(dadosCliente);
    }

    return (
        <Form onSubmit={realizarCadastro} className='mainContent'>
            <Container className='p-5'>

                {/* <Row className='mb-5'>
                    <AbaIndicacao label={"Realizar cadastro"} />
                </Row> */}

                <Row>
                    <Col sm={6}>
                        <InputTexto type={''} defaultValue={''} required={true} label={"Primeiro nome"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type={''} defaultValue={''} required={true} label={"Sobrenome"} placeholder={""} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type={''} defaultValue={''} required={true} label={"Telefone"} placeholder={""} controlId={"telefone"} data={telefone} setData={setTelefone} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type={''} defaultValue={''} required={true} label={"CPF/CNPJ"} placeholder={""} controlId={"cpfCnpj"} data={cpfCnpj} setData={setCpfCnpj} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type={''} defaultValue={''} required={true} label={"CEP"} placeholder={""} controlId={"cep"} data={cep} setData={setCep} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={8}>
                        <InputTexto type={''} defaultValue={''} required={true} label={"Cidade"} placeholder={""} controlId={"cidade"} data={cidade} setData={setCidade} />
                    </Col>
                    {/* <Col sm={4}>
                        <InputSelect label={"Estado"} name={'Estados'} data={estado} setData={setEstado} />
                    </Col> */}
                </Row>

                <Row>
                    <Col>
                        <InputTexto type={''} defaultValue={''} required={true} label={"Bairro"} placeholder={""} controlId={"bairro"} data={bairro} setData={setBairro} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={8}>
                        <InputTexto type={''} defaultValue={''} required={true} label={"Rua"} placeholder={""} controlId={"rua"} data={rua} setData={setRua} />
                    </Col>
                    <Col sm={4}>
                        <InputTexto type={''} defaultValue={''} required={true} label={"Número"} placeholder={""} controlId={"numero"} data={numero} setData={setNumero} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <InputTexto type={'email    '} defaultValue={''} required={true} label={"Email"} placeholder={"email@gmail.com"} controlId={"email"} data={email} setData={setEmail} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type={'password'} defaultValue={''} required={true} label={"Senha"} placeholder={""} controlId={"senha"} data={senha} setData={setSenha} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type={'password'} defaultValue={''} required={true} label={"Confirmar senha"} placeholder={""} controlId={"confirmarSenha"} data={senhaConfirmacao} setData={setSenhaConfirmacao} />
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col sm={6} className=' d-flex justify-content-end'>
                        <Button variant="outline-secondary">
                            Cancelar
                        </Button>
                    </Col>
                    <Col sm={6}>
                        <Button type="submit" variant="primary">
                            Confirmar
                        </Button>
                    </Col>
                </Row>

            </Container>
        </Form>
    )
}