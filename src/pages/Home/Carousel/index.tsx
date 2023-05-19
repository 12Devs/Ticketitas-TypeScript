import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './carousel.css';
import '../styleHome.css';

function CarouselPrincipal() {
  return (
    <Carousel className='noMarginPadding' variant='dark'>

      <Carousel.Item className=''>
        <Container>
          <Row>
            <Col sm={8} className='noMarginPadding'>

              <Image className='configImg' src="img/exemploHeaderEvento.png" />


            </Col>
            <Col sm={4} className=''>
              <Row>
                <h4 className='Texto-Azul Texto-Pequeno fw-bold'>Data e Hora</h4>
              </Row>
              <Row>
                <h3 className='Texto-Preto Texto-Grande fw-bold'>Evento 1</h3>
              </Row>
              <Row>
                <h5 className='Texto-Preto Texto-MuitoPequeno'>Descrição</h5>
              </Row>
              <Row>
                <Col>
                  <Button variant="outline-primary">Saiba mais</Button>
                </Col>
              </Row>

            </Col>
          </Row>

        </Container>
      </Carousel.Item>

      <Carousel.Item className=''>
        <Container>
          <Row >
            <Col sm={8} className='divImagem'>

              <Image className='configImg' src="img/exemploHeaderEvento.png" />


            </Col>
            <Col sm={4} className=''>
              <Row>
                <h4 className='Texto-Azul Texto-Pequeno fw-bold'>Data e Hora</h4>
              </Row>
              <Row>
                <h3 className='Texto-Preto Texto-Grande fw-bold'>Evento 2</h3>
              </Row>
              <Row>
                <h5 className='Texto-Preto Texto-MuitoPequeno'>Descrição</h5>
              </Row>
              <Row>
                <Col>
                  <Button variant="outline-primary">Saiba mais</Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </Container>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselPrincipal;