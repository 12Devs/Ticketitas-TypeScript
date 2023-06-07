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


export default function Evento() {
    
    let params = useParams();
    var infoID = '0';

    if (params.IdCart !== undefined) {
        infoID = params.IdCart;
    } 
    
    console.log("InfoID:",infoID);

    const [arrayEventos, setArrayEventos] = useState({ allEvents: [] });

    useEffect(() => {
        
        
        api.get(`/checkout/{}`).then((response) => {
            setArrayEventos(response.data);
        });
   
    }, []);

    const location = useLocation();
    var infoID = '0';

    window.scrollTo(0, 0);

    if (location.state) {
        infoID = location.state.idCheckout;
    }

   
    
    

    return (
        <>
        <NavBarGeral />
        <Container className='noMarginPadding corPagina' fluid>

            <Row>
                
                <ResumoCompra idCheckout={infoID} />
                
            </Row>

           
        </Container>
        </>

    );
}