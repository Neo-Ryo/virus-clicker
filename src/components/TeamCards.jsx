import React from "react";
import { Card, Container } from "semantic-ui-react";
import { CarouselProvider, Slider } from "pure-react-carousel";
import data from "./teamTest.json";

const test = data.teams;
function CardsGroup() {
  const lengthT = Math.round(test.length / 3);
  return (
    <Container>
      <CarouselProvider
        naturalSlideWidth={3}
        naturalSlideHeight={1.25}
        totalSlides={lengthT}
        style={{ width: "80vw" }}
      >
        <Slider>
          <Card.Group>
            {test.map((team, i) => (
              <Card
                key={i}
                image={team.teamlogo}
                header={team.teamname}
                extra={team.members}
                style={{ width: 150, height: 250, marginTop: 20 }}
              />
            ))}
          </Card.Group>
        </Slider>
      </CarouselProvider>
    </Container>
  );
}

export default CardsGroup;
