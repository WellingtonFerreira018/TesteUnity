import { StyledCard } from "./styles";

interface ICardQuestions {
  text: string;
  num: number;
  tip?: string;
  answers?: string[];
  answer?: number;
  time?: number;
  img?: string;
}
export default function CardQuestions(props: ICardQuestions) {
  const { text, num } = props;
  return (
    <StyledCard>
        <div>{num}</div>
      <div>{text}</div>
    </StyledCard>
  );
}
