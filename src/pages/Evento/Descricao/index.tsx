import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import AdicionarIngresso from '../AdicionarIngresso';
import Col from "react-bootstrap/Col";
import { useState, useEffect } from 'react';
import Header from '../Header';
import { api } from '../../../services/api';
import React from 'react';

import './styleDescricao.css';
import '../styleGeralEvento.css';
import '../../../components/Texto/Texto.css';

export default function Descricao({ idEvento }: { idEvento: string }) {
    const [titulo, setTitulo] = useState('Titulo');
    const [dataHora, setDataHora] = useState('2001-01-01T00:00:00.000Z');
    const [descricao, setDescricao] = useState('Descrição');
    const [rua, setRua] = useState('Rua');
    const [cidade, setCidade] = useState('Cidade');
    const [estado, setEstado] = useState('Estado');
    const [imageEvent, setImageEvent] = useState('./img/exemploHeaderEvento.png');

    const [event, setEvent] = useState();


    const endereco = `${rua} - ${cidade} - ${estado}`;

    const dataHoraOBJ = new Date(dataHora);
    const dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();

    useEffect(() => {
        api.get(`/event/${idEvento}`).then((response) => {
            console.log(response);
            setTitulo(response.data.eventInfos.event.nome);
            setDescricao(response.data.eventInfos.event.descricao);
            setDataHora(response.data.eventInfos.event.dataEvento);
            setImageEvent(response.data.eventInfos.event.imageEvent);
            setRua(response.data.eventInfos.enderecoEvent.rua);
            setCidade(response.data.eventInfos.enderecoEvent.cidade);
            setEstado(response.data.eventInfos.enderecoEvent.estado);

            setEvent(response.data.eventInfos.event)
        });
    }, []);


    return (
        <Container>
            <Row >
                <Header caminho={imageEvent} />
            </Row>

            <Row className='primeiraDescricao p-3 sombra' >
                <div className='larguraMainContentEventos text-start'>
                    <h4 className='Texto-Azul Texto-Pequeno fw-bold'>{dataHoraFormatada}</h4>
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
                        <AdicionarIngresso event={event} />
                    </Col>
                </Row>
            </section>

        </Container>
    );
}