import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NavBar from "../components/Navbar";
import { StyledCreateGame } from "./styles";
import axios from "axios";
import { useEffect, useState } from "react";

interface Icategory {
  id: number;
  name: string;
}
interface ILanguages {
  id: number;
  name: string;
}

interface FormValues {
  nomeJogo: string;
  descricaoJogo: string;
  linguagem: string;
  categoria: string;
  visibilidade: string;
}

export default function CreateGame() {
  const [categoria, setCategoria] = useState<Icategory[]>([]);
  const [linguagens, setLinguagens] = useState<ILanguages[]>([]);

  const [formValues, setFormValues] = useState<FormValues>({
    nomeJogo: "",
    descricaoJogo: "",
    linguagem: "",
    categoria: "",
    visibilidade: "",
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token,
    },
  };
  useEffect(() => {
    // Função assíncrona para buscar as categorias da API
    async function getCategories() {
      try {
        const response = await axios.get(
          "https://qp2tf3ybnh.execute-api.us-east-1.amazonaws.com/dev/categories",
          config
        );
        setCategoria(response.data);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    }

    async function getLanguages() {
      try {
        const response = await axios.get(
          "https://qp2tf3ybnh.execute-api.us-east-1.amazonaws.com/dev/languages",
          config
        );
        setLinguagens(response.data);
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    }

    // Chame a função para buscar as categorias quando o componente for montado
    getCategories();
    getLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("Game", JSON.stringify(formValues));
    const novoObjeto: FormValues = { ...formValues };
    console.log(novoObjeto);
    window.location.href = `/createQuestions`;
  };

  return (
    <div>
      <NavBar />

      <StyledCreateGame>
        <h1 className="head">Criando o Jogo</h1>

        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nome do Jogo</Form.Label>
              <Form.Control
                placeholder="Digeite aqui o nome do jogo"
                onChange={(e) =>
                  setFormValues({ ...formValues, nomeJogo: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Descricao do Jogo</Form.Label>
              <Form.Control
                placeholder="Digite aqui a descricao do Jogo"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    descricaoJogo: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Linguagens</Form.Label>
                <Form.Select
                  id="linguagens"
                  defaultValue="Escolha..."
                  onChange={(e) =>
                    setFormValues({ ...formValues, linguagem: e.target.value })
                  }
                  required
                >
                  <option>Escolha...</option>
                  {linguagens.map((linguage) => (
                    <option key={linguage.id} value={linguage.id.toString()}>
                      {linguage.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Categoria</Form.Label>
                <Form.Select
                  id="categorias"
                  defaultValue="Escolha..."
                  onChange={(e) =>
                    setFormValues({ ...formValues, categoria: e.target.value })
                  }
                  required
                >
                  <option>Escolha...</option>
                  {categoria.map((category) => (
                    <option key={category.id} value={category.id.toString()}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Visibilidade</Form.Label>
                <Form.Select
                  defaultValue="Escolha..."
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      visibilidade: e.target.value,
                    })
                  }
                  required
                >
                  <option>Escolha...</option>
                  <option value={1}>Publico</option>
                  <option value={0}>Privado</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit" size="lg">
              Criar as Perguntas
            </Button>
          </Form>
        </Container>
      </StyledCreateGame>
    </div>
  );
}
