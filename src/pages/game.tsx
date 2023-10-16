import {Container, Tab, Tabs } from "react-bootstrap";
import Community from "./community";
import NavBar from "../components/Navbar";
import Mygames from "./mygames";

export default function PageGame() {
  return (
    <Container>
      <NavBar/>
      <h1 style={{marginTop: "60px"}}>Jogos</h1>
      <Tabs
      defaultActiveKey="mygames"
      id="uncontrolled-tab-example"
      className="mb-3"
      >
      <Tab eventKey="mygames" title="Meus Jogos">
        <Mygames/>
      </Tab>
      <Tab eventKey="gamecommunity" title="Jogos da Comunidade">
        <Community/>
      </Tab>
    </Tabs>
    </Container>
  );
}
