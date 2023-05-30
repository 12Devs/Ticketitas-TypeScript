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
        console.log(cpf)
        api.get(`/client/${cpf}`).then((response) => {console.log(response)});
        
    },[])
    const typePerfil = 'Perfil ' + userType;
    
    return(
        <>
        <NavBarGeral/>
        <Container className='justify-content-center'>
            <Row className='d-flex justify-content-center'>
                <Col md={8}>
                <FormLabel label={typePerfil}/>
                </Col>
            </Row> 
           
            <Row className='d-flex justify-content-center'>
                <Col md={4}>
                <OutputInfo label='' text=''/>
                </Col>
                <Col md={4}>
                <OutputInfo label='' text=''/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={8}>
                <OutputInfo label='' text=''/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={1}>
                <OutputInfo label='' text=''/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={1}>
                <OutputInfo label='' text=''/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={2}>
                <OutputInfo label='' text=''/>
                </Col>
                <Col md={2}>
                <OutputInfo label='' text=''/>
                </Col>

            </Row>
            <Row className='d-flex justify-content-center'>
                <Col md={1}>
                <OutputInfo label='' text=''/>
                </Col>
                <Col md={1}>
                <OutputInfo label='' text=''/>
                </Col>

            </Row>

            <Row className='d-flex justify-content-center'>
                <Col md={2}>
                <OutputInfo label='' text=''/>
                </Col>
                <Col md={2}>
                <OutputInfo label='' text=''/>
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