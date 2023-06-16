import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import FormLabel from '../../components/FormLabel';
import NavBarGeral from '../../components/NavBarGeral';
import Forbidden403 from '../Forbidden403';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

import '../../components/Button/Button.css';
import '../../components/Texto/Texto.css';
import ItemEvento from './ItemEvento';

export default function MeusIngressos() {
    const [arrayTickets, setArrayTickets] = useState({ tickets: [] });

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    useEffect(() => {
        api.get(`user/client/ticket`, config).then((response) => {
            setArrayTickets(response.data.PromoterInfos);
        });
    }, []);

    console.log("Entrou", arrayTickets)

    function renderLista() {
        if (arrayTickets.tickets !== undefined) {
            return (
                arrayTickets.tickets.map((evento: any, index) => (
                <ItemEvento evento={evento} />
            ))        )}

    }

    if (localStorage.getItem("userType") == "cliente") {

        return (
            <>
                <NavBarGeral />
                <Container style={{ minHeight: '75vh' }} className='ms-5 me-5'>
                    <FormLabel label={"Meus Ingressos"} />
                    <ListGroup>

                        {/* {arrayTickets.PromoterInfos.map((evento: any, index) => (
                            <ItemEvento evento={evento}/>
                        ))} */}
                        {renderLista()}

                    </ListGroup>
                </Container>
            </>
        );
    } else {
        return (<Forbidden403 />)
    }

}