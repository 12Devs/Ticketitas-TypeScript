import '../../../components/Texto/Texto.css';
import '../../../components/Button/Button.css';
import './AdicionarIngresso.css';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import ModalLoginCompra from '../ModalLoginCompra';


export default function AdicionarIngresso({ event }: { event: any }) {



    const [quantidadePistaInteira, setQuantidadePistaInteira] = useState(0);
    const [quantidadePistaMeia, setQuantidadePistaMeia] = useState(0);

    const [quantidadeStageInteira, setQuantidadeStageInteira] = useState(0);
    const [quantidadeStageMeia, setQuantidadeStageMeia] = useState(0);

    const [quantidadeVipInteira, setQuantidadeVipInteira] = useState(0);
    const [quantidadeVipMeia, setQuantidadeVipMeia] = useState(0);

    const [quantidadeFree, setQuantidadeFree] = useState(0);

    const [valorTotal, setValorTotal] = useState(0);

    const [show, setShow] = useState(false);

    const [userType, setUserType] = useState('');

    console.log("Evento: ", event)

    function subtrai(valor: number, setValor: Function) {
        if (valor > 0) {
            setValor((valor - 1));
        }
    }

    function soma(valor: number, setValor: Function, valorLimite: number) {
        if (valor < valorLimite) {
            setValor((valor + 1));
        }
    }

    const handleFinalizar = () => {
        var dados = {
            valorTotal,
            quantidadePistaInteira,
            quantidadeStageInteira,
            quantidadeVipInteira,
            event

        }

        // colocar o navigate
        console.log(dados)
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('userType');
        if(token != null){
            dados = jwtDecode(token);
            if(dados != null){
                console.log("Dados: ", dados)
            }
           
        }
        else{
            
            setShow(true);

            renderModalLoginCompra();
            
        }
        if(user != null){
            if(user == "cliente"){
                console.log("cliente logado")
            }
            else{ 
                console.log("login nao autorizado")
            }
        }
    }

    function renderModalLoginCompra()
    {
        return(
            <>
            <ModalLoginCompra data={show} setData={setShow} />
            </>
        )
    }
    function renderPistaInteira() {

        if (event == null) {
            return null;
        } else {
            if (parseInt(event.quantPista) > 0) {

                return (
                    <Container>
                        <Row>
                            <Col sm={8} className=''>
                                <h4 className='text-start Texto-Pequeno Texto-Preto fw-bold'>
                                    Inteira - Pista
                                </h4>
                                <h5 className='text-start Texto-Pequeno Texto-Cinza pb-2 fw-light'>
                                    R$ {event.valorPista}
                                </h5>

                            </Col>

                            <Col sm={4} className='d-flex justify-content-between align-items-center'>
                            <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadePistaInteira, setQuantidadePistaInteira)}
                                />

                                {quantidadePistaInteira}

                                <img
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadePistaInteira, setQuantidadePistaInteira, parseInt(event.quantPista) )}
                                />

                                
                            </Col>
                        </Row>
                        <hr></hr>
                    </Container>
                )
            } else {
                return false;
            }
        }



    }

    function renderPistaMeia() {

        if (event == null) {
            return null;
        } else {
            if (parseInt(event.quantPista) > 0) {

                var valorPistaMeia = (parseFloat(event.valorPista) / 2).toFixed(2);
                

                return (
                    <Container>
                        <Row>
                            <Col sm={8} className=''>
                                <h4 className='text-start Texto-Pequeno Texto-Preto fw-bold'>
                                    Meia - Pista
                                </h4>
                                <h5 className='text-start Texto-Pequeno Texto-Cinza pb-2 fw-light'>
                                    R$ {valorPistaMeia}
                                </h5>

                            </Col>

                            <Col sm={4} className='d-flex justify-content-between align-items-center'>
                            <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadePistaMeia, setQuantidadePistaMeia)}
                                />

                                {quantidadePistaMeia}

                                <img
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadePistaMeia, setQuantidadePistaMeia, parseInt(event.quantPista) )}
                                />

                                
                            </Col>
                        </Row>
                        <hr></hr>
                    </Container>
                )
            } else {
                return false;
            }
        }



    }

    function renderStageInteira() {

        if (event == null) {
            return null;
        } else {
            if (parseInt(event.quantStage) > 0) {

                return (
                    <Container>
                        <Row>
                            <Col sm={8} className=''>
                                <h4 className='text-start Texto-Pequeno Texto-Preto fw-bold'>
                                    Inteira - Stage
                                </h4>
                                <h5 className='text-start Texto-Pequeno Texto-Cinza pb-2 fw-light'>
                                    R$ {event.valorStage}
                                </h5>

                            </Col>

                            <Col sm={4} className='d-flex justify-content-between align-items-center'>
                                
                            <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadeStageInteira, setQuantidadeStageInteira)}
                                />

                                {quantidadeStageInteira}

                                <img
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadeStageInteira, setQuantidadeStageInteira, parseInt(event.quantStage))}
                                />

                                
                            </Col>
                        </Row>
                        <hr></hr>
                    </Container>
                )
            } else {
                return false;
            }
        }



    }

    function renderStageMeia() {

        if (event == null) {
            return null;
        } else {
            if (parseInt(event.quantStage) > 0) {

                var valorStageMeia = (parseFloat(event.valorStage) / 2).toFixed(2);
   
                return (
                    <Container>
                        <Row>
                            <Col sm={8} className=''>
                                <h4 className='text-start Texto-Pequeno Texto-Preto fw-bold'>
                                    Meia - Stage
                                </h4>
                                <h5 className='text-start Texto-Pequeno Texto-Cinza pb-2 fw-light'>
                                    R$ {valorStageMeia}
                                </h5>

                            </Col>

                            <Col sm={4} className='d-flex justify-content-between align-items-center'>
                            <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadeStageMeia, setQuantidadeStageMeia)}
                                />

                                {quantidadeStageMeia}

                                <img
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadeStageMeia, setQuantidadeStageMeia, parseInt(event.quantStage) )}
                                />

                                
                            </Col>
                        </Row>
                        <hr></hr>
                    </Container>
                )
            } else {
                return false;
            }
        }



    }

    function renderVipInteira() {

        if (event == null) {
            return null;
        } else {
            if (parseInt(event.quantVip) > 0) {

                return (
                    <Container>
                        <Row>
                            <Col sm={8} className=''>
                                <h4 className='text-start Texto-Pequeno Texto-Preto fw-bold'>
                                    Inteira - Vip
                                </h4>
                                <h5 className='text-start Texto-Pequeno Texto-Cinza pb-2 fw-light'>
                                    R$ {event.valorVip}
                                </h5>

                            </Col>

                            <Col sm={4} className='d-flex justify-content-between align-items-center'>
                            <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadeVipInteira, setQuantidadeVipInteira)}
                                />  

                                {quantidadeVipInteira}

                                

                                <img
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadeVipInteira, setQuantidadeVipInteira, parseInt(event.quantVip))}
                                />
                            </Col>
                        </Row>
                        <hr></hr>
                    </Container>
                )
            } else {
                return false;
            }
        }



    }

    function renderVipMeia() {

        if (event == null) {
            return null;
        } else {
            if (parseInt(event.quantVip) > 0) {

                var valorVipMeia = (parseFloat(event.valorVip) / 2).toFixed(2);

                return (
                    <Container>
                        <Row>
                            <Col sm={8} className=''>
                                <h4 className='text-start Texto-Pequeno Texto-Preto fw-bold'>
                                    Meia - Vip
                                </h4>
                                <h5 className='text-start Texto-Pequeno Texto-Cinza pb-2 fw-light'>
                                    R$ {valorVipMeia}
                                </h5>

                            </Col>

                            <Col sm={4} className='d-flex justify-content-between align-items-center'>
                            <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadeVipMeia, setQuantidadeVipMeia)}
                                />  

                                {quantidadeVipMeia}

                                

                                <img
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadeVipMeia, setQuantidadeVipMeia, parseInt(event.quantVip))}
                                />
                            </Col>
                        </Row>
                        <hr></hr>
                    </Container>
                )
            } else {
                return false;
            }
        }



    }

    function renderFree() {

        if (event == null) {
            return null;
        } else {
            if (parseFloat(event.porcentagemGratis) > 0) {
                
                // Aqui deve ser somado a quantidade total de ingressos e extrair a porcentagem certa.
                var quantidadeTotalFree = '0';

                return (
                    <Container>
                        <Row>
                            <Col sm={8} className=''>
                                <h4 className='text-start Texto-Pequeno Texto-Preto fw-bold'>
                                    Gratis
                                </h4>
                                <h5 className='text-start Texto-Pequeno Texto-Cinza pb-2 fw-light'>
                                    R$ 0
                                </h5>

                            </Col>

                            <Col sm={4} className='d-flex justify-content-between align-items-center'>
                            <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadeFree, setQuantidadeFree)}
                                />  

                                {quantidadeFree}

                                

                                <img
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadeFree, setQuantidadeFree, parseInt(quantidadeTotalFree))}
                                />
                            </Col>
                        </Row>
                        <hr></hr>
                    </Container>
                )
            } else {
                return false;
            }
        }



    }

    function somaTotal() {
        if (event == null) {
            return 0
        } else {
            var valorPistaMeia = (parseFloat(event.valorPista) / 2).toFixed(2);
            var valorStageMeia = (parseFloat(event.valorStage) / 2).toFixed(2);
            var valorVipMeia = (parseFloat(event.valorVip) / 2).toFixed(2);

            let valorPI = parseFloat(event.valorPista) * quantidadePistaInteira;
            let valorPM = parseFloat(valorPistaMeia) * quantidadePistaMeia

            let valorVI = parseFloat(event.valorVip) * quantidadeVipInteira;
            let valorVM = parseFloat(valorVipMeia) * quantidadeVipMeia;

            let valorSI = parseFloat(event.valorStage) * quantidadeStageInteira;
            let valorSM = parseFloat(valorStageMeia) * quantidadeStageMeia;


            var total = (valorPI + valorPM + valorVI + valorVM + valorSM + valorSI)
            return total;
        }
    }

    useEffect(() => {
        var total = somaTotal();
        setValorTotal(total);
    }, [quantidadePistaInteira, quantidadePistaMeia, quantidadeStageInteira, quantidadeStageMeia, quantidadeVipInteira, quantidadeVipMeia]);

    let dados: any;
    useEffect(()=>{
        

        
       
        
        
    },[])
    return (
        <>
            <h4 className='Texto-Preto Texto-Medio text-start fw-bold'>Ingressos</h4>

            <div className='Modal-Ingresos p-3'>
                <Modal.Dialog className='modal-dialog-scrollable'>
                    <Modal.Body>
                        {renderPistaInteira()}
                        {renderPistaMeia()}
                        {renderStageInteira()}
                        {renderStageMeia()}
                        {renderVipInteira()}
                        {renderVipMeia()}
                        {renderFree()}
                    </Modal.Body>

                    <Modal.Footer className='justify-content-center'>
                        <Row className='pb-2'>
                            <h5 className='text-start Texto-Preto Texto-MuitoPequeno'>Total</h5>
                            <h2 className='text-start fw-bold Texto-Preto Texto-Grande'>R$ {valorTotal.toFixed(2)}</h2>
                        </Row>
                        <Row>
                            <Button className='Botão-Primario' onClick={handleFinalizar}>Finalizar Compras</Button>
                            {renderModalLoginCompra()}
                        </Row>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
}