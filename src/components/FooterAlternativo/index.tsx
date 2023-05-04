import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer()

 {

  return (

    <Navbar collapseOnSelect expand="lg" className='Footer'>
      
        <nav>
          <img
            src="/img/logo.svg"
            width="50"
            height="50"
            className="d-inline-block"
            alt=''
            

          />{''}
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
            <div id='texto'>
              Ticketitas
            </div>
            <div className=''></div>
          </Link>
          
          
        </nav>
          <nav className='texto-cr'>
          Copyright © 2023 12Devs. Todos os direitos reservados.
          </nav>
          
        


        
     
    </Navbar>
  );
}

export default Footer;