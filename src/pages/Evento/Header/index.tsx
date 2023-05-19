import Image from 'react-bootstrap/Image';
import NavBarGeral from '../../../components/NavBarGeral';
import './style.css'


export default function Header({caminho}: {caminho: string}) {
    return (
        <>
        <NavBarGeral user='default'/>
        <div>
            <Image className='imagemHeader' src={caminho} />
        </div>
        </>

    );
}