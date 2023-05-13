import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Header from './Header';
import Descricao from './Descricao';

import '../pages.css'
import './styleGeralEvento.css'


export default function Evento() {
    return (

        <Container className='noMarginPadding corPagina' fluid>

            <Row >
                <Header caminho={'img/exemploHeaderEvento.png'} />
            </Row>

            <Row>
                <Descricao />
            </Row>

            <section className='larguraMainContentEventos border mt-5 pb-5'>
                <Row className='text-start'>
                    <p>Também em detaque...</p>
                </Row>
            </section>

        </Container>


    );
}