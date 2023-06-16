import Footer from '../../components/Footer';
import "../../../src/components/Texto/Texto.css"
import "../Privacidade/style.css";
import NavBarGeral from '../../components/NavBarGeral';

export default function Privacidade() {
    return (
        <>
            <NavBarGeral />
            <div className='nav-texto' >
                <div className='texto'>
                    <p className='Titulo-Geral'>
                        POLÍTICA DE PRIVACIDADE
                    </p>
                    <div className=''>
                        A 12DEVS se compromete a adotar as melhores posturas para evitar incidentes de segurança.
                        Apenas pessoas autorizadas têm acesso a seus dados pessoais. O acesso a seus dados pessoais é feito somente após o compromisso de confidencialidade. Seus dados pessoais são armazenados em ambiente seguro e idôneo.

                    </div>
                </div>
            </div>



        </>
    );
}