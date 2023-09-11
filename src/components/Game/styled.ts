import styled from "styled-components";

export const StyledGame = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;

  .loading {
    padding: 0;
    margin: 0;
    display: flex;
    position: absolute;
    top: 40%;
    font-size: 1.5vw;
  }
  .game{
    width: 100%;
    height: 100%;
    border: 2px solid red
  }
`;
