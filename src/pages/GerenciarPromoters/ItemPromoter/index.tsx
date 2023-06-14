import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { api } from '../../../services/api';

import '../../../components/Button/Button.css';
import '../../../components/Texto/Texto.css';

export default function ItemPromoter(data: any) {
    const refresh = () => window.location.reload();

    const atualizarStatusPromoter = () => {
        const aut = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        api.patch(`/user/administrator/update-status-promoter/${data.promoter.cpf}`, aut).then(refresh);
    }
    
    return (
        <ListGroup.Item>
            <Row>
                <Col sm={6}>
                    <div className='row align-items-start'>
                        <h5 className=' text-start'>{data.promoter.nome}</h5>
                        <p className='text-start'>CPF: {data.promoter.cpf}</p>
                        <p className='text-start'>Telefone: {data.promoter.telefone}</p>
                    </div>
                </Col>
                <Col sm={6} className='row align-items-center justify-content-evenly'>
                    {data.promoter.status == 1 && <Button className='Botão-Primario Texto-Branco Texto-MuitoPequeno' onClick={atualizarStatusPromoter}>Suspender promoter</Button>}
                    {data.promoter.status == 0 && <Button className='Botão-Secundario Texto-Azul Texto-MuitoPequeno' onClick={atualizarStatusPromoter}>Revogar supensão</Button>}
                </Col>
            </Row>
        </ListGroup.Item>
    );
}