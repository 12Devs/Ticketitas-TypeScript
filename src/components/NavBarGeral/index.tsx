import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import InputBuscar from '../InputBuscar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalLogin from '../ModalLogin';

import './Navbar.css';



const NavBarGeral = () => {
  const rotas = [{
    label: 'Home',
    to: '/'
  }, {
    label: 'Quem somos',
    to: '/about'
  }, {
    label: 'Ajuda',
    to: '/help'
  }, {
    label: 'Seja um promoter',
    to: '/cadastro-promoter'
  }];

  const [busca, setBusca] = useState('');

  return (

    <Navbar collapseOnSelect expand="lg" className='NavBar'>
      <Container>
        <Navbar.Brand>
          <img
            src="/img/logo.svg"
            width="30"
            height="30"
            className="d-inline-block"
            alt=''
          />{''}
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
            {"Ticketitas"}
          </Link>
        </Navbar.Brand>


        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />

          <Nav className="me-auto" >
            <InputBuscar placeholder='Busque eventos, shows, teatros...' controlId='buscarNavBar' data={busca} setData={setBusca} />
          </Nav>

          <Nav>
            {rotas.map((rota, index) => (
              <Nav.Item key={index}>
                <Nav.Link>
                  <Link to={rota.to} style={{ textDecoration: 'none', color: 'white' }}>
                    {rota.label}
                  </Link>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          
          <ModalLogin/>

          <Button variant="primary">
            <Link to={'/cadastrarSe'} style={{ textDecoration: 'none', color: 'white' }}>
              {'Cadastrar-se'}
            </Link>
          </Button>{' '}

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavBarGeral;