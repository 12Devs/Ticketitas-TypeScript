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
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card';
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

    const [eventSelect, setEventSelect] = useState('Meus Dados');

    const handleSelect = (eventKey: any) => setEventSelect(eventKey);

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('userType');
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        api.get("user/client/",config).then((response) => {
            console.log(response)
            setprimeiroNome(response.data.ClientInfos.client.nome)
            setEmail(response.data.ClientInfos.client.email)
            setTelefone(response.data.ClientInfos.client.telefone)
            setCep(response.data.ClientInfos.enderecoClient.cep)
            setEstado(response.data.ClientInfos.enderecoClient.estado)
            setBairro(response.data.ClientInfos.enderecoClient.bairro)
            setRua(response.data.ClientInfos.enderecoClient.rua)
            setBairro(response.data.ClientInfos.enderecoClient.bairro)
            setNumero(response.data.ClientInfos.enderecoClient.numero)
            setCidade(response.data.ClientInfos.enderecoClient.cidade)
        });
        
        
    },[])
    
    return(
        <>
        <NavBarGeral/>
        <Container className='justify-content-center' fluid>
            <Row className='d-flex justify-content-center container-perfil' >
                <Col md={8}>
                <Nav variant="tabs" onSelect={handleSelect} defaultActiveKey="Meus Dados" style={{marginTop:20}}>
                    <Nav.Item >
                        <Nav.Link eventKey="Meus Dados">Meus Dados</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Cartões">Cartões</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Saldo" >
                            Saldo
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
            </Row> 
            {
                eventSelect == "Meus Dados" ?
                    <>
                        <Row>
                                <Col md={{ span: 3, offset: 3 }}>
                                    <OutputInfo label='Nome' text={primeiroNome} />
                                </Col>
                                <Col md={2}>
                                    <OutputInfo label='Sobrenome' text='default' />
                                </Col>
    
                            </Row><Row>
                                    <Col md={{ span: 3, offset: 3 }}>
                                        <OutputInfo label='E-mail' text={email} />
                                    </Col>
    
                                </Row><Row>
                                    <Col md={{ span: 3, offset: 3 }}>
                                        <OutputInfo label='Telefone' text={telefone} />
                                    </Col>
    
                                </Row><Row>
                                    <Col md={{ span: 3, offset: 3 }}>
                                        <OutputInfo label='CPF' text={cpf} />
                                    </Col>
    
                                </Row><Row>
                                    <Col md={{ span: 3, offset: 3 }}>
                                        <OutputInfo label='Cidade' text={cidade} />
                                    </Col>
                                    <Col md={4}>
                                        <OutputInfo label='Estado' text={estado} />
                                    </Col>
    
                                </Row><Row>
                                    <Col md={{ span: 3, offset: 3 }}>
                                        <OutputInfo label='Bairro' text={bairro} />
                                    </Col>
    
                                </Row><Row>
                                    <Col md={{ span: 3, offset: 3 }}>
                                        <OutputInfo label='CEP' text={cep} />
                                    </Col>
    
                                </Row><Row>
                                    <Col md={{ span: 3, offset: 3 }}>
                                        <OutputInfo label='Rua' text={rua} />
                                    </Col>
                                    <Col md={4}>
                                        <OutputInfo label='Numero' text={numero} />
                                    </Col>
    
                                </Row><Row className='d-flex justify-content-center'>
    
                                    <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Primario Texto-Branco' type="submit">
                                        Editar Informações
                                    </Button>
                                </Row>
                            </>
                            : <div></div>
               }
               {
                eventSelect == "Cartões" ?  
                <Row>
                    <Col md={{ span: 2, offset: 3 }}>
                        <Card style={{ width: '10rem', height:'6rem',marginTop: 20}}>
                            <Card.Body>
                                
                                <Card.Subtitle className="mb-2 text-muted" style={{fontSize: 12}}>Cartão de Crédito</Card.Subtitle>
                                    <div className='d-flex justify-content-start'>
                                        <img
                                        src="/img/chipCard.png"
                                        width="20"
                                        height="20"
                                        className="d-inline-block"
                                        alt=''
                                    />{''}
                                    </div>
                                    
                                <Card.Title style={{fontSize: 12}}>XXXX XXXX XXXX {"XXXX"}</Card.Title>
                            </Card.Body>
                        </Card> 
                    </Col>
                    <Col md={2}>
                    <div style={{marginTop: 40}} >
                    <p style={{fontWeight: 'bold', fontSize: 12}}>Matheus Mota Santos</p>
                    <p style={{fontSize: 12}}>XXXX XXXX XXXX {"XXXX"}</p>
                    </div>
                    </Col>
                </Row>
                : <div></div>
                
               }
               {
                eventSelect == "Saldo" ? <div>ola</div> : <div></div>
               }
            
        </Container>
        </>
    );
}