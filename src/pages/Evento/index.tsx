import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Header from './Header';
import Descricao from './Descricao';

import '../pages.css'
import './styleGeralEvento.css'


export default function Evento() {
    return (

        <Container className='paginaCompleta corPagina' fluid>

            <Row >
                <Header caminho={'img/exemploHeaderEvento.png'} />
            </Row>

            <Row>
                <Descricao />
            </Row>

            <section className='larguraMainContentEventos border'>
                <Row className='p-5'>
                    <p>Também em detaque...</p>
                </Row>
            </section>

        </Container>


    );
}