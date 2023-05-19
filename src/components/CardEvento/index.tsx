import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './style.css';

const CardEvento = ({}) => {
    return(
    <Card className="card-container noPadding m-2" style={{border:'none', borderRadius: '11px'}}>
      <Card.Img className="cardImg" variant="top" src="img/eventPic.jpg" />
      <Card.Body>
        
        <Card.Title className="cardTitle">Nome do Evento</Card.Title>
        
        <Card.Text className='cardText'>
          27 MAR - 20h <br />
          Teatro da CDL - Feira de Santana
        </Card.Text>

        <Button className="cardButton">Saiba mais</Button>
      </Card.Body>
    </Card>
    );
}

export default CardEvento;