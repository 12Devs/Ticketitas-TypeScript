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
import ModalCadastrarCartao from '../../../components/ModalCadastarCartao';


//import './styleDescricao.css';
import './styleResumoCompra.css';
import '../../../components/Texto/Texto.css';
import { container } from 'googleapis/build/src/apis/container';
import exp from 'constants';

export default function ResumoCompra({ idCheckout }: { idCheckout: string }) {
    

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    const location = useLocation();
    var infoID1 = '0';
    

    // window.scrollTo(0, 0);

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

    const [total, setTotal] = useState(0.0);
    const [primeiroNome, setPrimeiroNome] = useState('');
    
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardExp, setCardExp] = useState('');
    const [cardCVV, setCardCVV] = useState("");

    const [saldo, setSaldo] = useState(0.0);
    const [dadosCartao, setDadosCartao] = useState({});
    const [TemCartao, setTemCartao] = useState(false);
    const [TemSaldo, setTemSaldo] = useState(false);
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
            
            setSaldo(response.data.ClientInfos.client.saldo);
            if(saldo>0.0)
            {
                setTemSaldo(true);
            }
            setPrimeiroNome(response.data.ClientInfos.client.nome);
            setEmail(response.data.ClientInfos.client.email);
           
         
        });
        
        
    },[])
    useEffect(() => {
        
        if(idCheckout!="0"){

            
            
            api.get(`sale/checkout/${idCheckout}`, config).then((response) => {
           

            
            setIdvento(response.data.CheckoutInfos.checkout.eventId);
            setTotal(response.data.CheckoutInfos.checkout.amountSale)
            
           
            
            });
            
        }

        

    }, []);
    
    useEffect(() => {
        api.get(`/user/client/card`, config).then((response) => {
            console.log("Retorno Cartão: ",response.data.cardInfos);
            setDadosCartao(response.data.cardInfos);
            
            setTemCartao(true);
        }) .catch((e)=>{});

    }, []);


    useEffect(() => {
        if(idEvento!="0")
        {
        api.get(`/event/${idEvento}`).then((response) => {
            
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

    
    function alterarSaldoOption()
    {

    }


    function renderCartao(){
       
        if (!TemCartao){
            return(
                <>
            <Row className=''>

                <Row>
                    <Col sm={8}>
                        <InputTexto type={'number'} defaultValue={''} required={true} label={"NÚMERO DO CARTÃO*"} placeholder={"0000 0000 0000 0000"} controlId={"inputCardNumber"} data={cardNumber} setData={setCardNumber}/>
                    </Col>
                    <Col sm={4}>
                        <InputTexto type={'date'} defaultValue={''} required={true} label={"VALIDADE*"} placeholder={""} controlId={"inputExp"} data={cardExp} setData={setCardExp}/>
                    </Col>
                    
                    
                    
                </Row>
                <Row>
                        <Col sm={8}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"TITULAR DO CARTÃO*"} placeholder={""} controlId={"inputCardHolder"} data={cardHolder} setData={setCardHolder}/>
                        </Col>
                        <Col sm={4}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"CVV*"} placeholder={""} controlId={"inputCVV"} data={cardCVV} setData={setCardCVV}/>
                    </Col>
                        
                </Row>

                </Row>
                </>
            ) 
        }
        else{
            

            return(
                <>
            
            <Row className='p-3'>
            <Col>
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
                        
                    <Card.Title></Card.Title>
                    <Row>
                        <Col>
                            <Card.Text>
                                {cardHolder}
                            </Card.Text>
                        </Col>
                        <Col>
                        <Card.Text>
                            {cardExp}
                        </Card.Text>
                        </Col>
                        
                    </Row>
                    
                </Card.Body>

            </Card>
            

            
           
            
            </Col>

            
            {renderSaldo()}
            
            </Row>
            </>
        )
        }
    }
    
    function renderSaldo(){

        if(saldo>0)
        {
            return(
                <>
                <Col>
                
                <div className="boxSaldo1">
                        <div className="logoTicketitasSaldo1">
                        <img
                                    src="/img/logo.svg"
                                    width="40"
                                    height="40"
                                    alt=''
                                />
                        </div>
                        <div className="saldoConteudo1">
                        <h1 style={{fontSize: 25}}>Saldo</h1>
                        <p style ={{fontWeight: 'bold', fontSize: 20}}>R$: {}</p>
                        </div>
                        <Form>
                <Form.Check  onChange={e => { setTemSaldo(!TemSaldo)}} className='d-flex justify-content-center'
                    type="switch"
                    id="custom-switch"
                    label ="Usar Saldo para pagar"
                />
                </Form>
                    <p> saldo: {saldo}</p>
                    </div>
                </Col>
                </>
            )
        }
        
    }
    
   
    useEffect(() => {
        var valorTotalCartao = 0;
        if(TemSaldo)
        {
            let totalTeste = total - saldo
            setTotal(totalTeste);
        }
        else
        {
            let totalTeste = total + saldo;
            setTotal(totalTeste);
        }

    }, [TemSaldo]);

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
                            
                        <h4 className='Texto-Preto Texto-Medio text-start fw-bold pt-5'>Dados do Ingresso</h4>
                        <p className='Texto-Preto Texto-MuitoPequeno Texto-Justificado'>
                            Insira os dados de quem pertence o(s) ingresso(s)
                        </p>
                        <Form style={{minHeight: '30vh'}}>
                        <Row>
                            <Col lg={7}>
                                <InputTexto type={'text'} defaultValue={''} required={true} label={"Nome*"} placeholder={""} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setPrimeiroNome}/>
                            </Col>
                            
                        </Row>
                        <Row>
                                <Col sm={7}>
                                    <InputTexto type={'number'} defaultValue={''} required={true} label={"CPF*"} placeholder={""} controlId={"cpfCnpj"} data={cpf} setData={setCpf} />
                                </Col>
                        </Row>
                        <Row>
                            <Col sm={7}>
                                <InputTexto type={'email'} defaultValue={''} required={true} label={"E-mail*"} placeholder={""} controlId={"email"} data={email} setData={setEmail} />
                            </Col>
                        </Row>
                        </Form>
                    
                </Row >
                
                <h4 className='Texto-Preto Texto-Medio text-start fw-bold py-5'>Dados do Pagamento</h4>
                
                {renderCartao()}
                
                
               <Row className='divParcelamento'>
                    <Form.Select size="sm">
                    <option>1X de {total.toFixed(2)}</option>
                    <option>2X de {(total/2).toFixed(2)}</option>
                    <option>3X de {(total/3).toFixed(2)}</option>
                    <option>4X de {(total/4).toFixed(2)}</option>
                    <option>5X de {(total/5).toFixed(2)}</option>
                    <option>6X de {(total/6).toFixed(2)}</option>
                    <option>7X de {(total/7).toFixed(2)}</option>
                    <option>8X de {(total/8).toFixed(2)}</option>
                    <option>9X de {(total/9).toFixed(2)}</option>
                    <option>10X de {(total/10).toFixed(2)}</option>
                    <option>11X de {(total/11).toFixed(2)}</option>
                    <option>12X de {(total/12).toFixed(2)}</option>
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