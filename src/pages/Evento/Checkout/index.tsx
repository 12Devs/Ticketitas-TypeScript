import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import ResumoCompra from '../ResumoCompra';

import { useLocation } from 'react-router-dom';

import '../../pages.css'
import '../styleGeralEvento.css';
import '../../Home/styleHome.css';
import NavBarGeral from '../../../components/NavBarGeral';
import React from 'react';

export default function Evento() {
    const location = useLocation();
    var infoID = '0';

    window.scrollTo(0, 0);

    if (location.state) {
        infoID = location.state.idEvento;
    }

    console.log()
    
    return (
        <>
        <NavBarGeral />
        <Container className='noMarginPadding corPagina' fluid>

            <Row>
                <ResumoCompra idEvento={infoID? infoID : '0'} />
            </Row>

            <Row className='text-start larguraMainContentEventos mt-5'>
                

                
            </Row>
        </Container>
        </>

    );
}