import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import FormLabel from '../../components/FormLabel';
import NavBarGeral from '../../components/NavBarGeral';
import Forbidden403 from '../Forbidden403';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

import '../../components/Button/Button.css';
import '../../components/Texto/Texto.css';
import ItemEvento from './ItemEvento';

export default function EventosCadastrados() {
    const [arrayEventos, setArrayEventos] = useState({ allEvents: [] });

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    useEffect(() => {
        api.get(`/event`, config).then((response) => {
            setArrayEventos(response.data);
        });
    }, []);

    if (localStorage.getItem("userType") == "admin") {
        return (
            <>
                <NavBarGeral />
                <Container style={{ minHeight: '75vh' }} className='ms-5 me-5'>
                    <FormLabel label={"Solicitações de Cadastro"} />
                    <ListGroup>

                        {arrayEventos.allEvents.map((evento: any, index) => (
                            <ItemEvento evento={evento}/>
                        ))}

                    </ListGroup>
                </Container>
            </>
        );
    } else {
        return (<Forbidden403 />)
    }

}