import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';

import '../../../components/Button/Button.css';
import '../../../components/Texto/Texto.css';
import { useEffect } from 'react';

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

        api.patch(`/event/administrator/update-status`, dadosEvento, config).then(refresh);
    }

    const atualizarDestaque = () => {
        api.patch(`/event/set-featured/${data.evento.id}`, config, config).then(refresh);
    }

    const verDetalhes = () => {
        navigate(`/evento/${data.evento.id}`);
    }
    
    return (
        <ListGroup.Item>
            <Row>
                <Col sm={4}>
                    <div className='row align-items-start'>
                        <h5 className=' text-start'>{data.evento.nome}</h5>
                        <p className='text-start'>{dataHoraFormatada}</p>
                        <p className='text-start'>{data.evento.status}</p>
                    </div>
                </Col>
                <Col sm={8} className='row align-items-center justify-content-evenly'>
                    {data.evento.destaque == true && <Button className='Botão-Primario Texto-Branco Texto-MuitoPequeno' onClick={atualizarDestaque}>Remover destaque</Button>}
                    {data.evento.destaque == false && <Button className='Botão-Secundario Texto-Azul Texto-MuitoPequeno' onClick={atualizarDestaque}>Destacar evento</Button>}
                    
                    {data.evento.status == true && <Button className='Botão-Secundario Texto-Azul Texto-MuitoPequeno' onClick={atualizarStatusEvento}>Suspender evento</Button>}
                    {data.evento.status == false && <Button className='Botão-Secundario Texto-Azul Texto-MuitoPequeno' onClick={atualizarStatusEvento}>Ativar evento</Button>}

                    {data.evento.status == true && <Button className='Botão-Primario Texto-Branco Texto-MuitoPequeno' onClick={verDetalhes}>Detalhes</Button>}
                    {data.evento.status == false && <Button className='Botão-Primario Texto-Branco Texto-MuitoPequeno' disabled onClick={verDetalhes}>Detalhes</Button>}
                </Col>
            </Row>
        </ListGroup.Item>
    );
}