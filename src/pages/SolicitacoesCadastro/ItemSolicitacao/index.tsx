import { useNavigate } from "react-router-dom";
import { api } from '../../../services/api';
import { Button, ListGroup } from "react-bootstrap";


export default function ItemSolicitacao(data: any) {
    const refresh = () => window.location.reload();

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    const aprovarPromoter = () => {
        api.patch(`/user/administrator/aprove-registration/${data.promoter.promoterCpf}`, config).then(refresh);
    }

    return (
        <ListGroup.Item as="li"
            className="d-flex justify-content-between">
            <div className="ms-2 me-auto">
                <h5 className='text-start'>{data.promoter.name}</h5>
                <p className='text-start'>{data.promoter.promoterCpf}</p>
                <p className='text-start'>{data.promoter.email}</p>
            </div>
            <div className='row align-items-center'>
                <Button className='ms-5 me-5 Botão-Primario Texto-Branco Texto-MuitoPequeno' onClick={aprovarPromoter}>Aceitar cadastro</Button>
            </div>
        </ListGroup.Item>
    )
}
