import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import InputTexto from '../../components/InputTexto';
import FormLabel from '../../components/FormLabel';
import { api } from '../../services/api';
import NavBarGeral from '../../components/NavBarGeral';
import { useNavigate } from 'react-router-dom';

import '../pages.css';
import jwtDecode from 'jwt-decode';

export default function EditarAdmin() {
    const [userType, setUserType] = useState('');
    const [cpf, setCpf] = useState('');
    const [primeiroNome, setprimeiroNome] = useState('');
    const [sobrenome, setSobreome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    let dados: any;
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('userType');
        if(token != null){
            dados = jwtDecode(token);
            if(dados != null){
                setCpf(dados.sub);
            }
        }
        if(user != null){
            setUserType(user)
        }
    

        api.get(`user/administrator/${dados.sub}`).then((response) => {
            console.log(response)
            setprimeiroNome(response.data.ClientInfos.client.nome)
            setEmail(response.data.ClientInfos.client.email)
            setTelefone(response.data.ClientInfos.client.telefone)
        });
        
        
    },[])

    return (
        <>
        <NavBarGeral />
        <Form style={{minHeight: '75vh'}} onSubmit={EditarAdmin}>
            <Container>

                <Row>
                    <FormLabel label='Editar informações'/>
                </Row> 

                <Row>
                    <Col sm={6}>
                        <InputTexto type="text" defaultValue={''} required={true} label={"Primeiro nome"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type="text" defaultValue={''} required={true} label={"Sobrenome"} placeholder={""} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome} />
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
                        <Button href='/' style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Secundario Texto-Azul'>
                            Cancelar
                        </Button>
                        <Button style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Primario Texto-Branco' type="submit" >
                            Confirmar alterações
                        </Button>
                </Row>

            </Container>
        </Form>
        </>
    )
    }
