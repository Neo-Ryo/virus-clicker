import React from 'react';
import { Card, Image, Icon, Header } from 'semantic-ui-react';

function CardsGroup({
  image,
  header,
  onClick,
  date,
  usersNumber,
  TeamUuid,
  uuid,
}) {
  return (
    <Card
      onClick={onClick}
      style={TeamUuid ? (TeamUuid === uuid ? { opacity: '0.5' } : {}) : {}}
      centered
    >
      <Image
        src={image}
        style={{
          margin: 0,
          width: '100%',
          height: '200px',
          background: '#cce2ff',
        }}
      />
      <Card.Content extra>
        <Header as="h3">{header}</Header>
        <Card.Meta>
          <span className="date">{`Create in ${date.substring(0, 10)}`}</span>
        </Card.Meta>
        <Icon style={{ color: '#dc3545' }} text-align="right" name="user" />
        {`${usersNumber} friends`}
      </Card.Content>
    </Card>
  );
}

export default CardsGroup;
