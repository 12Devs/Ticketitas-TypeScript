import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Descricao from './Descricao';
import { useState } from 'react';
import CardDestaques from '../../components/CardDestaques';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../pages.css'
import './styleGeralEvento.css'
import '../Home/styleHome.css';

export default function Evento() {
    const location = useLocation();
    const navigate = useNavigate();
    var infoID = 0;

    if (location.state) {
        infoID = location.state.idEvento;
    } 

    window.scrollTo(0, 0);
    
    return (

        <Container className='noMarginPadding corPagina' fluid>

            <Row>
                <Descricao idEvento={infoID? infoID : 0} />
            </Row>

            <Row className='d-flex justify-content-center'>
                <section className='larguraMainContentEventos pt-5'>
                    <p className='Texto-Preto Texto-Pequeno text-start'>Também em destaque...</p>
                </section>

                <CardDestaques />
            </Row>
        </Container>


    );
}