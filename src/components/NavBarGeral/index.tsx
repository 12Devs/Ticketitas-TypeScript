import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
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

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='NavBar'>
        <Container>
          <Navbar.Brand>
            <img
              src="/img/logo.svg"
              width="60"
              height="60"
              className="d-inline-block"
              alt=''
            />
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white', }}>
              {"Ticketitas"}
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              {/*rotas.map((rota, index) => (
                <Nav.Item key={index}>

                  <Nav.Link>
                    <Link to={rota.to} style={{ textDecoration: 'none', color: 'white' }}>
                      {rota.label}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              ))*/}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarGeral;