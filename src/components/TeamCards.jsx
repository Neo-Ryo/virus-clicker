import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function CardsGroup({ image, key, header, onClick, date, usersNumber }) {
  return (
    <>
      <Card key={key} onClick={onClick} style={{ width: 220, height: 270 }}>
        <Image
          src={image}
          style={{ margin: 0, width: '100%', height: '70%' }}
        />
        <Card.Content extra>
          <Card.Header>{header}</Card.Header>
          <Card.Meta>
            <span className="date">{`Create in ${date.substring(0, 10)}`}</span>
          </Card.Meta>
          <Icon text-align="right" name="user" />
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
};

export default CardsGroup;
