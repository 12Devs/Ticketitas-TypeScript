import React, { ReactNode, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Alert, Container, Form, Row, Col,Image } from 'react-bootstrap';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import NavBarGeral from '../../components/NavBarGeral';
import FormLabel from '../../components/FormLabel';
import OutputInfo from '../../components/OutputInfo';
import jwtDecode from 'jwt-decode';
import "./Perfil.css";


export default function Perfil() {
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

        api.get(`user/client/${dados.sub}`).then((response) => {
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
        
        
    },[])
    
    return(
        <>
        <NavBarGeral/>
        <Container className='justify-content-center'>
            <Row className='d-flex justify-content-center container-perfil'>
                <Col md={8}>
                <FormLabel label={"Meu perfil"}/>
                </Col>
            </Row> 
           
            <Row className='d-flex justify-content-center'>
                <Col md={4}>
                <OutputInfo label='Nome' text={primeiroNome}/>
                </Col>
                <Col md={4}>
                <OutputInfo label='Sobrenome' text='default'/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={8}>
                <OutputInfo label='defalt' text='defalt'/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={1}>
                <OutputInfo label='defalt' text='defalt'/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={1}>
                <OutputInfo label='defalt' text='defalt'/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={2}>
                <OutputInfo label='defalt' text='defalt'/>
                </Col>
                <Col md={2}>
                <OutputInfo label='defalt' text='defalt'/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={1}>
                <OutputInfo label='defalt' text='defalt'/>
                </Col>
                <Col md={1}>
                <OutputInfo label='defalt' text='defalt'/>
                </Col>

            </Row>

            <Row className='d-flex justify-content-center'>
                <Col md={2}>
                <OutputInfo label='defalt' text='defalt'/>
                </Col>
                <Col md={2}>
                <OutputInfo label='defalt' text='defalt'/>
                </Col>

            </Row>
           
            <Row className='d-flex justify-content-center'>

                <Button style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Primario Texto-Branco' type="submit">
                    Editar Informações
                </Button>
                </Row>
        </Container>
        </>
    );
}