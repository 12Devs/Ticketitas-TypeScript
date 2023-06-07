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
import {useParams } from 'react-router-dom';


export default function Checkout() {
    
    let params = useParams();
    var infoID = '0';

    if (params.IdCart !== undefined) {
        infoID = params.IdCart;
    } 
    
 

    const [arrayEventos, setArrayEventos] = useState({ allEvents: [] });

    useEffect(() => {
        
        
        api.get(`sale/checkout/${infoID}`).then((response) => {
            setArrayEventos(response.data);
        });
        console.log("array eventos:",arrayEventos);
   
    }, []);

    const location = useLocation();
    
   
    
    function renderResumocompra() {
        console.log("InfoID no codigo:",infoID)
        return (<ResumoCompra idCheckout={infoID} />)

    }

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
}