import { useState } from 'react';

import type { PrecautionMenuType } from '@/components/home/PrecautionList';
import { QuizAfterContract } from '@/components/quiz/QuizAfterContract';
import { QuizBeforeContract } from '@/components/quiz/QuizBeforeContract';
import { QuizInContract } from '@/components/quiz/QuizInContract';

export const Quiz = () => {
  const [quizState, setQuizState] = useState<PrecautionMenuType | null>(null);

  const handleClickQuizState = (state: PrecautionMenuType) => {
    setQuizState(state);
  };

  const resetQuizState = () => {
    setQuizState(null);
  };

  return (
    <div className="flex flex-col h-full justify-between pt-12 pb-28 px-4">
      {quizState === null && (
        <>
          <span className="text-[24px] font-semibold">퀴즈를 통해 어떤 정보를 확인하고 싶으신가요?</span>
          <div className="flex flex-col gap-2 w-full [&>*]:py-[37px] [&>*]:px-4 [&>*]:w-full [&>*]:text-[20px] [&>*]:text-start [&>*]:bg-white [&>*]:rounded-2xl [&>*]:cursor-pointer [&>*]:hover:drop-shadow-lg">
            <button onClick={() => handleClickQuizState('BEFORE_CONTRACT')}>계약 전 주의사항</button>
            <button onClick={() => handleClickQuizState('IN_CONTRACT')}>계약 중 주의사항</button>
            <button onClick={() => handleClickQuizState('ATFER_CONTRACT')}>계약 후 주의사항</button>
          </div>
        </>
      )}

      {quizState === 'BEFORE_CONTRACT' && <QuizBeforeContract resetQuizState={resetQuizState} />}
      {quizState === 'IN_CONTRACT' && <QuizInContract resetQuizState={resetQuizState} />}
      {quizState === 'ATFER_CONTRACT' && <QuizAfterContract resetQuizState={resetQuizState} />}
    </div>
  );
};
