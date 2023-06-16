import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';

import '../../../components/Button/Button.css';
import '../../../components/Texto/Texto.css';

export default function ItemEvento(data: any) {
    const navigate = useNavigate();
    const refresh = () => window.location.reload();

    const dataHoraOBJ = new Date(data.evento.dateEvent);
    console.log("teste", data);
    const dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };


    return (
        <ListGroup.Item>
            <Row>
                <Col sm={6}>
                    <div className='row align-items-start'>
                        <h5 className=' text-start'>{data.evento.nameEvent}</h5>
                        <p className='text-start'>{dataHoraFormatada}</p>
                        <p className='text-start'>Tipo: {data.evento.profile}</p>
                        <p className='text-start'>Setor: {data.evento.sector}</p>
                        <p className='text-start'>R$ {data.evento.value}</p>
                    </div>
                </Col>
                <Col sm={6} className='row align-items-center justify-content-evenly'>
                    <p>Código do ingresso: </p>
                    <p><strong> {data.evento.id} </strong>
                    </p>

                </Col>
            </Row>
        </ListGroup.Item>
    );
}