import { useState } from 'react';

import { useGetQuizes } from '@/api/quiz';

import { ErrorComponent } from '../common/ErrorComponent';
import { Spinner } from '../common/Spinner';
import { QuizResult } from './QuizResult';
import { QuizSection } from './QuizSection';

interface QuizBeforeContractProps {
  resetQuizState: () => void;
}

const TOTAL_COUNT = 10;

export const QuizBeforeContract = ({ resetQuizState }: QuizBeforeContractProps) => {
  const { data: quizes, isPending, isError, isFetching } = useGetQuizes('계약전');
  const [rightQuizes, setRightQuizes] = useState(new Array(TOTAL_COUNT).fill(false));

  const [quizInedx, setsetQuizIndex] = useState(0);

  const submitQuizAnswer = (isRight: boolean, index: number) => {
    if (isRight) setRightQuizes((prev) => prev.map((v, i) => (i === index ? true : v)));

    setsetQuizIndex((prev) => prev + 1);
  };

  if (isPending || isFetching) return <Spinner text="문제를 생성중이에요!" />;
  if (isError) return <ErrorComponent goBackLink="/" />;

  if (quizInedx < TOTAL_COUNT)
    return (
      <QuizSection
        quizData={quizes[quizInedx]}
        totalCount={TOTAL_COUNT}
        quizIndex={quizInedx}
        submitQuizAnswer={submitQuizAnswer}
      />
    );

  return <QuizResult quizData={quizes} rightQuizes={rightQuizes} resetQuizState={resetQuizState} />;
};
