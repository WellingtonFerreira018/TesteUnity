/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Button, StyledCardGame, Title } from "./styles";
import { FaPlay } from "react-icons/fa";

interface Igame {
  id: number;
  leanguage: number;
  category: number;
  name: string;
  author: {
    id: number;
    name: string;
  };
  visiblity: NumberConstructor;
  descripition: string;
  questions: Question[];
}

interface Question {
  text: string;
  answer: number;
  time: number;
  answers: string[];
  img: string;
}

export default function Mygames() {
  const [game, setGame] = useState<Igame[]>([]);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const initialData = {
    spaces: 30,
    game: 0,
    groups: [
      {
        name: "Jabuticaba",
        players: ["Erik", "Ronaldo", "Armando", "Gustavo"],
      },
      {
        name: "Bergamota",
        players: ["Erik", "Ronaldo", "Armando", "Gustavo"],
      },
      {
        name: "Melancia",
        players: ["Erik", "Ronaldo", "Armando", "Gustavo"],
      },
      {
        name: "Abacaxi",
        players: ["Erik", "Ronaldo", "Armando", "Gustavo"],
      },
    ],
    trivia: false,
    random: false,
  };

  useEffect(() => {
    axios
      .get<Igame[]>(
        "https://qp2tf3ybnh.execute-api.us-east-1.amazonaws.com/dev/games",
        config
      )

      .then((response) => {
        console.log(response.data);
        return setGame(response.data);
      })
      .catch((error) => {
        console.error("Erro na solicitação:", error);
      });
  }, []);

  function matchGame(id: number) {
    console.log("criar game");
    initialData.game = id;
    console.log(initialData);
    axios
      .post(
        "https://qp2tf3ybnh.execute-api.us-east-1.amazonaws.com/dev/matches/start",
        initialData,
        config
      )
      .then((response) => {
        console.log("Resposta:", response.data);
        window.location.href = `/play?id=${response.data.id}`;
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
  return (
    <Container>
        <StyledCardGame>
          {game ? (
            game.map((game) => (
              <div key={game.id} className="game">
                <Card className="text-center">
                  <Card.Header>Meus Jogos</Card.Header>
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>{game.descripition}</Card.Text>
                    <Button onClick={(e) => matchGame(game.id)}>
                      <Title>Jogar</Title>
                      <FaPlay color="white" size="1.8em" />
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Criado por: {game.author.name}
                  </Card.Footer>
                </Card>
              </div>
            ))
          ) : (
            <p>Carregando...</p>
          )}
        </StyledCardGame>
      </Container>
  );
}
