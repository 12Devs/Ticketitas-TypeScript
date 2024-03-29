import "./style.css";
import Button from 'react-bootstrap/Button';
export default function BannerPublicidade() {

    return (
        <>
         <div className='container1'>
                <div className='imagem'>
                    <div className='texto-banner'>
                        <p className='titulo-banner'>
                        Publique e venda seu evento <br></br>na Ticketitas
                        </p>
                        <p className='frase-banner'>
                        A Ticketitas é hoje o maior portal de eventos do Brasil, e o destino de quem busca conteúdos de qualidade, seja em shows, palestras, festivais.
                        </p>
                        <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Primario Texto-Branco' type="submit" >
                        Cadastre seu Evento
                    </Button>
                    </div>
                    
                    
                </div>
            
            </div>
    
    </>
    );
   
}
