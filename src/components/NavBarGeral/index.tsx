import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import InputBuscar from '../InputBuscar';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalLogin from '../ModalLogin';
import Form from 'react-bootstrap/Form';


import './Navbar.css';
import { api } from '../../services/api'
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
    label: 'Meus ingressos',
    to: '/meusIngressos'
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

  const [typeUser, setTypeUser] = useState('default');
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();

  const [arrayEventos, setArrayEventos] = useState({ allEvents: [] });




  // Recarrega a tela
  const refresh = () => window.location.reload();

  // Limpa os dados salvos localmente
  function logout() {
    localStorage.clear();
    navigate('/');
    refresh();
  }

  function renderBuscarOpcoes(){
    return(
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Selecione uma opção:</Form.Label>
          <Form.Control
            type="text"
            list="opcoes"
            placeholder="Digite uma opção"
          />
          <datalist id="opcoes">
            <option value="Opção 1" />
            <option value="Opção 2" />
            <option value="Opção 3" />
            <option value="Opção 4" />
          </datalist>
        </Form.Group>
      </Form>
    )
  }
  
  useEffect(() => {
    setTypeUser(localStorage.getItem("userType")? '' + localStorage.getItem("userType") : 'default');
  }, []);

  useEffect(() => {
    api.get(`/event/active`, ).then((response) => {
        setArrayEventos(response.data);
    });
}, []);
  return (
    <Navbar collapseOnSelect expand="lg" className='NavBar'>

      <Container fluid className={typeUser == 'admLogin' ? 'justify-content-center' : ''}>
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

        {typeUser == 'default' &&
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />

            <Nav className="me-auto" >
              {/*renderBuscarOpcoes()*/}
              
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

        {typeUser == 'cliente' &&
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
                <Dropdown.Item onClick={() => navigate('/perfil')}>Perfil</Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Navbar.Collapse>
        }

        {typeUser == 'admin' &&
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
                <Dropdown.Item onClick={() => navigate('/perfil')}>Perfil</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/gerenciarPromoters')}>Gerenciar promoters</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/gerenciarAdmins')}>Gerenciar administradores</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/cadastrarAdmin')}>Cadastrar administrador</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/relatorioEventos')}>Eventos cadastrados</Dropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        }

        {typeUser == 'promoter' &&
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
                <Dropdown.Item onClick={() => navigate('/perfil')}>Perfil</Dropdown.Item>
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