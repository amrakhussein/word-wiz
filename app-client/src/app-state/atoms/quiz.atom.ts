import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { TIME_IN_SECONDS } from '../../components/quiz/quiz.constants';
import { Question, SelectedAnswer } from '../../types';

export const questionIndexAtom = atomWithStorage<number>('question-index', 0);
export const questionsAtom = atomWithStorage<Question[]>('questions', []);

export const currentQuestionAtom = atom<Question>((get) => {
  const questions = get(questionsAtom);
  const questionIndex = get(questionIndexAtom);
  return questions[questionIndex] as Question;
});

export const questionsCountAtom = atom((get) => get(questionsAtom).length);

export const selectedAnswerAtom = atomWithStorage('selected-answer', '');
export const selectedAllAnswersAtom = atomWithStorage<SelectedAnswer[]>(
  'selected-answers',
  [],
);
export const isSelectedCorrectAtom = atom(
  (get) =>
    get(selectedAnswerAtom).trim() === get(currentQuestionAtom)?.answer.trim(),
);

export const questionNumberAtom = atom((get) => get(questionIndexAtom) + 1);

export const incrementSubmittedAnswersAtom = atomWithStorage(
  'increment-submitted-answer',
  0,
);

export const quizHasResolvedAtom = atom(
  (get) => get(questionsCountAtom) === get(incrementSubmittedAnswersAtom),
);

export const quizPausedAtom = atomWithStorage('quiz-paused', false);
export const quizAbortedAtom = atomWithStorage('quiz-aborted', false);
export const quizStartedAtom = atomWithStorage('quiz-started', false);

export const timeRemainingAtom = atomWithStorage(
  'time-remaining',
  TIME_IN_SECONDS,
);

export const hasQuestionTimeOverAtom = atom(
  (get) => get(timeRemainingAtom) === 0,
);

export const userPointsAtom = atomWithStorage('user-points', 0);
export const hasQuizResolvedAtom = atomWithStorage('quiz-completed', false);

// for submit btn - last question
export const shouldUserSubmitQuizAtom = atom(
  (get) => get(incrementSubmittedAnswersAtom) === get(questionsCountAtom) - 1,
);

export const userReloadedPageAtom = atom(false);
