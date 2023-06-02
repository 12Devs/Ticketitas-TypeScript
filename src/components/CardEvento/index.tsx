import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

const CardEvento = ({dados}:{dados: any}) => {
  const [nome, setNome] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [rua, setRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [idEvento, setIdEvento] = useState('');

  // Recarrega a tela
  const refresh = () => window.location.reload();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/evento/${idEvento}`);
    refresh();
  }

  // Formata a data e hora
  var dataHoraFormatada = '';
  if (dataEvento !== '') {
    var dataHoraOBJ = new Date(dataEvento);
    dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();
  }
  
  // Formata o local
  const endereco = `${rua} - ${cidade} - ${estado}`;

  useEffect(() => {
    if (dados !== undefined ) {
      setNome(dados.nome);
      setDataEvento(dados.dataEvento);
      setIdEvento(dados.id);
      setRua(dados.enderecoEvent.rua);
      setCidade(dados.enderecoEvent.cidade);
      setEstado(dados.enderecoEvent.estado);
    }
  }, [dados]);

  return(
    <Card className="card-container noPadding m-2" style={{border:'none', borderRadius: '11px'}}>
      <Card.Img className="cardImg" variant="top" src="img/eventPic.jpg" />
      <Card.Body>
        
        <Card.Title className="cardTitle">{nome}</Card.Title>
        
        <Card.Text className='cardText'>
          {dataHoraFormatada} <br />
          {endereco}
        </Card.Text>

        <Button className="cardButton" onClick={handleNavigate}>Saiba mais</Button>
      </Card.Body>
    </Card>
    );
}

export default CardEvento;