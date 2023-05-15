import styled from "styled-components";

export const StyledApresentation = styled.div`
   
`;

export const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%; 
    box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
    border-radius: 5px;
`;

export const Logo = styled.div`
    justify-content: center;
    padding-left: 30%;
    padding-top: 5%;

    .logo-1{
        padding-right: 3%;
    }
`;

export const Button = styled.div`
    position: absolute;
    top: 50%;
    left: 10%;
    width: 80%;
    height: 20%;
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
    font-size: 60px;
    font-weight: bold;
    padding-right: 5%;
`;