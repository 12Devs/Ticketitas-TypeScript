import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './styleDescricao.css'



export default function Descricao() {

    return (
        <Container>
            <Row className='primeiraDescricao p-3' >
                <div className='conteudo border'>
                    <p>Parte 1</p>
                </div>
            </Row>

            <Row className='p-5'>
                <Col className='bordaRedor' >
                    <p>Parte 2.1</p>
                </Col>

                <Col className='bordaRedor'>
                    <p>Parte 2.2</p>
                </Col>
            </Row>
        </Container>
    );
}