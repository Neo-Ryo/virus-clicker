import React from 'react';
import { Card, Image, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function CardsGroup({
  image,
  key,
  header,
  onClick,
  date,
  usersNumber,
  teamUuid,
  uuid,
}) {
  return (
    <>
      <Card
        key={key}
        onClick={onClick}
        style={
          teamUuid === uuid
            ? { width: 220, height: 220, border: 'solid purple 5px' }
            : { width: 220, height: 220 }
        }
      >
        <Image
          src={image}
          style={{ margin: 0, width: '100%', height: '50%' }}
        />
        <Card.Content extra>
          <Header as="h3">{header}</Header>
          <Card.Meta>
            <span className="date">{`Create in ${date.substring(0, 10)}`}</span>
          </Card.Meta>
          <Icon color="teal" text-align="right" name="user" />
          {`${usersNumber} friends`}
        </Card.Content>
      </Card>
    </>
  );
}

CardsGroup.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  usersNumber: PropTypes.string.isRequired,
  teamUuid: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default CardsGroup;
