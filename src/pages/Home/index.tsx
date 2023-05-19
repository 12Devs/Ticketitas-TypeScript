import '../pages.css';
import './styleHome.css';
import CarouselPrincipal from './Carousel';
import CardEvento from '../../components/CardEvento';
import CardGrupo from '../../components/CardDestaques';
import NavBarGeral from '../../components/NavBarGeral';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import { Carousel } from 'react-bootstrap';
import CardDestaques from '../../components/CardDestaques';

export default function Home() {
    return (
        <>
            <NavBarGeral user='default' />
            <Container className='noMarginPadding corPagina' fluid>

                <Row className='text-start larguraMainContentEventos'>
                    <p className='Texto-Preto Texto-Pequeno'>Eventos em destaque na Ticketitas</p>
                    <CarouselPrincipal></CarouselPrincipal>
                </Row>

                <Row className='text-start larguraMainContentEventos mt-5'>
                    <p className='Texto-Preto Texto-Pequeno'>Também em destaque...</p>
                    <CardDestaques></CardDestaques>
                </Row>


            </Container>
        </>

    );
}