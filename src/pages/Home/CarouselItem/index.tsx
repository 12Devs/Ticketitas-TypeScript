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
import '../Carousel/carousel.css';
import '../styleHome.css';

export default function CarouselItem({ dados }: { dados: any }) {
    const [nome, setNome] = useState('');
    const [dataEvento, setDataEvento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idEvento, setIdEvento] = useState('');

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/evento', { state: { idEvento } });
    }

    // Formata a data e hora
    var dataHoraFormatada = '';
    if (dataEvento !== '') {
        var dataHoraOBJ = new Date(dataEvento);
        dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear() + ' - ' + dataHoraOBJ.getHours() + ':' + dataHoraOBJ.getMinutes();
    }

    useEffect(() => {
        if (dados !== undefined) {
            setNome(dados.nome);
            setDataEvento(dados.dataEvento);
            setDescricao(dados.descricao);
            setIdEvento(dados.id);
        }
    }, [dados]);

    return (
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
    )
}