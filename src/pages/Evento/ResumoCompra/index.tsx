import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import DetalhesIngresso from '../DetalhesIngresso';
import { useState, useEffect } from 'react';
import Header from '../Header';
import { api } from '../../../services/api';
import InputTexto from '../../../components/InputTexto';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


//import './styleDescricao.css';
import './styleResumoCompra.css';
import '../../../components/Texto/Texto.css';
import { container } from 'googleapis/build/src/apis/container';

export default function ResumoCompra({ idCheckout }: { idCheckout: string }) {
    

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    const location = useLocation();
    var infoID1 = '0';
    

    window.scrollTo(0, 0);

    if (location.state) {
        infoID1 = location.state.idCheckout;
    }
    
    

    const [infoID, setInfoID] = useState('');
    const [idEvento, setIdvento] = useState('0'); 
    const [titulo, setTitulo] = useState('Titulo');
    const [dataHora, setDataHora] = useState('2001-01-01T00:00:00.000Z');
    const [descricao, setDescricao] = useState('Descrição');
    const [rua, setRua] = useState('Rua');
    const [cidade, setCidade] = useState('Cidade');
    const [estado, setEstado] = useState('Estado');
    const [imageEvent, setImageEvent] = useState('./img/exemploHeaderEvento.png');

    const [event, setEvent] = useState();
    let dados: any;

    const endereco = `${rua} - ${cidade} - ${estado}`;

    const dataHoraOBJ = new Date(dataHora);
    const dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();

   
    const [primeiroNome, setPrimeiroNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');

    const [arrayEventos, setArrayEventos] = useState({ allEvents: [] });

    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('userType');
        if(token != null){
            dados = jwtDecode(token);
            if(dados != null){
                setCpf(dados.sub);
            }
        }
        api.get(`user/client/${cpf}`, config).then((response) => {
            console.log(response);
            setPrimeiroNome(response.data.ClientInfos.client.nome);
            setEmail(response.data.ClientInfos.client.email);
           
           
        });
        
        
    },[])
    useEffect(() => {
        
        if(idCheckout!="0"){

            
            
            api.get(`sale/checkout/${idCheckout}`, config).then((response) => {
            console.log("retorno checkout: ",response);

            console.log("eventID: ",response.data.CheckoutInfos.checkout.eventId);
            console.log("response id do evento: ",response.data.CheckoutInfos.checkout.eventId);
            setIdvento(response.data.CheckoutInfos.checkout.eventId);
            
            console.log("eventID: ",idEvento);
            
            });
            console.log("array dados:", arrayEventos);
        }

        

    }, []);
    
    useEffect(() => {
        if(idEvento!="0")
        {
        api.get(`/event/${idEvento}`).then((response) => {
            console.log("retorno evento: ",response);
            setTitulo(response.data.eventInfos.event.nome);
            setDescricao(response.data.eventInfos.event.descricao);
            setDataHora(response.data.eventInfos.event.dataEvento);
            setImageEvent(response.data.eventInfos.event.imageEvent);
            setRua(response.data.eventInfos.enderecoEvent.rua);
            setCidade(response.data.eventInfos.enderecoEvent.cidade);
            setEstado(response.data.eventInfos.enderecoEvent.estado);
            
            setEvent(response.data.eventInfos.event)

        });
        }
    }, [idEvento]);
    
    useEffect(() => {

        setInfoID(idCheckout);

    }, [idCheckout]);

    


    function renderCartao(){
        if (false){
            return(
                <>
                <Row className="labelPagamento">
                
                <h3>Forma de Pagamento</h3>
                <Row className='opcoesPagamento'>
                    <Col sm={6}>
                        <h5>Cartão</h5>
                        <Form.Check type="radio" aria-label="radio 1" />
                    </Col>
                    <Col sm={6}>
                        <h5>Saldo</h5>
                        <Form.Check type="radio" aria-label="radio 1" />
                    </Col>
                </Row>
                
                
            
            </Row>

            
            <Row className='dadosCartao'>
                <h5>
                    Dados do cartão
                </h5>
                
            </Row>  
                <Row>
                    <Col sm={4}>
                        <InputTexto type={'text'} defaultValue={''} required={true} label={"Número do Cartão *"} placeholder={"0000 0000 0000 0000"} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setPrimeiroNome}/>
                    </Col>
                    <Col sm={2}>
                        <InputTexto type={'text'} defaultValue={''} required={true} label={"Data de Validade*"} placeholder={"MM/AA"} controlId={"inputSobrenome"} data={sobrenome} setData={setSobrenome}  />
                    </Col>
                    <Col sm={2}>
                        <InputTexto type={'text'} defaultValue={''} required={true} label={"CVV*"} placeholder={"000"} controlId={"inputSobrenome"} data={sobrenome} setData={setSobrenome}  />
                    </Col>
                </Row>
                <Row>
                        <Col sm={6}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Nome impresso no cartão *"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setPrimeiroNome}/>
                        </Col>
                        <Col sm={4}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"CPF *"} placeholder={""} controlId={"cpfCnpj"} data={cpf} setData={setCpf} />
                        </Col>
                        
                </Row>
                </>
            ) 
        }
        else{
            return(
                <>
            
            <Row className='p-3'>
            <Card style={{ width: '20rem', height:'12rem'}}>
                <Card.Body>
                    
                    
                    <Card.Subtitle className="mb-2 text-muted">Cartão de Crédito</Card.Subtitle>
                        <div className='d-flex justify-content-start'>
                            <img
                            src="/img/chipCard.png"
                            width="50"
                            height="50"
                            className="d-inline-block"
                            alt=''
                        />{''}
                        </div>
                        
                    <Card.Title>XXXX XXXX XXXX {"XXXX"}</Card.Title>
                    <Row>
                        <Col>
                            <Card.Text>
                                Nome da Pessoa
                            </Card.Text>
                        </Col>
                        <Col>
                        <Card.Text>
                            12/2023
                        </Card.Text>
                        </Col>
                        
                    </Row>
                    
                </Card.Body>

            </Card>
            <Form>
                <Form.Check className='d-flex justify-content-start'
                    type="switch"
                    id="custom-switch"
                    label ="Usar Saldo Ticketitas"
                />
            </Form>
            </Row>
            </>
        )
        }
    }



    return (
        <Container>
            <Row >
                <Header caminho={imageEvent} />
            </Row>

            <Row className='primeiraDescricao p-3 sombra' >
                <div className='larguraMainContentEventos text-start'>
                    <h4 className='Texto-Azul Texto-Pequeno fw-bold'>{dataHoraFormatada}</h4>
                    <h3 className='Texto-Preto Texto-Grande fw-bold'>{titulo}</h3>
                    <h5 className='Texto-Preto Texto-MuitoPequeno'>{endereco}</h5>
                </div>
            </Row>

            <section className='larguraMainContentEventos mt-5'>
                <Row className='noMarginPadding'>
                    <Col lg={8} className=''>
                        <h4 className='Texto-Preto Texto-Medio text-start fw-bold'>Descrição do evento</h4>
                        <p className='Texto-Preto Texto-MuitoPequeno Texto-Justificado'>
                            {descricao}
                        </p>

                        <Row className=''>
                        <h4 className='Texto-Preto Texto-Medio text-start fw-bold py-5'>Dados do Participante</h4>
                        <Form style={{minHeight: '30vh'}}>
                        <Row>
                            <Col lg={5}>
                                <InputTexto type={'text'} defaultValue={''} required={true} label={"Primeiro Nome *"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setPrimeiroNome}/>
                            </Col>
                            <Col lg={5}>
                                <InputTexto type={'text'} defaultValue={''} required={true} label={"Sobrenome *"} placeholder={""} controlId={"inputSobrenome"} data={sobrenome} setData={setSobrenome}  />
                            </Col>
                        </Row>
                        <Row>
                                <Col sm={5}>
                                    <InputTexto type={'number'} defaultValue={''} required={true} label={"CPF *"} placeholder={""} controlId={"cpfCnpj"} data={cpf} setData={setCpf} />
                                </Col>
                        </Row>'
                        <Row>
                            <Col sm={5}>
                                <InputTexto type={'email'} defaultValue={''} required={true} label={"E-mail *"} placeholder={""} controlId={"email"} data={email} setData={setEmail} />
                            </Col>
                        </Row>
                        </Form>
                    
                </Row >
                
                
                
                {renderCartao()}
                

               <Row className='divParcelamento'>
                    <Form.Select size="sm">
                    <option>1X de </option>
                    <option>2X de </option>
                    <option>3X de </option>
                    <option>4X de </option>
                    <option>5X de </option>
                    <option>6X de </option>
                    <option>7X de </option>
                    <option>8X de </option>
                    <option>9X de </option>
                    <option>10X de </option>
                    <option>11X de </option>
                    <option>12X de </option>
                    </Form.Select>
               </Row>
                

                
                


                    </Col>

                <Col sm={4} className='pe-5 ps-5'>
                    <DetalhesIngresso idCheckout={idCheckout}/>
                </Col>
                </Row >
                
                <Row className='justify-content-center p-3' >
                <button type="button" className="btn btn-success w-80">FINALIZAR COMPRA</button>
                </Row>
               
            </section>

        </Container>
    );
}