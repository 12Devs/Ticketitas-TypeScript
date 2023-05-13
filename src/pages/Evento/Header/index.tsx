import Image from 'react-bootstrap/Image';

import './style.css'


export default function Header({caminho}: {caminho: string}) {
    return (
        <div>
            <Image className='imagemHeader' src={caminho} />
        </div>

    );
}