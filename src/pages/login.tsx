import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

interface Ilogin {
  email?: string;
  password?: string;
  token?: string;
}

export default function Login() {
  const [user, setUser] = useState<Ilogin | undefined>();

  const initialData = {
    email: user?.email,
    password: user?.password,
  };

  function userLogin() {
    console.log(user);
    axios
      .post(
        "https://qp2tf3ybnh.execute-api.us-east-1.amazonaws.com/dev/login",
        initialData
      )
      .then((response) => {
        console.log("Resposta:", response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/games";
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
  return (
    <>
      <Container>
        <div>
          <h1>Login</h1>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>
        </Form>
        <Button onClick={(e) => userLogin()}>Entrar</Button>
      </Container>
    </>
  );
}
