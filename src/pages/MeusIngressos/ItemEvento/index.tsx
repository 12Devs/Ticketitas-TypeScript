import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';

import '../../../components/Button/Button.css';
import '../../../components/Texto/Texto.css';

export default function ItemEvento(data: any) {
    const navigate = useNavigate();
    const refresh = () => window.location.reload();

    const dataHoraOBJ = new Date(data.evento.dataEvento);
    const dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    const atualizarStatusEvento = () => {
        const id = data.evento.id;
        const promoterCpf = data.evento.promoterCpf;

        var dadosEvento : any = {
            id,
            promoterCpf
        }

        api.patch(`/event/administrator/update-status`, dadosEvento, config).then((response)=>{console.log(response)});

        refresh();
    }

    const verDetalhes = () => {
        navigate(`/evento/${data.evento.id}`);
    }
    const editar = () => {
        navigate(`/editarEvento`,{state:{idEvento: data.evento.id}});
    }
    
    return (
        <ListGroup.Item>
            <Row>
                <Col sm={6}>
                    <div className='row align-items-start'>
                        <h5 className=' text-start'>{data.evento.nome}</h5>
                        <p className='text-start'>{dataHoraFormatada}</p>
                        <p className='text-start'>{data.evento.status}</p>
                    </div>
                </Col>
                <Col sm={6} className='row align-items-center justify-content-evenly'>
                    <Button className='Botão-Primario Texto-Branco Texto-MuitoPequeno'  onClick={editar}>Ver ingresso</Button>

                </Col>
            </Row>
        </ListGroup.Item>
    );
}