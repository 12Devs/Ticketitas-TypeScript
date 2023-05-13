import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function CardGrupo() {
  return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src="img/eventPic.jpg" />
        <Card.Body>
          <Card.Title>Caldinho e Feijoada</Card.Title>
          <Card.Text>
            Show de forró com o melhor vocalista gospel de Feira de Santana.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Postado há 2 horas</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="img/eventPic.jpg" />
        <Card.Body>
          <Card.Title>Moraes Desgraçadinho</Card.Title>
          <Card.Text>
            Venha se divertir nesse show de romance! Traga seu companheiro ou sua companheira
            e aproveite.{' '}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Postado há 3 horas</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="img/eventPic.jpg" />
        <Card.Body>
          <Card.Title>JG em Ichu City</Card.Title>
          <Card.Text>
            Ichu vai ficar menor ainda com a presença do cantor mais arretado da mulherada.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Atualizado há 5 horas</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default CardGrupo;