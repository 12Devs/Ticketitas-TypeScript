import Image from 'react-bootstrap/Image';
import './style.css'


export default function Header({caminho}: {caminho: string}) {
    return (
        <>
        <div>
            <Image className='imagemHeader' src={`https://drive.google.com/uc?export=view&id=`+caminho} />
        </div>
        </>

    );
}

