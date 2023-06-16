import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import ResumoCompra from '../ResumoCompra';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../../services/api';
import '../../pages.css'
import '../styleGeralEvento.css';
import '../../Home/styleHome.css';
import NavBarGeral from '../../../components/NavBarGeral';
import { useParams } from 'react-router-dom';
import Forbidden403 from '../../Forbidden403';


export default function Checkout() {

    let params = useParams();
    var infoID = '0';

    if (params.IdCart !== undefined) {
        infoID = params.IdCart;
    }

    function renderResumocompra() {
        return (<ResumoCompra idCheckout={infoID} />)
    }

    if (localStorage.getItem("userType") == "Cliente") {
        return (
            <>
                <NavBarGeral />
                <Container className='noMarginPadding corPagina' fluid>
                    <Row>
                        {renderResumocompra()}
                    </Row>
                </Container>
            </>
        );
    } else {
        return <Forbidden403 />
    }
}