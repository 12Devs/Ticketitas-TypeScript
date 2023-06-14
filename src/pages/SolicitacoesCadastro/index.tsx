
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
                        {arrayPromoters.allPromoters.map((promoter: any, index) => (
                            <ListGroup.Item as="li"
                                className="d-flex justify-content-between">
                                <div className="ms-2 me-auto">
                                    <h5>{promoter.nome}</h5>
                                    <p>{promoter.cpf}</p>
                                    <p>{promoter.email}</p>
                                    <p>{promoter.telefone}</p>
                                </div>
                                <div className='row align-items-center'>
                                    <Button className='ms-5 me-5 Botão-Secundario Texto-Azul Texto-MuitoPequeno'>Negar cadastro</Button>
                                    <Button className='ms-5 me-5 Botão-Primario Texto-Branco Texto-MuitoPequeno'>Aceitar cadastro</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                </Container>
            </>
        );
    } else {
        return (<Forbidden403 />)
    }

}