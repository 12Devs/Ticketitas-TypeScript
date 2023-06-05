import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Descricao from './Descricao';
import CardDestaques from '../../components/CardDestaques';
import {useParams } from 'react-router-dom';

import '../pages.css'
import './styleGeralEvento.css';
import '../Home/styleHome.css';
import NavBarGeral from '../../components/NavBarGeral';

export default function Evento() {
    let params = useParams();
    var infoID = '0';
    
    window.scrollTo(0, 0);

    if (params.eventId !== undefined) {
        infoID = params.eventId;
    }

    return (
        <>
        <NavBarGeral />
        <Container className='noMarginPadding corPagina' fluid>

            <Row>
                <Descricao idEvento={infoID? infoID : '0'} />
            </Row>

            <Row className='text-start larguraMainContentEventos mt-5'>
                <section className='larguraMainContentEventos pt-5'>
                    <p className='Texto-Preto Texto-Pequeno text-start'>Também em destaque...</p>
                </section>

                <CardDestaques />
            </Row>
        </Container>
        </>

    );
}