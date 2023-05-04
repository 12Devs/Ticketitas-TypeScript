import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import '../NavBarGeral/Navbar.css';


export default function Footer() {
    const rotas = [{
        label: 'Quem somos',
        to: '/about'
    }, {
        label: 'Ajuda',
        to: '/help'
    }, {
        label: 'Contato',
        to: '/contact'
    }, {
        label: 'Politica de privacidade',
        to: 'privacy'
    }];

    const [busca, setBusca] = useState('');

    return (

        <>
            <Navbar className='NavBar d-flex justify-content-center'>
                <img
                    src="/img/logo.svg"
                    width="50vw"
                    height="50vh"
                    alt=''
                />{' '}
            </Navbar>

            <Navbar className='NavBar d-flex justify-content-center'>
                <Nav.Link className='Texto-Branco Texto-Medio' href="#home" >Ticketitas</Nav.Link>
            </Navbar>

            <Navbar className='NavBar d-flex justify-content-center'>
                {rotas.map((rota, index) => (
                <Nav.Item key={index}>
                    <Nav.Link style={{ margin: '0px 25px 0px 25px' }}>
                        <Link to={rota.to} className='Texto-Branco Texto-MuitoPequeno'>
                            {rota.label}
                        </Link>
                    </Nav.Link>
                </Nav.Item>
                ))}
            </Navbar>

            <Navbar className='NavBar d-flex justify-content-center'>
                <Nav.Link className='Texto-Branco Texto-MuitoPequeno' href="#home" >Copyright © 2023 12Devs. Todos os direitos reservados.</Nav.Link>
            </Navbar>
        </>
    );
}