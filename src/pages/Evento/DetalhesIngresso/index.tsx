import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react';

export default function DetalhesIngresso() {
return (
    <>
        <h4 className='Texto-Preto Texto-Medio text-start fw-bold'>Resumo da Compra</h4>

        <div className='Modal-Ingresos p-3'>
            <Modal.Dialog className='modal-dialog-scrollable'>
                
                <Modal.Footer className='justify-content-center'>
                    <Row className='pb-2'>
                        <h5 className='text-start Texto-Preto Texto-MuitoPequeno'>Total</h5>
                        <h2 className='text-start fw-bold Texto-Preto Texto-Grande'>R$ </h2>
                    </Row>
                    <Row>
                        
                    </Row>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    </>
);
}