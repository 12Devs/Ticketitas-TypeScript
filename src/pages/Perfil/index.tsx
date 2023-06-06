import React, { ReactNode, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Alert, Container, Form, Row, Col,Image } from 'react-bootstrap';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import NavBarGeral from '../../components/NavBarGeral';
import FormLabel from '../../components/FormLabel';
import OutputInfo from '../../components/OutputInfo';
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card';
import "./Perfil.css";
import ModalCadastrarCartao from '../../components/ModalCadastarCartao';


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
    const [card, setCard] = useState('');

    const [eventSelect, setEventSelect] = useState('Meus Dados');
    const navigate = useNavigate();
    const handleSelect = (eventKey: any) => setEventSelect(eventKey);

    useEffect(()=>{
        const user = localStorage.getItem('userType');
        if(user != null){
            setUserType(user)
        }
        
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        api.get("user/client/card",config).then((response) => {
            console.log(response)
        });
        if(user == "cliente"){
            api.get("user/client/",config).then((response) => {
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
        }
        else if(user == "promoter"){
            api.get("user/promoter/",config).then((response) => {
                console.log(response)
                setprimeiroNome(response.data.PromoterInfos.promoter.nome)
                setEmail(response.data.PromoterInfos.promoter.email)
                setTelefone(response.data.PromoterInfos.promoter.telefone)
                setCep(response.data.PromoterInfos.enderecoPromoter.cep)
                setEstado(response.data.PromoterInfos.enderecoPromoter.estado)
                setBairro(response.data.ClientInfos.enderecoPromoter.bairro)
                setRua(response.data.ClientInfos.enderecoPromoter.rua)
                setBairro(response.data.ClientInfos.enderecoPromoter.bairro)
                setNumero(response.data.ClientInfos.enderecoPromoter.numero)
                setCidade(response.data.ClientInfos.enderecoPromoter.cidade)
            });
        }
        else if(user == "admin"){
            api.get("user/administartor/",config).then((response) => {
                console.log(response)
            });
        }
        
        
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
                            Carteira
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
                                    {
                                        userType === "admn" ?  
                                        <Button style={{ margin: '5vh 5vw 5vh 5vw' }} 
                                                className='Botão-Primario Texto-Branco'    
                                                type="submit"
                                                onClick={()=>{navigate("/editarAdmin")}}
                                                >
                                                
                                            Editar Informações 
                                        </Button>
                                        : <div></div>
                                    }
                                    {
                                        userType === "promoter" ?  
                                        <Button style={{ margin: '5vh 5vw 5vh 5vw' }} 
                                                className='Botão-Primario Texto-Branco'    
                                                type="submit"
                                                onClick={()=>{navigate("/editarPromoter")}}
                                                >
                                                
                                            Editar Informações 
                                        </Button>
                                        : <div></div>
                                    }
                                    {
                                        userType === "cliente" ?  
                                        <Button style={{ margin: '5vh 5vw 5vh 5vw' }} 
                                                className='Botão-Primario Texto-Branco'    
                                                type="submit"
                                                onClick={()=>{navigate("/editarCliente")}}
                                                >
                                                
                                            Editar Informações 
                                        </Button>
                                        : <div></div>
                                    }
                                   
                                </Row>
                            </>
                            : <div></div>
               }
               {
                eventSelect == "Cartões" ?  
                <Row style={{marginBottom: '20%'}} className = "align-items-center">
                    <Col md={{ span: 2, offset: 3 }}>
                        <Card style={{ width: '15rem', height:'9rem',marginTop: 40, backgroundColor: 'purple'}}>
                            <Card.Body>
                                
                                <Card.Subtitle className="mb-2 text-muted" >Cartão de Crédito</Card.Subtitle>
                                    <div className='d-flex justify-content-start'>
                                        <img
                                        src="/img/chipCard.png"
                                        width="40"
                                        height="40"
                                        className="d-inline-block"
                                        alt=''
                                    />{''}
                                    </div>
                                    
                                <Card.Title style={{fontSize: 14, color : 'white', fontWeight: 'bold'}}>XXXX XXXX XXXX {"XXXX"}</Card.Title>
                            </Card.Body>
                        </Card> 
                    </Col>
                    <Col md={2}>
                    <div style={{marginTop: 40}} >
                    <p style={{fontWeight: 'bold', fontSize: 12}}>Matheus Mota Santos</p>
                    <p style={{fontSize: 12}}>XXXX XXXX XXXX {"XXXX"}</p>
                    </div>
                    </Col>
                    <ModalCadastrarCartao/>
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