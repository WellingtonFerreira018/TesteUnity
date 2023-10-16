import styled from "styled-components";

export const StyledCardGame = styled.div`
    margin: 10px;

    .game{
        margin-bottom: 5%;
    }
`;

export const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40%;
    left: 50%;
    width: 20%;
    height: 30%;
    background-color: #fb5607;
    color: white;
    text-align: center;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
    animation: pulsate 2s ease-in-out infinite;

    @keyframes pulsate {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
`;

export const Title = styled.div`
    display: inline-block;
    position: relative;
    top: -20%;
    font-size: 1.8vw;
    font-weight: bold;
    padding-right: 5%;
`;


export const StyledCreateGame = styled.div`
    padding-top: 5%;
    overflow-x: hidden;
`;