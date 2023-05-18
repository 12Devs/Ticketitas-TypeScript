import Footer from '../../components/Footer';
import "../../../src/components/Texto/Texto.css"
import "../QuemSomos/style.css";
import NavBarGeral from '../../components/NavBarGeral';
import BannerPublicidade from '../../components/bannerPublicidade';

export default function QuemSomos(){
    return (
        <>
            <NavBarGeral user='default'/>
            <div className='nav-texto' >
                <div className='texto'>
                    <p className='Titulo-Geral'>
                    QUEM SOMOS:
                    </p>
                    <div className=''>
                    A TICKETITAS é uma empresa de base tecnológica que atende tanto organizadores (B2B) como compradores (B2C), 
                    oferecendo serviços para a gestão de eventos e compra de ingressos. O público encontra uma ampla variedade de opções, desde grandes shows, 

                    festas e eventos esportivos até congressos, cursos, encontros de networking, dentre outros.
                    A empresa nasceu em 2023, em Feira de Santana-BA, fruto de parceria entre os 12DEVS!
                    </div>
                </div>
            </div>

            <BannerPublicidade></BannerPublicidade>
            
          
                
            

        </> 
    );
}