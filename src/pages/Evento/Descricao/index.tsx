import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import AdicionarIngresso from '../AdicionarIngresso';
import Col from "react-bootstrap/Col";
import { useState } from 'react';
import Header from '../Header';

import './styleDescricao.css';
import '../styleGeralEvento.css';
import '../../../components/Texto/Texto.css';
import { api } from '../../../services/api';

export default function Descricao({idEvento}:{idEvento: number}) {
    const [titulo, setTitulo] = useState('Titulo');
    const [dataHora, setDataHora] = useState('Data e hora');
    const [descricao, setDescricao] = useState('Descrição');
    const [rua, setRua] = useState('Rua');
    const [cidade, setCidade] = useState('Cidade');
    const [estado, setEstado] = useState('Estado');
    const [imageEvent, setImageEvent] = useState('./img/exemploHeaderEvento.png');

    const endereco = `${rua} - ${cidade} - ${estado}`;
    
    api.get(`/event/${idEvento}`).then((response) => {
        setTitulo(response.data.eventInfos.event.nome);
        setDescricao(response.data.eventInfos.event.descricao);
        setRua(response.data.enderecoEvent.rua);
        setCidade(response.data.enderecoEvent.cidade);
        setEstado(response.data.enderecoEvent.estado);
        setImageEvent(response.data.eventInfos.event.imageEvent);
    });

    return (
        <Container>
            <Row >
                <Header caminho={imageEvent} />
            </Row>

            <Row className='primeiraDescricao p-3 sombra' >
                <div className='larguraMainContentEventos text-start'>
                    <h4 className='Texto-Azul Texto-Pequeno fw-bold'>{dataHora}</h4>
                    <h3 className='Texto-Preto Texto-Grande fw-bold'>{titulo}</h3>
                    <h5 className='Texto-Preto Texto-MuitoPequeno'>{endereco}</h5>
                </div>
            </Row>

            <section className='larguraMainContentEventos mt-5'>
                <Row className='noMarginPadding'>
                    <Col sm={7}>
                        <h4 className='Texto-Preto Texto-Medio text-start fw-bold'>Descrição do evento</h4>
                        <p className='Texto-Preto Texto-MuitoPequeno Texto-Justificado'>
                           {descricao}
                        </p>
                    </Col>

                    <Col sm={5} className='pe-5 ps-5'>
                        <AdicionarIngresso/>
                    </Col>
                </Row>
            </section>

        </Container>
    );
}