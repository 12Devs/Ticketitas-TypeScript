import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import CardEvento from '../CardEvento';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

function CardDestaques() {
  const [arrayEventos, setArrayEventos] = useState({ allHighlights: [] });

  useEffect(() => {
    api.get(`/highlights`).then((response) => {
      setArrayEventos(response.data);
    });
  }, []);

  return (
    <CardGroup style={{ width: '70vw' }}>
      <CardEvento dados={arrayEventos.allHighlights[0]} />
      <CardEvento dados={arrayEventos.allHighlights[1]} />
      <CardEvento dados={arrayEventos.allHighlights[2]} />
    </CardGroup>
  );
}

export default CardDestaques;