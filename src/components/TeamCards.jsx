import React from "react";
import { Card, Image, Header } from "semantic-ui-react";

function CardsGroup({ image, key, header, onClick }) {
  return (
    <>
      <Card
        key={key}
        onClick={onClick}
        style={{ width: 170, height: 160, marginTop: 20 }}
      >
        <Image
          src={image}
          style={{ margin: 0, width: "100%", height: "70%" }}
        />
        <Header textAlign="center">{header}</Header>
      </Card>
    </>
  );
}

export default CardsGroup;
