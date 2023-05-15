import { LogoIcon, NameIcon } from "../../assets";
import { Button, Container, Logo, StyledApresentation, Title } from "./styled";
import { FaPlay } from 'react-icons/fa';
import { Link } from "react-router-dom"
import getGame from "../../api/game.api";

export default function Apresentation() {
  
  // const [game, setGame] = useState<Igame>();

  async function chamaGame(id:string) {
    const data = await getGame(id);
    // setGame(data);
    console.log(data);
  }
  

  return (
    <StyledApresentation>
      <Container>
        <Logo>
          <img src={LogoIcon} className="logo-1" alt="Logo" width="60px" />
          <img src={NameIcon} className="logo-2" alt="Name-logo" width="200px" />
        </Logo>

        <Link to="/games">
          <Button onClick={(e) => chamaGame("92")}>
            <Title>Jogar</Title>
            <FaPlay color="white" size="2em" />
          </Button>
        </Link>
      </Container>
    </StyledApresentation>
  )
}
