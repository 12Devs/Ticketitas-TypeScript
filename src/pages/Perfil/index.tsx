import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Alert, Container, Form, Row, Col, Image } from 'react-bootstrap';
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
    const [cpf, setCpf] = useState('undefined');
    const [nomeCompleto, SetnomeCompleto] = useState('undefined');
    const [primeiroNome, setprimeiroNome] = useState('undefined');
    const [sobrenome, setSobreome] = useState('undefined');
    const [telefone, setTelefone] = useState('undefined');
    const [cep, setCep] = useState('undefined');
    const [cidade, setCidade] = useState('undefined');
    const [estado, setEstado] = useState('undefined');
    const [bairro, setBairro] = useState('undefined');
    const [rua, setRua] = useState('undefined');
    const [numero, setNumero] = useState('undefined');
    const [email, setEmail] = useState('undefined');
    const [cardName, setCardName] = useState('undefined');
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberFour, setcardNumberFour] = useState('');
    const [saldo, setSaldo] = useState('');

    const [eventSelect, setEventSelect] = useState('Meus Dados');
    const navigate = useNavigate();
    const handleSelect = (eventKey: any) => setEventSelect(eventKey);

    function separarNomeSobrenome(nomeCompleto: string) {
        // Dividir o nome completo em palavras
        var palavras = nomeCompleto.split(" ");


        // O primeiro nome é a primeira palavra
        setprimeiroNome(palavras[0])
        console.log(palavras[0])

        // O sobrenome é o restante das palavras
        setSobreome(palavras[-1])
        console.log(palavras[-1])

        // Retornar o nome e o sobrenome como um objeto
    }

    function pegarUltimosQuatroDigitos(numero: string) {
        let ultimosQuatroDigitos = numero.slice(-4);
        setcardNumberFour(ultimosQuatroDigitos);
    }

    useEffect(() => {
        const user = localStorage.getItem('userType');
        if (user != null) {
            setUserType(user);
        }
        const cpfLocalStorage = localStorage.getItem('CPF');
        if (cpfLocalStorage != null) {
            setCpf(cpfLocalStorage);
        }

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        api.get("user/client/card", config).then((response) => {
            console.log(response)
            setCardNumber(response.data.cardInfos.card.cardNumber);
            setCardName(response.data.cardInfos.card.holder);
        });
        if (user == "cliente") {
            api.get("user/client/", config).then((response) => {
                console.log(response);
                SetnomeCompleto(response.data.ClientInfos.client.nome);
                setEmail(response.data.ClientInfos.client.email);
                setSaldo(response.data.ClientInfos.client.saldo);
                setCpf(response.data.ClientInfos.client.cpf);
                setTelefone(response.data.ClientInfos.client.telefone);
                setCep(response.data.ClientInfos.enderecoClient.cep);
                setEstado(response.data.ClientInfos.enderecoClient.estado)
                setBairro(response.data.ClientInfos.enderecoClient.bairro)
                setRua(response.data.ClientInfos.enderecoClient.rua)
                setBairro(response.data.ClientInfos.enderecoClient.bairro)
                setNumero(response.data.ClientInfos.enderecoClient.numero)
                setCidade(response.data.ClientInfos.enderecoClient.cidade)
                pegarUltimosQuatroDigitos(cardNumber)

            });

        }
        else if (user == "promoter") {
            api.get("user/promoter/", config).then((response) => {
                console.log(response)
                SetnomeCompleto(response.data.PromoterInfos.promoter.nome)
                setEmail(response.data.PromoterInfos.promoter.email)
                setTelefone(response.data.PromoterInfos.promoter.telefone)
                setCep(response.data.PromoterInfos.enderecoPromoter.cep)
                setEstado(response.data.PromoterInfos.enderecoPromoter.estado)
                setBairro(response.data.PromoterInfos.enderecoPromoter.bairro)
                setRua(response.data.PromoterInfos.enderecoPromoter.rua)
                setBairro(response.data.PromoterInfos.enderecoPromoter.bairro)
                setNumero(response.data.PromoterInfos.enderecoPromoter.numero)
                setCidade(response.data.PromoterInfos.enderecoPromoter.cidade)
                separarNomeSobrenome(nomeCompleto)
            });
        }
        else if (user == "admin") {
            api.get("user/administrator/", config).then((response) => {
                console.log(response)
                SetnomeCompleto(response.data.AdministratorInfos.administrator.name)
                setEmail(response.data.AdministratorInfos.administrator.email)
                setTelefone(response.data.AdministratorInfos.administrator.phone)
                separarNomeSobrenome(nomeCompleto)
            });
        }
        separarNomeSobrenome(nomeCompleto)

    }, [])

    return (
        <>
            <NavBarGeral />
            <Container className='justify-content-center' fluid>
                <Row className='d-flex justify-content-center container-perfil' >
                    <Col md={8}>
                        <Nav variant="tabs" onSelect={handleSelect} defaultActiveKey="Meus Dados" style={{ marginTop: 20 }}>
                            <Nav.Item >
                                <Nav.Link eventKey="Meus Dados">Meus Dados</Nav.Link>
                            </Nav.Item>
                            {
                                userType === "cliente" ?
                                    <>
                                        <Nav.Item>
                                            <Nav.Link eventKey="cartao">Meu cartão</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="carteira" >
                                                Minha carteira
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                    : <></>
                            }

                        </Nav>
                    </Col>
                </Row>
                {
                    eventSelect == "Meus Dados" ?
                        <>
                            <Row style={{ marginTop: 20 }}>
                                <Col md={{ span: 3, offset: 3 }}>
                                    <OutputInfo label='Nome' text={nomeCompleto} />
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
                            
                            </Row>
                            {   
                             userType == "cliente" || userType == "promoter" ?
                                <>
                                 <Row>
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
 
                             </Row>
                             </>
                             :
                             <div></div>
                             
                            }
                           <Row className='d-flex justify-content-center'>
                                {
                                    userType === "admin" ?
                                        <Button style={{ margin: '5vh 5vw 5vh 5vw' }}
                                            className='Botão-Primario Texto-Branco'
                                            type="submit"
                                            onClick={() => { navigate("/editarAdmin") }}
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
                                            onClick={() => { navigate("/editarPromoter") }}
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
                                            onClick={() => { navigate("/editarCliente") }}
                                        >

                                            Editar Informações
                                        </Button>
                                        : <div></div>
                                }

                            </Row>
                        </>
                        : <div>

                        </div>
                }
                {
                    eventSelect == "cartao" ?
                        <Row style={{ marginBottom: '20%' }} className="align-items-center">
                            <Col md={{ span: 2, offset: 3 }}>
                                <Card style={{ width: '15rem', height: '9rem', marginTop: 40, backgroundColor: 'purple' }}>
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

                                        <Card.Title style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>XXXX XXXX XXXX {cardNumberFour}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={2} className={"align-items-left"}>
                                <div style={{ marginTop: 40 }} >
                                    <p style={{ fontWeight: 'bold', fontSize: 12 }}>{cardName}</p>
                                    <p style={{ fontSize: 12 }}>XXXX XXXX XXXX {cardNumberFour}</p>
                                </div>
                            </Col>
                            <ModalCadastrarCartao />
                        </Row>
                        : <div></div>

                }
                {
                    eventSelect == "carteira" ?
                        <Row className="justify-content-center">

                            <div className="boxSaldo">
                                <div className="logoTicketitasSaldo">
                                    <img
                                        src="/img/logo.svg"
                                        width="40"
                                        height="40"
                                        alt=''
                                    />
                                </div>
                                <div className="saldoConteudo">
                                    <h1 style={{ fontSize: 25 }}>Saldo</h1>
                                    <p style={{ fontWeight: 'bold', fontSize: 20 }}>R$: {saldo}</p>
                                </div>

                            </div>
                        </Row>

                        : <div></div>
                }

            </Container>
        </>
    );
}