import '../pages.css';
import './styleHome.css';
import CarouselPrincipal from './Carousel';
import NavBarGeral from '../../components/NavBarGeral';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import CardDestaques from '../../components/CardDestaques';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../services/api';


export default function Home() {
    const location = useLocation();
    
    return (
        <section className='corPagina'>
            <NavBarGeral />
            <Container className='noMarginPadding' fluid>
                <Row className='text-start larguraMainContentEventos mt-3'>
                    <p className='Texto-Preto Texto-Pequeno'>Eventos em destaque na Ticketitas</p>
                    <CarouselPrincipal></CarouselPrincipal>
                </Row>

                <Row className='text-start larguraMainContentEventos mt-5'>
                    <p className='Texto-Preto Texto-Pequeno'>Também em destaque...</p>
                    <CardDestaques/>
                </Row>


            </Container>
        </section>

    );
}