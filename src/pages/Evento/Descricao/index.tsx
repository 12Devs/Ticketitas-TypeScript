import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './styleDescricao.css'
import '../styleGeralEvento.css'



export default function Descricao() {

    return (
        <Container>
            <Row className='primeiraDescricao p-3 sombra' >
                <div className='larguraMainContentEventos bordaRedor text-start'>
                    <p>Parte 1</p>
                </div>
            </Row>

            <section className='larguraMainContentEventos mt-5'>
                <Row className='noMarginPadding'>
                    <Col className='bordaRedor text-start' >
                        <p>Parte 2.1</p>
                    </Col>

                    <Col className='bordaRedor text-start'>
                        <p>Parte 2.2</p>
                    </Col>
                </Row>
            </section>

        </Container>
    );
}