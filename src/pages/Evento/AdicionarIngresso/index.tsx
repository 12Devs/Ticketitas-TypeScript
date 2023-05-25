import '../../../components/Texto/Texto.css';
import '../../../components/Button/Button.css';
import './AdicionarIngresso.css';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function AdicionarIngresso({ event }: { event: any }) {

    const [quantidadePistaInteira, setQuantidadePistaInteira] = useState(0);
    const [quantidadeStageInteira, setQuantidadeStageInteira] = useState(0);
    const [quantidadeVipInteira, setQuantidadeVipInteira] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);


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
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadePistaInteira, setQuantidadePistaInteira, 5)}
                                />

                                {quantidadePistaInteira}

                                <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadePistaInteira, setQuantidadePistaInteira)}
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
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadeStageInteira, setQuantidadeStageInteira, 10)}
                                />

                                {quantidadeStageInteira}

                                <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadeStageInteira, setQuantidadeStageInteira)}
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
                                    src='img/add_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Adicionar'
                                    onClick={() => soma(quantidadeVipInteira, setQuantidadeVipInteira, 3)}
                                />

                                {quantidadeVipInteira}

                                <img
                                    src='img/delete_circle.svg'
                                    width="25"
                                    height="25"
                                    className="d-inline-block"
                                    alt='Remover'
                                    onClick={() => subtrai(quantidadeVipInteira, setQuantidadeVipInteira)}
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
            let valorPI = parseFloat(event.valorPista) * quantidadePistaInteira;
            let valorVI = parseFloat(event.valorVip) * quantidadeVipInteira;
            let valorSI = parseFloat(event.valorStage) * quantidadeStageInteira;

            var total = (valorPI + valorVI + valorSI)
            return total;
        }
    }

    useEffect(() => {
        var total = somaTotal();
        setValorTotal(total);
    }, [quantidadePistaInteira, quantidadeStageInteira, quantidadeVipInteira]);


    return (
        <>
            <h4 className='Texto-Preto Texto-Medio text-start fw-bold'>Ingressos</h4>

            <div className='Modal-Ingresos p-3'>
                
                <Modal.Dialog className='modal-dialog-scrollable'>
                    <Modal.Body>
<<<<<<< HEAD
                        <Container>
                            <Row>
                                <Col sm={8} className=''>
                                    <h4 className='text-start Texto-Pequeno Texto-Preto fw-bold'>
                                        Meia-Entrada
                                    </h4>
                                    <h5 className='text-start Texto-Pequeno Texto-Cinza pb-2 fw-light'>
                                        R$ 19,90
                                    </h5>
                                    <p className='text-start Texto-Cinza'
                                        style={{ fontSize: '12px' }}>
                                        Disponível até 31/03/2023
                                    </p>
                                </Col>

                                

                                <Col sm={4} className='d-flex justify-content-between align-items-center'>
                                    <img
                                        src='img/add_circle.svg'
                                        width="25"
                                        height="25"
                                        className="d-inline-block"
                                        alt='Adicionar'
                                        onClick={() => soma(valorteste, setValorteste, valorLimiteTeste)}
                                    />

                                    {valorteste}

                                    <img
                                        src='img/delete_circle.svg'
                                        width="25"
                                        height="25"
                                        className="d-inline-block"
                                        alt='Remover'
                                        onClick={() => subtrai(valorteste, setValorteste)}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={8} className=''>
                                    <h4 className='text-start Texto-Pequeno Texto-Preto fw-bold'>
                                        Inteira
                                    </h4>
                                    <h5 className='text-start Texto-Pequeno Texto-Cinza pb-2 fw-light'>
                                        R$ 39,90
                                    </h5>
                                    <p className='text-start Texto-Cinza' 
                                        style={{fontSize: '12px'}}>
                                        Disponível até 31/03/2023
                                    </p>
                                </Col>

                                

                                <Col sm={4} className='d-flex justify-content-between align-items-center'>
                                    <img 
                                        src='img/add_circle.svg'
                                        width="25"
                                        height="25"
                                        className="d-inline-block"
                                        alt='Adicionar'
                                        onClick={() => soma(valorteste, setValorteste, valorLimiteTeste)}
                                    />

                                    {valorteste}

                                    <img 
                                        src='img/delete_circle.svg'
                                        width="25"
                                        height="25"
                                        className="d-inline-block"
                                        alt='Remover'
                                        onClick={() => subtrai(valorteste, setValorteste)}
                                    />
                                </Col>
                            </Row>


                            <hr></hr>
                        </Container>
=======
                        {renderPistaInteira()}
                        {renderStageInteira()}
                        {renderVipInteira()}
>>>>>>> 5d86ed49e581f8c0461d236d11e35fa2e4aad11b
                    </Modal.Body>

                    <Modal.Footer className='justify-content-center'>
                        <Row className='pb-2'>
                            <h5 className='text-start Texto-Preto Texto-MuitoPequeno'>Total</h5>
                            <h2 className='text-start fw-bold Texto-Preto Texto-Grande'>R$ {valorTotal.toFixed(2)}</h2>
                        </Row>
                        <Row>
                            <Button className='Botão-Primario' onClick={handleFinalizar}>Finalizar Compras</Button>
                        </Row>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
}