import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Descricao from './Descricao';
import { useState } from 'react';
import CardDestaques from '../../components/CardDestaques';

import '../pages.css'
import './styleGeralEvento.css'
import '../Home/styleHome.css';


export default function Evento() {
    const [idEvento, setIdEvento] = useState(1);

    return (

        <Container className='noMarginPadding corPagina' fluid>

            <Row>
                <Descricao idEvento={idEvento} />
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