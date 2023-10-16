import { Button, Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">E-BATTLE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Nav.Link href="/games">Jogar</Nav.Link>
            <Nav.Link href="">Tutoriais</Nav.Link>
            <Nav.Link href="">Sobre</Nav.Link>
            <Nav.Link href="/create">Criar game</Nav.Link>
          </Nav>
          <Button href="/login" className="d-flex" variant="warning">
            Entrar
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
