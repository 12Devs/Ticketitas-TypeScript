import {useEffect,useState} from 'react'
import {Container} from 'react-bootstrap'
import { api } from '../../services/api';
import NavBarGeral from '../../components/NavBarGeral';
import FormLabel from '../../components/FormLabel';

export default function MeusEventos(){
    const [arrayEventos, setArrayEventos] = useState({ allEvents: [] });
    
    useEffect(() => {
        api.get(`/event`).then((response) => {
            setArrayEventos(response.data);
            console.log(arrayEventos)
        });
    }, []);
    return(
        <>
        <NavBarGeral/>
        
        <Container>
            <FormLabel label={"Meus Eventos"}/>
        </Container>
        </>
    );
}