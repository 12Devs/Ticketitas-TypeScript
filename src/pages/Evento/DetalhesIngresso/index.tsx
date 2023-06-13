import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { api } from '../../../services/api';

import './DetalhesIngresso.css';

export default function DetalhesIngresso({ idCheckout }: { idCheckout: string })  {
    

    const [idEvent, setIdEvent] = useState("0");
    
    const [quantidadePistaInteira, setQuantidadePistaInteira] = useState(0);
    const [quantidadePistaMeia, setQuantidadePistaMeia] = useState(0);
  
    const [quantidadeStageInteira, setQuantidadeStageInteira] = useState(0);
    const [quantidadeStageMeia, setQuantidadeStageMeia] = useState(0);
  
    const [quantidadeVipInteira, setQuantidadeVipInteira] = useState(0);
    const [quantidadeVipMeia, setQuantidadeVipMeia] = useState(0);
  
    const [quantidadeFree, setQuantidadeFree] = useState(0);
  
    const [valorPista, setValorPista] = useState(0.0);
    const [valorStage, setValorStage] = useState(0.0);
    const [valorVip, setValorVip] = useState(0.0);


    const [valorTotal, setValorTotal] = useState(0.0);
    
   
  

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };



    function renderPistaInteira()
    {
        if (quantidadePistaInteira > 0) {
            return (
              <Container>
                <Row>

                
                <Col  sm={9}className="info">
                
                       <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                        Inteira - Pista
                        </h4>

                        <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                      R$ {valorPista}
                    </h5>
                </Col>
                
                <Col sm={2}  className="qtd">
                    <h1 className='text-start Texto-Preto Texto-MuitoPequeno'>{quantidadePistaInteira}</h1>
                </Col >

                </Row>
                  
                <hr></hr>

            </Container>

            )
            }
                
    }

    function renderPistaMeia()
    {
        if (quantidadePistaMeia > 0) {
            return (
              <Container>
                <Row>

                
                <Col  sm={9}className="info">
                
                       <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                        Meia - Pista
                        </h4>

                        <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                      R$ {valorPista/2}
                    </h5>
                </Col>
                
                <Col sm={2}  className="qtd">
                    <h1 className='text-start Texto-Preto Texto-MuitoPequeno'>{quantidadePistaMeia}</h1>
                </Col >

                </Row>
                  
                <hr></hr>
                
            </Container>

            )
            }
                
    }

    function renderStageInteira()
    {
        if (quantidadeStageInteira > 0) {
            return (
              <Container>
                <Row>

                
                <Col  sm={9}className="info">
                
                       <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                        Inteira - Stage
                        </h4>

                        <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                      R$ {valorStage}
                    </h5>
                </Col>
                
                <Col sm={2}  className="qtd">
                    <h1 className='text-start Texto-Preto Texto-MuitoPequeno'>{quantidadeStageInteira}</h1>
                </Col >

                </Row>
                  
                <hr></hr>
                
            </Container>

            )
            }
                
    }

    function renderStageMeia()
    {
        if (quantidadeStageMeia > 0) {
            return (
              <Container>
                <Row>

                
                <Col  sm={9}className="info">
                
                       <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                        Meia - Stage
                        </h4>

                        <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                      R$ {valorStage/2}
                    </h5>
                </Col>
                
                <Col sm={2}  className="qtd">
                    <h1 className='text-start Texto-Preto Texto-MuitoPequeno'>{quantidadeStageMeia}</h1>
                </Col >

                </Row>
                  
                <hr></hr>
                
            </Container>

            )
            }
                
    }

    function renderVipInteira()
    {
        if (quantidadeVipInteira > 0) {
            return (
              <Container>
                <Row>

                
                <Col  sm={9}className="info">
                
                       <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                        Inteira - Vip
                        </h4>

                        <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                      R$ {valorVip}
                    </h5>
                </Col>
                
                <Col sm={2}  className="qtd">
                    <h1 className='text-start Texto-Preto Texto-MuitoPequeno'>{quantidadeVipInteira}</h1>
                </Col >

                </Row>
                  
                <hr></hr>
                
            </Container>

            )
            }
                
    }

    function renderVipMeia()
    {
        if (quantidadeVipMeia > 0) {
            return (
              <Container>
                <Row>

                
                <Col  sm={9}className="info">
                
                       <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                        Meia - Vip
                        </h4>

                        <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                      R$ {valorVip/2}
                    </h5>
                </Col>
                
                <Col sm={2}  className="qtd">
                    <h1 className='text-start Texto-Preto Texto-MuitoPequeno'>{quantidadeVipMeia}</h1>
                </Col >

                </Row>
                  
                <hr></hr>
                
            </Container>

            )
            }
                
    }

    function renderFree()
    {
        if (quantidadeFree > 0) {
            return (
              <Container>
                <Row>

                
                <Col  sm={9}className="info">
                
                       <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                        Free
                        </h4>

                        <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                      R$ {0.0}
                    </h5>
                </Col>
                
                <Col sm={2}  className="qtd">
                    <h1 className='text-start Texto-Preto Texto-MuitoPequeno'>{quantidadeFree}</h1>
                </Col >

                </Row>
                  
                <hr></hr>
                
            </Container>

            )
            }
                
    }

    useEffect(() => {
        
        if(idCheckout!="0")
        {
            
            api.get(`sale/checkout/${idCheckout}`, config).then((response) => {
            
            
            setValorTotal(response.data.CheckoutInfos.checkout.amountSale);
            setQuantidadeFree(response.data.CheckoutInfos.checkout.freeAmount);
            setQuantidadePistaInteira(response.data.CheckoutInfos.checkout.pistaAmount);
            setQuantidadePistaMeia(response.data.CheckoutInfos.checkout.pistaAmountHalf);
            setQuantidadeStageInteira(response.data.CheckoutInfos.checkout.stageAmount);
            setQuantidadeStageMeia(response.data.CheckoutInfos.checkout.stageAmountHalf);
            setQuantidadeVipInteira(response.data.CheckoutInfos.checkout.vipAmount);
            setQuantidadeVipMeia(response.data.CheckoutInfos.checkout.vipAmountHalf);
            
            setIdEvent(response.data.CheckoutInfos.checkout.eventId)
            
            
            });
            
            
        }

    }, []);


    useEffect(() => {
        api.get(`event/${idEvent}`, config).then((response) => {;
            setValorPista(response.data.eventInfos.event.valorPista);
            setValorStage(response.data.eventInfos.event.valorStage);
            setValorVip(response.data.eventInfos.event.valorVip);
                          
    });

    }, [idEvent]);         
    
return (
    <>
        <h4 className='Texto-Preto Texto-Medio text-start fw-bold'>Resumo da Compra</h4>

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
                        
                    </Row>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    </>
);
}