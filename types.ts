
export enum Choice {
  Rock = 'rock',
  Paper = 'paper',
  Scissors = 'scissors',
}

export enum Result {
  Win = 'win',
  Lose = 'lose',
  Draw = 'draw',
}

export interface ChoiceData {
  name: Choice;
  icon: JSX.Element;
  color: string;
}
