import '../pages.css';
import Carousel from 'react-bootstrap/Carousel';


import '../Evento/styleGeralEvento.css'
import '../pages.css'
import './temp.css'


import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';




export default function Home() {
    return (

        <section className='mainContent larguraMainContentEventos'>



            <Carousel variant='dark'>

                <Carousel.Item className='p-5'>
                    <Container>
                        <Row >
                            <Col sm={8} className=' noMarginPadding'>

                                <Image className='configImg' src="img/exemploHeaderEvento.png" />

                                
                            </Col>
                            <Col sm={4} className='bordaRedor'>
                                <p>col 2 aa</p>
                            </Col>
                        </Row>

                    </Container>
                </Carousel.Item>

                <Carousel.Item className='p-5'>
                    <Container>
                        <Row >
                            <Col sm={8} className=' divImagem'>

                                <Image className='configImg' src="img/exemploHeaderEvento.png" />

                                
                            </Col>
                            <Col sm={4} className='bordaRedor'>
                                <p>col 2 aa</p>
                            </Col>
                        </Row>

                    </Container>
                </Carousel.Item>
            </Carousel>
        </section>
    );
}