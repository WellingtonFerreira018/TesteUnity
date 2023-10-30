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
import { useState } from "react";
import axios from "axios";

interface ICardQuestions {
  text: string;
  tip: string;
  answers: string[];
  answer: number;
  time: number;
  img: string;
}

interface FormValues {
  nomeJogo: string;
  descricaoJogo: string;
  linguagem: string;
  categoria: string;
  visibilidade: string;
}

export default function CreateQuestions() {
  const [perguntas, setPerguntas] = useState<ICardQuestions[]>([]);

  const [selectedQuestion, setSelectedQuestion] =
    useState<ICardQuestions | null>(null);

  const [novaPergunta, setNovaPergunta] = useState<ICardQuestions>({
    text: "",
    tip: "",
    answers: ["", "", "", ""],
    answer: 0,
    time: 30,
    img: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [perguntaEmEdicao, setPerguntaEmEdicao] = useState<ICardQuestions>({
    text: "",
    tip: "",
    answers: ["", "", "", ""],
    answer: 0,
    time: 30,
    img: "",
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const formGame = localStorage.getItem("Game");
  const dataGame: FormValues | null = formGame ? JSON.parse(formGame) : null;

  const initialData = {
    language: dataGame?.linguagem,
    category: dataGame?.categoria,
    name: dataGame?.nomeJogo,
    visibility: dataGame?.visibilidade,
    description: dataGame?.descricaoJogo,
    questions: perguntas,
  };

  const saveGame = () => {
    axios
      .post(
        "https://qp2tf3ybnh.execute-api.us-east-1.amazonaws.com/dev/games",
        initialData,
        config
      )
      .then((response) => {
        console.log("jogo salvo", response.data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (
      name === "text" ||
      name === "tip" ||
      name === "time" ||
      name === "img"
    ) {
      setNovaPergunta((prevPergunta) => ({
        ...prevPergunta,
        [name]: value,
      }));
      setPerguntaEmEdicao((prevPergunta) => ({
        ...prevPergunta,
        [name]: value,
      }));
    } else if (name === "answer") {
      // Converte o valor para número (o índice da resposta correta no array)
      const correctAnswerIndex = parseInt(value, 10);
      setNovaPergunta((prevPergunta) => ({
        ...prevPergunta,
        answer: correctAnswerIndex,
      }));
      setPerguntaEmEdicao((prevPergunta) => ({
        ...prevPergunta,
        answer: correctAnswerIndex,
      }));
    } else if (name === "time") {
      const selectedTimeValue = parseInt(value, 10);
      setNovaPergunta((prevPergunta) => ({
        ...prevPergunta,
        time: selectedTimeValue,
      }));
      setPerguntaEmEdicao((prevPergunta) => ({
        ...prevPergunta,
        time: selectedTimeValue,
      }));
    } else {
      const answers = [...novaPergunta.answers];
      if (name === "answerA") answers[0] = value;
      if (name === "answerB") answers[1] = value;
      if (name === "answerC") answers[2] = value;
      if (name === "answerD") answers[3] = value;

      setNovaPergunta((prevPergunta) => ({
        ...prevPergunta,
        answers: answers,
      }));
      setPerguntaEmEdicao((prevPergunta) => ({
        ...prevPergunta,
        answers: answers,
      }));
    }
  };

  const handleSavePergunta = () => {
    if (isValidPergunta(novaPergunta)) {
      setPerguntas([...perguntas, novaPergunta]);
      setNovaPergunta({
        text: "",
        tip: "",
        answers: ["", "", "", ""],
        answer: 0,
        time: 30,
        img: "",
      });
    }
  };

  const updateQuestion = () => {
    if (!selectedQuestion) {
      return;
    }

    const questionIndex = perguntas.findIndex(
      (question) => question === selectedQuestion
    );
    if (questionIndex !== -1) {
      const updatedQuestions = perguntas.map((question, index) => {
        if (index === questionIndex) {
          // Atualiza apenas a pergunta selecionada
          return novaPergunta;
        }
        return question; // Mantém as outras perguntas inalteradas
      });

      setPerguntas(updatedQuestions);
    }

    // Limpar os estados após a atualização da pergunta
    clearFormFields();
    setSelectedQuestion(null);
  };

  const clearFormFields = () => {
    setNovaPergunta({
      text: "",
      tip: "",
      answers: ["", "", "", ""],
      answer: 0,
      time: 30,
      img: "",
    });
    setPerguntaEmEdicao({
      text: "",
      tip: "",
      answers: ["", "", "", ""],
      answer: 0,
      time: 30,
      img: "",
    });
  };

  const handleSaveChanges = () => {
    if (selectedQuestion) {
      // console.log("Pergunta selecionada para atualização:", selectedQuestion);
      // console.log("Nova pergunta para atualização:", perguntaEmEdicao);
      updateQuestion();
      clearFormFields();
      // Limpe a pergunta selecionada após salvar as alterações
      setSelectedQuestion(null);
    }
  };

  const adicionarPergunta = () => {
    const novaPergunta: ICardQuestions = {
      text: "",
      tip: "",
      answers: ["", "", "", ""],
      answer: 0,
      time: 60,
      img: "",
    };
    setPerguntas([...perguntas, novaPergunta]);
    setSelectedQuestion(null);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = [...perguntas];
    updatedQuestions.splice(index, 1);
    setPerguntas(updatedQuestions);
  };

  const handleQuestionClick = (index: number) => {
    const clickedQuestion = perguntas[index];
    setSelectedQuestion(clickedQuestion);
    setNovaPergunta({ ...clickedQuestion });
    setPerguntaEmEdicao({ ...clickedQuestion });
  };

  const isValidPergunta = (pergunta: ICardQuestions) => {
    if (!pergunta.text.trim()) {
      alert("Por favor, preencha o texto da pergunta.");
      return false;
    }

    if (!pergunta.answers.every((answer) => answer.trim())) {
      alert("Por favor, preencha as resposta.");
      return false;
    }
    if (pergunta.answer < 0 || pergunta.answer > 3) {
      alert("Por favor, selecione uma resposta correta.");
      return false;
    }

    return true;
  };

  return (
    <div>
      <NavBar />

      <StyledCreateGame>
        <Row>
          <Col xs={2}>
            {perguntas.map((pergunta, index) => (
              <div
                key={index}
                onClick={() => handleQuestionClick(index)}
                className={
                  selectedQuestion === pergunta ? "selected-question" : ""
                }
              >
                <div className="card-question">
                  <div>Pergunta {index + 1}</div>
                  <div>{pergunta.text}</div>
                </div>
                <button onClick={() => handleDeleteQuestion(index)}>
                  Excluir
                </button>
              </div>
            ))}
            <button onClick={adicionarPergunta}>Nova pergunta</button>
          </Col>
          <Col>
            <Container>
              <h2>Crie sua pergunta</h2>
              <hr />
              <button onClick={() => saveGame()}>Salvar o Jogo</button>
              <form>
                <div>
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Texto da questão"
                  >
                    <Form.Control
                      required
                      as="textarea"
                      placeholder="Leave a comment here"
                      name="text"
                      style={{ height: "100px", marginBottom: "10px" }}
                      value={novaPergunta.text || selectedQuestion?.text || ""}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </FloatingLabel>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Dica para a pergunta</Form.Label>
                    <Form.Control
                      name="tip"
                      placeholder="é opcional"
                      style={{ marginBottom: "20px" }}
                      value={novaPergunta.tip || selectedQuestion?.tip || ""}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>
                </div>
                <div>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="answerA">
                      <Form.Label>Resposta A</Form.Label>
                      <Form.Control
                        name="answerA"
                        value={
                          novaPergunta.answers[0] ||
                          selectedQuestion?.answers[0] ||
                          ""
                        }
                        onChange={(e) => handleInputChange(e)}
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="answerB">
                      <Form.Label>Resposta B</Form.Label>
                      <Form.Control
                        name="answerB"
                        value={
                          novaPergunta.answers[1] ||
                          selectedQuestion?.answers[1] ||
                          ""
                        }
                        onChange={(e) => handleInputChange(e)}
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="answerC">
                      <Form.Label>Resposta C</Form.Label>
                      <Form.Control
                        name="answerC"
                        value={
                          novaPergunta.answers[2] ||
                          selectedQuestion?.answers[2] ||
                          ""
                        }
                        onChange={(e) => handleInputChange(e)}
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="answerD">
                      <Form.Label>Resposta D</Form.Label>
                      <Form.Control
                        name="answerD"
                        value={
                          novaPergunta.answers[3] ||
                          selectedQuestion?.answers[3] ||
                          ""
                        }
                        onChange={(e) => handleInputChange(e)}
                        required={true}
                      />
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
                          id="formHorizontalRadios1"
                          name="answer"
                          value="0"
                          checked={
                            novaPergunta.answer === 0 ||
                            selectedQuestion?.answer === 0
                          }
                          onChange={(e) => handleInputChange(e)}
                        />
                        <Form.Check
                          type="radio"
                          label="Resposta B"
                          id="formHorizontalRadios2"
                          name="answer"
                          value="1"
                          checked={
                            novaPergunta.answer === 1 ||
                            selectedQuestion?.answer === 1
                          }
                          onChange={(e) => handleInputChange(e)}
                        />
                        <Form.Check
                          type="radio"
                          label="Resposta C"
                          id="formHorizontalRadios3"
                          name="answer"
                          value="2"
                          checked={
                            novaPergunta.answer === 2 ||
                            selectedQuestion?.answer === 2
                          }
                          onChange={(e) => handleInputChange(e)}
                        />
                        <Form.Check
                          type="radio"
                          label="Resposta D"
                          id="formHorizontalRadios4"
                          name="answer"
                          value="3"
                          checked={
                            novaPergunta.answer === 3 ||
                            selectedQuestion?.answer === 3
                          }
                          onChange={(e) => handleInputChange(e)}
                        />
                      </Col>
                    </Form.Group>
                  </fieldset>
                </div>

                <div>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Tempo da Pergunta</Form.Label>
                    <Form.Select
                      name="time"
                      value={
                        novaPergunta.time.toString() ||
                        selectedQuestion?.time.toString() ||
                        ""
                      }
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value={30}>30 segundos</option>
                      <option value={40}>40 segundos</option>
                      <option value={50}>50 segundos</option>
                      <option value={60}>1 minuto</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className=" gap-2 pt-2">
                  {!selectedQuestion && (
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      onClick={handleSavePergunta}
                    >
                      Salvar pergunta
                    </Button>
                  )}
                  {selectedQuestion && (
                    <Button
                      type="submit"
                      variant="warning"
                      size="lg"
                      onClick={handleSaveChanges}
                    >
                      Salvar Alterações
                    </Button>
                  )}
                </div>
              </form>
            </Container>
          </Col>
        </Row>
      </StyledCreateGame>
    </div>
  );
}
