import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import './carousel.css';
import '../styleHome.css';

function CarouselPrincipal() {
    const [arrayEventos, setArrayEventos] = useState({ allEvents: [] });

    useEffect(() => {
        api.get(`/event`).then((response) => {
            setArrayEventos(response.data);
        });
    }, []);

    const navigate = useNavigate();


    function renderCarouselItem(dados: any) {

        if (dados == null) {
            return (
                <p>Sem eventos cadastrados</p>
            )
        } else {
            var dataHoraOBJ = new Date(dados.dataEvento);
            var dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();

            var idEvento = dados.id;

            const handleNavigate = () => {
                navigate('/evento', { state: { idEvento } });
              }

            return (
                <Carousel.Item >
                    <Container>
                        <Row>
                            <Col sm={8} className='noMarginPadding'>

                                <Image className='configImg' src="img/exemploHeaderEvento.png" />

                            </Col>
                            <Col sm={4} className=''>
                                <Row>
                                    <h4 className='Texto-Azul Texto-Pequeno fw-bold'>{dataHoraFormatada}</h4>
                                </Row>
                                <Row>
                                    <h3 className='Texto-Preto Texto-Grande fw-bold'>{dados.nome}</h3>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="outline-primary" onClick={handleNavigate}>Saiba mais</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Carousel.Item>
            )
        }
    }

    return (
        <Carousel className='noMarginPadding' variant='dark'>
            {renderCarouselItem(arrayEventos.allEvents[0])}
            {renderCarouselItem(arrayEventos.allEvents[1])}
        </Carousel>
    );
}

export default CarouselPrincipal;