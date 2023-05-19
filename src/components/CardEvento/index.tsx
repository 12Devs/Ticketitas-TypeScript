import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

const CardEvento = ({dados}:{dados: any}) => {
  const [nome, setNome] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [idEvento, setIdEvento] = useState('');

  const navigate = useNavigate();

  // const endereco = `${rua} - ${cidade} - ${estado}`;


  const handleNavigate = () => {
    navigate('/evento', { state: { idEvento } });
  }

  // Formata a data e hora
  var dataHoraFormatada = '';
  if (dataEvento !== '') {
    var dataHoraOBJ = new Date(dataEvento);
    dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();
  }

  useEffect(() => {
    if (dados !== undefined ) {
      setNome(dados.nome);
      setDataEvento(dados.dataEvento);
      setIdEvento(dados.id);
    }
  }, [dados]);

  return(
    <Card className="card-container noPadding m-2" style={{border:'none', borderRadius: '11px'}}>
      <Card.Img className="cardImg" variant="top" src="img/eventPic.jpg" />
      <Card.Body>
        
        <Card.Title className="cardTitle">{nome}</Card.Title>
        
        <Card.Text className='cardText'>
          {dataHoraFormatada} <br />
          ---
        </Card.Text>

        <Button className="cardButton" onClick={handleNavigate}>Saiba mais</Button>
      </Card.Body>
    </Card>
    );
}

export default CardEvento;