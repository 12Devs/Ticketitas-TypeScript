import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import CardEvento from '../CardEvento';

function CardDestaques() {
  return (
    <CardGroup style={{width: '70vw'}}>
      <CardEvento></CardEvento>
      <CardEvento></CardEvento>
      <CardEvento></CardEvento>
    </CardGroup>
  );
}

export default CardDestaques;