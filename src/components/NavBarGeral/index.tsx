import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import InputBuscar from '../InputBuscar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalLogin from '../ModalLogin';

import './Navbar.css';
import { Dropdown } from 'react-bootstrap';

const NavBarGeral = () => {
  const rotasDefault = [{
    label: 'Home',
    to: '/'
  }, {
    label: 'Quem somos',
    to: '/about'
  }, {
    label: 'Seja um promoter',
    to: '/cadastrarPromoter'
  }];

  const rotasCliente = [{
    label: 'Meu carrinho',
    to: '/carrinho'
  }]

  const rotasPromoter = [{
    label: 'Cadastrar eventos',
    to: '/cadastrarEvento',
  }, {
    label: 'Meus eventos',
    to: '/meusEventos'
  }]

  const rotasAdmin = [{
    label: 'Solicitações de cadastro',
    to: '/solicitacoesCadastro'
  }]

  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [usuarioTipo, setUsuarioTipo] = useState('default');

  function mudarRota(rota: string) {
    navigate(rota); 
  }

  function logout() {
    // chamar função de logout do backend

    setUsuarioTipo('default');
    navigate('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" className='NavBar'>
      <Container fluid>
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

        {usuarioTipo == 'default' &&
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />

            <Nav className="me-auto" >
              <InputBuscar placeholder='Busque eventos, shows, teatros...' controlId='buscarNavBar' data={busca} setData={setBusca} />
            </Nav>

            <Nav>
              {rotasDefault.map((rota, index) => (
                <Nav.Item key={index}>
                  <Nav.Link>
                    <Link to={rota.to} style={{ textDecoration: 'none', color: 'white' }}>
                      {rota.label}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <ModalLogin />

            <Button variant="primary">
              <Link to={'/cadastrarCliente'} style={{ textDecoration: 'none', color: 'white' }}>
                {'Cadastrar-se'}
              </Link>
            </Button>{' '}

          </Navbar.Collapse>
        }

        {usuarioTipo == 'cliente' &&
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />

            <Nav className="me-auto" >
              <InputBuscar placeholder='Busque eventos, shows, teatros...' controlId='buscarNavBar' data={busca} setData={setBusca} />
            </Nav>

            <Nav>
              {rotasCliente.map((rota, index) => (
                <Nav.Item key={index}>
                  <Nav.Link>
                    <Link to={rota.to} style={{ textDecoration: 'none', color: 'white' }}>
                      {rota.label}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <Dropdown drop='start'>
              <Dropdown.Toggle variant="transparent" id="dropdown-image">
                <img
                  src="/img/profileIcon.svg"
                  width="30"
                  height="30"
                  className="d-inline-block"
                  alt=''
                />{''}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => mudarRota('/perfil')}>Perfil</Dropdown.Item>
                <Dropdown.Item onClick={() => mudarRota('/meusIngressos')}>Meus ingressos</Dropdown.Item>
                <Dropdown.Item onClick={() => mudarRota('/cartoes')}>Gerenciar cartão</Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item onClick={logout}>Sair</Dropdown.Item> 
              </Dropdown.Menu>
            </Dropdown>

          </Navbar.Collapse>
        }

        {usuarioTipo == 'admin' &&
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />

            <Nav className="me-auto" >
              <InputBuscar placeholder='Busque eventos, shows, teatros...' controlId='buscarNavBar' data={busca} setData={setBusca} />
            </Nav>

            <Nav>
              {rotasAdmin.map((rota, index) => (
                <Nav.Item key={index}>
                  <Nav.Link>
                    <Link to={rota.to} style={{ textDecoration: 'none', color: 'white' }}>
                      {rota.label}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <Dropdown drop='start'>
              <Dropdown.Toggle variant="transparent" id="dropdown-image">
                <img
                  src="/img/profileIcon.svg"
                  width="30"
                  height="30"
                  className="d-inline-block"
                  alt=''
                />{''}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => mudarRota('/perfil')}>Perfil</Dropdown.Item>
                <Dropdown.Item onClick={() => mudarRota('/gerenciarPromoters')}>Gerenciar promoters</Dropdown.Item>
                <Dropdown.Item onClick={() => mudarRota('/gerenciarAdmins')}>Gerenciar administradores</Dropdown.Item>
                <Dropdown.Item onClick={() => mudarRota('/relatorioEventos')}>Eventos cadastrados</Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item onClick={logout}>Sair</Dropdown.Item> 
              </Dropdown.Menu>
            </Dropdown>

          </Navbar.Collapse>
        }

        {usuarioTipo == 'promoter' &&
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />

            <Nav className="me-auto" >
              <InputBuscar placeholder='Busque eventos, shows, teatros...' controlId='buscarNavBar' data={busca} setData={setBusca} />
            </Nav>

            <Nav>
              {rotasPromoter.map((rota, index) => (
                <Nav.Item key={index}>
                  <Nav.Link>
                    <Link to={rota.to} style={{ textDecoration: 'none', color: 'white' }}>
                      {rota.label}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <Dropdown drop='start'>
              <Dropdown.Toggle variant="transparent" id="dropdown-image">
                <img
                  src="/img/profileIcon.svg"
                  width="30"
                  height="30"
                  className="d-inline-block"
                  alt=''
                />{''}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => mudarRota('/perfil')}>Perfil</Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item onClick={logout}>Sair</Dropdown.Item> 
              </Dropdown.Menu>
            </Dropdown>

          </Navbar.Collapse>
        }

      </Container>
    </Navbar>
  );
}

export default NavBarGeral;