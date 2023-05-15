import '../../../components/Texto/Texto.css';
import '../../../components/Button/Button.css';
import './AdicionarIngresso.css';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function AdicionarIngresso() {
    var [valorteste, setValorteste] = useState(0);
    const valorLimiteTeste = 10;

    // Forma exemplo como o backend envia as informações para o
    var evento = {
        "event": {
            "id": 5,
            "nome": "Festival de Verão Salvador",
            "descricao": "Festival de Verão Salvador, é um evento musical brasileiro que ocorre anualmente em Salvador, capital da Bahia.",
            "status": 1,
            "quantPista": 900000,
            "quantStage": 20000,
            "quantVip": 50000,
            "valorPista": 300,
            "valorStage": 390,
            "valorVip": 1032.99,
            "imageEvent": null,
            "createdAt": "2023-05-13T22:36:06.000Z",
            "updatedAt": "2023-05-13T22:36:06.000Z",
            "promoterCpf": 45850724974,
            "enderecoEventId": 5
        }
    }

    function subtrai(valor: number, setValor: Function) {
        if(valor > 0) {
            setValor((valor-1));
        }
    }
    
    function soma(valor: number, setValor: Function, valorLimite: number) {
        if(valor < valorLimite){
            setValor((valor+1));
        }
    }

    return (
        <>
            <h4 className='Texto-Preto Texto-Medio text-start fw-bold'>Ingressos</h4>

            <div className='Modal-Ingresos p-3'>
                <Modal.Dialog className='modal-dialog-scrollable'>
                    <Modal.Body>
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
                    </Modal.Body>

                    <Modal.Footer className='justify-content-center'>
                        <Row className='pb-2'>
                            <h5 className='text-start Texto-Preto Texto-MuitoPequeno'>Total</h5>
                            <h2 className='text-start fw-bold Texto-Preto Texto-Grande'>R$ 66,00</h2>
                        </Row>
                        <Row>
                            <Button className='Botão-Primario'>Adicionar ao carrinho</Button>
                        </Row>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
}