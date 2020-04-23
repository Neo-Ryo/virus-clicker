import React from "react";
import { Card, Container } from "semantic-ui-react";
import { CarouselProvider, Slider } from "pure-react-carousel";
import styles from "./TeamCard.module.css";

const teams = [
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/100.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/150.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/140.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/130.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
  {
    teamlogo:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/120.png",
    teamname: "pikapika",
    members: "Members: " + 23,
  },
];

function CardsGroup() {
  const lengthT = Math.round(teams.length / 3);
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
            {teams.map((team, i) => (
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
