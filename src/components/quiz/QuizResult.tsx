import { useState } from 'react';

import type { Quiz } from '@/api/quiz';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { QuizReview } from './QuizReview';

interface QuizResult {
  quizData: Quiz[];
  rightQuizes: boolean[];
  resetQuizState: () => void;
}

type ResultStateType = 'RIGHT' | 'WRONG';

export const QuizResult = ({ quizData, rightQuizes, resetQuizState }: QuizResult) => {
  const [resultState, setResultState] = useState<ResultStateType>('WRONG');

  const totalCount = quizData.length;

  const rightQuizIndexes = rightQuizes.flatMap((v, i) => (v ? [i] : []));
  const wrongQuizIndexes = rightQuizes.flatMap((v, i) => (!v ? [i] : []));

  const rightCount = rightQuizIndexes.length;

  return (
    <div className="w-full flex-col flex items-start gap-8">
      <div className="flex flex-col items-start gap-2">
        <span className="text-[24px] font-semibold">
          {totalCount}문제 중 <span className="text-point">{rightCount}문제</span>를 맞혔어요!
        </span>

        <div className="flex">
          <button
            className="border-b-[1.5px] border-gray-1 font-semibold text-[14px] text-gray-1"
            onClick={resetQuizState}
          >
            다른 퀴즈 보기
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full h-[190px]">
        <object data={`/circle-chart/${rightCount}.svg`} />
      </div>
      <div className="flex flex-col w-full gap-2 items-start">
        <div className="flex items-center gap-2 pb-2">
          <Button
            className={cn(
              resultState === 'WRONG' ? 'border-point text-point' : 'border-bgcolor text-gray-1',
              'px-2 py-1 border-b-2 font-semibold text-[18px]',
            )}
            variant="transparent"
            onClick={() => setResultState('WRONG')}
          >
            오답
          </Button>
          <Button
            className={cn(
              resultState === 'RIGHT' ? 'border-point text-point' : 'border-bgcolor text-gray-1',
              'px-2 py-1 border-b-2 font-semibold text-[18px]',
            )}
            variant="transparent"
            onClick={() => setResultState('RIGHT')}
          >
            정답
          </Button>
        </div>
        {resultState === 'WRONG' && <QuizReview quizIndexes={wrongQuizIndexes} quizData={quizData} />}
        {resultState === 'RIGHT' && <QuizReview quizIndexes={rightQuizIndexes} quizData={quizData} />}
      </div>
    </div>
  );
};
