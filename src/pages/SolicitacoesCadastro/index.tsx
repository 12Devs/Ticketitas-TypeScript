
import { Button, Container, ListGroup } from 'react-bootstrap';
import FormLabel from '../../components/FormLabel';
import NavBarGeral from '../../components/NavBarGeral';
import Forbidden403 from '../Forbidden403';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

import '../../components/Button/Button.css';
import '../../components/Texto/Texto.css';
import ItemSolicitacao from './ItemSolicitacao';

export default function SolicitacoesCadastro() {
    const [arrayPromoters, setArrayPromoters] = useState({ allPromoterRegistration: [] });

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    useEffect(() => {
        api.get(`/user/administrator/list-promoter-resgitration`, config).then((response) => {
            setArrayPromoters(response.data);
        });
    }, []);

    if (localStorage.getItem("userType") == "admin") {
        return (
            <>
                <NavBarGeral />
                <Container style={{ minHeight: '75vh' }} className='ms-5 me-5'>
                    <FormLabel label={"Solicitações de Cadastro"} />

                    <ListGroup as="ol" numbered>
                        {arrayPromoters.allPromoterRegistration.length == 0 &&
                        <h3>Não há solicitações de cadastro</h3>}
                        {arrayPromoters.allPromoterRegistration.map((promoter: any, index) => (
                            <ItemSolicitacao promoter={promoter}/>
                        ))}
                    </ListGroup>

                </Container>
            </>
        );
    } else {
        return (<Forbidden403 />)
    }

}