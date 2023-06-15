
import { Button, Container, ListGroup } from 'react-bootstrap';
import FormLabel from '../../components/FormLabel';
import NavBarGeral from '../../components/NavBarGeral';
import Forbidden403 from '../Forbidden403';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

import '../../components/Button/Button.css';
import '../../components/Texto/Texto.css';
import ItemPromoter from './ItemPromoter';

export default function GerenciarPromoters() {
    const [arrayPromoters, setArrayPromoters] = useState({ allPromoters: [] });

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        
        api.get(`/user/administrator/list-promoters`, config).then((response) => {
            setArrayPromoters(response.data);
        });
    }, []);

    if (localStorage.getItem("userType") == "admin") {
        return (
            <>
                <NavBarGeral />
                <Container style={{ minHeight: '75vh' }} className='ms-5 me-5'>
                    <FormLabel label={"Gerenciar promoters"} />

                    <ListGroup as="ol">
                        {arrayPromoters.allPromoters.length == 0 &&
                        <h3>Não há promoters cadastrados</h3>}
                        {arrayPromoters.allPromoters.map((promoter: any, index) => (
                            <ItemPromoter promoter={promoter}/>
                        ))}
                    </ListGroup>

                </Container>
            </>
        );
    } else {
        return (<Forbidden403 />)
    }

}