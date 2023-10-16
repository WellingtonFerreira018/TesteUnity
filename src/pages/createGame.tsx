import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import NavBar from "../components/Navbar";
import { StyledCreateGame } from "./styles";
import CardQuestions from "../components/Card/Cardquestions";
import { useState } from "react";

interface ICardQuestions {
  text: string;
  tip: string;
  answers: string[];
  answer: number;
  time: number;
  img: string;
}

export default function CreateGame() {
  const [perguntas, setPerguntas] = useState<ICardQuestions[]>([]);

  const adicionarPergunta = () => {
    const novaPergunta: ICardQuestions = {
      text: "nova questao",
      tip: "",
      answers: ["", "", "", ""],
      answer: 0,
      time: 60,
      img: "",
    };
    setPerguntas([...perguntas, novaPergunta]);
  };

  console.log(perguntas)

  return (
    <div>
      <NavBar />

      <StyledCreateGame>
        <Row>
          <Col xs={2}>
            {perguntas.map((pergunta, index) => (
              <CardQuestions key={index} num={index} text={pergunta.text} />
            ))}
            <button onClick={adicionarPergunta}>Nova pergunta</button>
          </Col>
          <Col>
            <Container>
              <h2>Crie sua pergunta</h2>
              <hr />

              <div>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Texto da questão"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px", marginBottom: "10px" }}
                  />
                </FloatingLabel>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Dica para a pergunta</Form.Label>
                  <Form.Control
                    placeholder="é opcional"
                    style={{ marginBottom: "20px" }}
                  />
                </Form.Group>
              </div>
              <div>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Resposta A</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Resposta B</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Resposta C</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Resposta D</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Row>
              </div>

              <div>
                <fieldset>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                      Resposta correta:
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Resposta A"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                      />
                      <Form.Check
                        type="radio"
                        label="Resposta B"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                      />
                      <Form.Check
                        type="radio"
                        label="Resposta C"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                      />
                      <Form.Check
                        type="radio"
                        label="Resposta D"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
              </div>

              <div>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Tempo da Pergunta</Form.Label>
                  <Form.Select defaultValue="30 segundos">
                    <option>30 segundos</option>
                    <option>40 segundos</option>
                    <option>50 segundos</option>
                    <option>1 minuto</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="d-grid gap-2 pt-2">
                <Button variant="primary" size="lg">
                  Salvar a pergunta
                </Button>
              </div>
            </Container>
          </Col>
        </Row>
      </StyledCreateGame>
    </div>
  );
}
