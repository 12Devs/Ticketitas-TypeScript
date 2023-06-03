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

//import './styleDescricao.css';
import './styleResumoCompra.css';
import '../../../components/Texto/Texto.css';
import { container } from 'googleapis/build/src/apis/container';

export default function Descricao({ idEvento }: { idEvento: string }) {
    const [titulo, setTitulo] = useState('Titulo');
    const [dataHora, setDataHora] = useState('2001-01-01T00:00:00.000Z');
    const [descricao, setDescricao] = useState('Descrição');
    const [rua, setRua] = useState('Rua');
    const [cidade, setCidade] = useState('Cidade');
    const [estado, setEstado] = useState('Estado');
    const [imageEvent, setImageEvent] = useState('./img/exemploHeaderEvento.png');

    const [event, setEvent] = useState();


    const endereco = `${rua} - ${cidade} - ${estado}`;

    const dataHoraOBJ = new Date(dataHora);
    const dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();


    const [primeiroNome, setprimeiroNome] = useState('');
    const [sobrenome, setSobreome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        api.get(`/event/${idEvento}`).then((response) => {
            console.log(response);
            setTitulo(response.data.eventInfos.event.nome);
            setDescricao(response.data.eventInfos.event.descricao);
            setDataHora(response.data.eventInfos.event.dataEvento);
            setImageEvent(response.data.eventInfos.event.imageEvent);
            setRua(response.data.eventInfos.enderecoEvent.rua);
            setCidade(response.data.eventInfos.enderecoEvent.cidade);
            setEstado(response.data.eventInfos.enderecoEvent.estado);

            setEvent(response.data.eventInfos.event)
        });
    }, []);

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
                        <InputTexto type={'text'} defaultValue={''} required={true} label={"Número do Cartão *"} placeholder={"0000 0000 0000 0000"} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome}/>
                    </Col>
                    <Col sm={2}>
                        <InputTexto type={'text'} defaultValue={''} required={true} label={"Data de Validade*"} placeholder={"MM/AA"} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome}  />
                    </Col>
                    <Col sm={2}>
                        <InputTexto type={'text'} defaultValue={''} required={true} label={"CVV*"} placeholder={"000"} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome}  />
                    </Col>
                </Row>
                <Row>
                        <Col sm={6}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Nome impresso no cartão *"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome}/>
                        </Col>
                        <Col sm={4}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"CPF *"} placeholder={""} controlId={"cpfCnpj"} data={cpfCnpj} setData={setCpfCnpj} />
                        </Col>
                        
                </Row>
                </>
            ) 
        }
        else{
            return(
                <>
            
            <Row>
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
                    <Col sm={7}>
                        <h4 className='Texto-Preto Texto-Medio text-start fw-bold'>Descrição do evento da compra</h4>
                        <p className='Texto-Preto Texto-MuitoPequeno Texto-Justificado'>
                            {descricao}
                        </p>
                    </Col>

                    <Col sm={5} className='pe-5 ps-5'>
                        <DetalhesIngresso/>
                    </Col>
                </Row>
                <Row className='divDadosCliente'>
                    <Form style={{minHeight: '40vh'}}>
                    <Row>
                        <Col sm={6}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Primeiro nome *"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome}/>
                        </Col>
                        <Col sm={6}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Sobrenome *"} placeholder={""} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome}  />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"CPF *"} placeholder={""} controlId={"cpfCnpj"} data={cpfCnpj} setData={setCpfCnpj} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputTexto type={'email'} defaultValue={''} required={true} label={"Email *"} placeholder={"email@gmail.com"} controlId={"email"} data={email} setData={setEmail} />
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
                

                
                <Row>
                 <Button variant="success">Finalizar Compra</Button>{''}
                </Row>
            </section>

        </Container>
    );
}