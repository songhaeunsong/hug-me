import { useState } from 'react';

import { useGetQuizes } from '@/api/quiz';

import { QuizResult } from './QuizResult';
import { QuizSection } from './QuizSection';

interface QuizInContractProps {
  resetQuizState: () => void;
}

const TOTAL_COUNT = 10;

export const QuizInContract = ({ resetQuizState }: QuizInContractProps) => {
  const { data: quizes, isPending, isError, isFetching } = useGetQuizes('계약중');
  const [rightQuizes, setRightQuizes] = useState(new Array(TOTAL_COUNT).fill(false));

  const [quizInedx, setsetQuizIndex] = useState(0);

  const submitQuizAnswer = (isRight: boolean, index: number) => {
    // 채점
    if (isRight) setRightQuizes((prev) => prev.map((v, i) => (i === index ? true : v)));

    setsetQuizIndex((prev) => prev + 1);
  };

  if (isPending || isFetching) return <>문제를 생성하는 중입니다.</>;
  if (isError) return null;

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
