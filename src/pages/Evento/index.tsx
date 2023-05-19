import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Descricao from './Descricao';
import { useState } from 'react';

import '../pages.css'
import './styleGeralEvento.css'


export default function Evento() {
    const [idEvento, setIdEvento] = useState(1);

    return (

        <Container className='noMarginPadding corPagina' fluid>

            <Row>
                <Descricao idEvento={idEvento}/>
            </Row>

            <section className='larguraMainContentEventos mt-5 pb-5'>
                <Row className='text-start'>
                    <p className='Texto-Preto Texto-Pequeno'>Também em destaque...</p>
                    
                </Row>
            </section>

        </Container>


    );
}