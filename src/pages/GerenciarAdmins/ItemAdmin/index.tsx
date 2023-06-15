import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { api } from '../../../services/api';

import '../../../components/Button/Button.css';
import '../../../components/Texto/Texto.css';

export default function ItemAdmin(data: any) {
    const refresh = () => window.location.reload();

    const atualizarStatusAdmin = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        api.delete(`/user/administrator/remove/${data.admin.cpf}`, config).then(refresh);
    }
    
    return (
        <ListGroup.Item>
            <Row>
                <Col sm={6}>
                    <div className='row align-items-start'>
                        <h5 className=' text-start'>{data.admin.name}</h5>
                        <p className='text-start'>CPF: {data.admin.cpf}</p>
                    </div>
                </Col>
                <Col sm={6} className='row align-items-center justify-content-evenly'>
                    <Button className='Botão-Primario Texto-Branco Texto-MuitoPequeno' onClick={atualizarStatusAdmin}>Excluir administrador</Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}