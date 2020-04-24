import React from "react";
import { Card } from "semantic-ui-react";

function CardsGroup({ image, key, header, onClick }) {
  return (
    <>
      <Card
        key={key}
        image={image}
        header={header}
        onClick={onClick}
        style={{ width: 150, height: 150, marginTop: 20 }}
      />
    </>
  );
}

export default CardsGroup;
