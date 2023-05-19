import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import CardEvento from '../CardEvento';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

function CardDestaques() {
  const [arrayEventos, setArrayEventos] = useState({ allEvents: [] });

  useEffect(() => { 
    api.get(`/event`).then((response) => {
      setArrayEventos(response.data);
    });
  }, []);

  return (
    <CardGroup style={{ width: '70vw' }}>
      <CardEvento dados={arrayEventos.allEvents[0]}/>
      <CardEvento dados={arrayEventos.allEvents[1]}/>
      <CardEvento dados={arrayEventos.allEvents[2]}/>
      <CardEvento dados={arrayEventos.allEvents[2]}/>
      <CardEvento dados={arrayEventos.allEvents[2]}/>
    </CardGroup>
  );
}

export default CardDestaques;