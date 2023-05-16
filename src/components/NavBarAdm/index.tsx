import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


const NavBarAdm = () => {
    return(
        <Navbar collapseOnSelect expand="lg" className='NavBar'>
        <Container fluid className='justify-content-center'>
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
        </Container>
        </Navbar>

    );
}

export default NavBarAdm;