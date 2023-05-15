import Footer from '../../components/Footer';
import "../../../src/components/Texto/Texto.css"
import { Row } from 'react-bootstrap';
import BannerPublicidade from '../../components/bannerPublicidade';
export default function QuemSomos(){
    return (
        <>
            <Row>
                
        
            <div >
                <p className='Titulo-Geral'>
                QUEM SOMOS:
                </p>
                <div className=''>
                A TICKETITAS é uma empresa de base tecnológica que atende tanto organizadores (B2B) como compradores (B2C), <br></br>
                oferecendo serviços para a gestão de eventos e compra de ingressos. O público encontra uma ampla variedade de opções, desde grandes shows, 
                <br></br>
                festas e eventos esportivos até congressos, cursos, encontros de networking, dentre outros.
                A empresa nasceu em 2023, em Feira de Santana-BA, fruto de parceria entre os 12DEVS!
                </div>
            </div>

            <BannerPublicidade></BannerPublicidade>
           
            </Row>
            
           
                
            

            <Footer/>
        </> 
    );
}