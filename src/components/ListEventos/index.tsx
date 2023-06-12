import {useEffect,useState} from 'react'
import {Container, Row} from 'react-bootstrap'
import { api } from '../../services/api';
import NavBarGeral from '../../components/NavBarGeral';
import FormLabel from '../../components/FormLabel';

export default function LisEventos(){
    const [arrayEventos, setArrayEventos] = useState({ allEvents: [] });
    
    useEffect(() => {
        api.get(`/event`).then((response) => {
            setArrayEventos(response.data);
        });
    }, []);
    return(
        <>
        <Row>
            <div>
                
            </div>
        </Row>
        </>
    );
}