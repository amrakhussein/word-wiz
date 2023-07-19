export type Question = {
  question: string;
  options: Option[];
  answer: Option;
};
export type Option = 'noun' | 'verb' | 'adjective' | 'adverb';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  // eslint-disable-next-line react/require-default-props
  specialProp?: string;
}

// export type UserSelectedAnswer = {
//   question: string;
//   selectedOption: string | Option;
//   correctAnswer: string | Option;
//   isCorrect: boolean;
// };

export type SelectedAnswer = {
  selectedAnswer: string;
  questionIndex: number;
};

export type QuizFeedback = {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};
