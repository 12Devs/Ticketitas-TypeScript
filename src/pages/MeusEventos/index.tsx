import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import FormLabel from '../../components/FormLabel';
import NavBarGeral from '../../components/NavBarGeral';
import Forbidden403 from '../Forbidden403';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

import '../../components/Button/Button.css';
import '../../components/Texto/Texto.css';
import ItemEvento from './ItemEvento';

export default function MeusEventos() {
    const [arrayEventos, setArrayEventos] = useState({ PromoterInfos: [] });

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        api.get(`user/promoter/events`,config).then((response) => {
            setArrayEventos(response.data);
            console.log(response)
        });
    }, []);

    if (localStorage.getItem("userType") == "promoter") {

        return (
            <>
                <NavBarGeral />
                <Container style={{ minHeight: '75vh' }} className='ms-5 me-5'>
                    <FormLabel label={"Meus Eventos"} />
                    <ListGroup>

                        {arrayEventos.PromoterInfos.map((evento: any, index) => (
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