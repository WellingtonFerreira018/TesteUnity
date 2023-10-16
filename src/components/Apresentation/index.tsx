import { LogoIcon, NameIcon } from "../../assets";
import { Button, Container, Logo, StyledApresentation, Title } from "./styled";
import { FaPlay } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function Apresentation() {

  return (
    <StyledApresentation>
      <Container>
        <Logo>
          <img src={LogoIcon} className="logo-1" alt="Logo" width="60px" />
          <img src={NameIcon} className="logo-2" alt="Name-logo" width="200px" />
        </Logo>
        
        <Link to="/login">
          <Button>
            <Title>Entrar</Title>
            <FaPlay color="white" size="2em" />
          </Button>
        </Link>
      </Container>
    </StyledApresentation>
  )
}
