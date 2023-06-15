
import { Button, Container, ListGroup } from 'react-bootstrap';
import FormLabel from '../../components/FormLabel';
import NavBarGeral from '../../components/NavBarGeral';
import Forbidden403 from '../Forbidden403';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

import '../../components/Button/Button.css';
import '../../components/Texto/Texto.css';
import ItemAdmin from './ItemAdmin';


export default function GerenciarAdmins() {
    const [arrayAdmins, setArrayAdmins] = useState({ allAdministrators: [] });

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        
        api.get(`/user/administrator/list-administrator`, config).then((response) => {
            setArrayAdmins(response.data);
        });
    }, []);

    console.log(arrayAdmins);

    if (localStorage.getItem("userType") == "admin") {
        return (
            <>
                <NavBarGeral />
                <Container style={{ minHeight: '75vh' }} className='ms-5 me-5'>
                    <FormLabel label={"Gerenciar Administradores"} />

                    <ListGroup as="ol">
                        {arrayAdmins.allAdministrators.length == 0 &&
                        <h3>Não há administradores cadastrados</h3>}
                        {arrayAdmins.allAdministrators.map((admin: any, index) => (
                            <ItemAdmin admin={admin}/>
                        ))}
                    </ListGroup>

                </Container>
            </>
        );
    } else {
        return (<Forbidden403 />)
    }

}