import Image from 'react-bootstrap/Image';
import './style.css'


export default function Header({caminho}: {caminho: string}) {
    var caminhoCerto = './backend/uploadImages/events/' + caminho;

    console.log(caminhoCerto);
    return (
        <>
        <div>
            <Image className='imagemHeader' src={caminhoCerto} />
        </div>
        </>

    );
}