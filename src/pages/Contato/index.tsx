import Footer from '../../components/Footer';
import "../../../src/components/Texto/Texto.css"
import "../Contato/style.css";
import NavBarGeral from '../../components/NavBarGeral';
import BannerPublicidade from '../../components/bannerPublicidade';

export default function Contato(){
    return (
        <>
            <NavBarGeral />
            <div className='nav-texto' >
                <div className='texto'>
                    <p className='Titulo-Geral'>
                    CONTATO
                    </p>
                    <div className=''>
                    Entre em contato com o nosso suporte através do e-mail: ticketitas12devs@gmail.com.
                    </div>
                </div>
            </div>

            
        </> 
    );
}