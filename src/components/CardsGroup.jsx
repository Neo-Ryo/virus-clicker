import React from 'react';
import { Card, Image, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function CardsGroup({
  image,
  header,
  onClick,
  date,
  usersNumber,
  teamUuid,
  uuid,
}) {
  return (
    <Card
      onClick={onClick}
      style={
        teamUuid === uuid ? { opacity: '0.5'} : {}
      }
      centered
    >
      <Image
        src={image}
        style={{
          margin: 0,
          width: '100%',
          height: '200px',
          background: '#ffc107',
        }}
      />
      <Card.Content extra>
        <Header as="h3">{header}</Header>
        <Card.Meta>
          <span className="date">{`Create in ${date.substring(0, 10)}`}</span>
        </Card.Meta>
        <Icon style={{color: '#dc3545'}} text-align="right" name="user" />
        {`${usersNumber} friends`}
      </Card.Content>
    </Card>
  );
}

CardsGroup.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  usersNumber: PropTypes.number.isRequired,
  teamUuid: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default CardsGroup;
