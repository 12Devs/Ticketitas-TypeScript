
import { Button, Container, ListGroup } from 'react-bootstrap';
import FormLabel from '../../components/FormLabel';
import NavBarGeral from '../../components/NavBarGeral';
import Forbidden403 from '../Forbidden403';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

import '../../components/Button/Button.css';
import '../../components/Texto/Texto.css';

export default function SolicitacoesCadastro() {
    const [arrayPromoters, setArrayPromoters] = useState({ allPromoters: [] });

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    useEffect(() => {
        api.get(``, config).then((response) => {
            console.log("Todos os promoters: " + response);
        });
    }, []);

    if (localStorage.getItem("userType") == "admin") {
        return (
            <>
                <NavBarGeral />
                <Container style={{ minHeight: '75vh' }} className='ms-5 me-5'>
                    <FormLabel label={"Solicitações de Cadastro"} />
                    <ListGroup as="ol" numbered>

                        <ListGroup.Item as="li"
                            className="d-flex justify-content-between">
                            <div className="ms-2 me-auto">
                                <h5>Nome do Promoter</h5>
                                <p>CPF</p>
                                <p>email</p>
                                <p>telefone</p>
                            </div>
                            <div className='row align-items-center'>
                                <Button className='ms-5 me-5 Botão-Secundario Texto-Azul Texto-MuitoPequeno'>Negar cadastro</Button>
                                <Button className='ms-5 me-5 Botão-Primario Texto-Branco Texto-MuitoPequeno'>Aceitar cadastro</Button>
                            </div>
                        </ListGroup.Item>

                    </ListGroup>
                </Container>
            </>
        );
    } else {
        return (<Forbidden403 />)
    }

}