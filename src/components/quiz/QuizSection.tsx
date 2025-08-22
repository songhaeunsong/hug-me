import { type ChangeEvent, type FormEventHandler, useState } from 'react';

import type { Quiz, QuizForm } from '@/api/quiz';

import { Button } from '../ui/button';

interface QuizSectionProps {
  quizData: Quiz;
  totalCount: number;
  quizIndex: number;
  submitQuizAnswer: (isRight: boolean, index: number) => void;
}

interface QuizFormValue {
  type: 'blink' | 'ox';
  label: string;
}

const QUIZ_FORM: Record<QuizForm, QuizFormValue> = {
  빈칸퀴즈: { type: 'blink', label: '빈칸 퀴즈' },
  ox퀴즈: { type: 'ox', label: 'O/X퀴즈' },
};

export const QuizSection = ({ quizData, totalCount, quizIndex, submitQuizAnswer }: QuizSectionProps) => {
  const [blinkAnswer, setBlinkAnswer] = useState('');

  const handleClickBlinkNext: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (blinkAnswer.length === 0) return;

    submitQuizAnswer(quizData.answer === blinkAnswer, quizIndex);
    setBlinkAnswer('');
  };

  const handleClickOXNext = (oxAnswer: string) => {
    submitQuizAnswer(quizData.answer === oxAnswer, quizIndex);
  };
  if (QUIZ_FORM[quizData.form].type === 'blink') {
    const quizPieces = quizData.quiz.split('*');

    return (
      <div className="w-full h-full flex flex-col gap-8 justify-between px-3 pb-28">
        <div className="flex flex-col items-start gap-1 ">
          <span className="text-[14px] font-semibold text-gray-1">{QUIZ_FORM[quizData.form].label}</span>
          <div className="text-[24px] font-semibold text-start leading-8 [&>*]:align-middle">
            <span>{quizPieces[0]}</span>
            {Array.from({ length: quizPieces.length - 1 }).map((_, i) => (
              <i key={i} aria-hidden className="inline-block mx-[2px] w-6 h-6 rounded bg-divider-gray" />
            ))}
            <span>{quizPieces.at(-1)}</span>
          </div>
          <div className="[&>*]:text-[14px] [&>*]:font-semibold">
            <span className="text-dark">{quizIndex + 1}</span>
            <span className="text-gray-1">/{totalCount}</span>
          </div>
        </div>

        <form onSubmit={handleClickBlinkNext} className="w-full flex items-center gap-2">
          <input
            placeholder="정답을 입력해주세요."
            className="flex-1 p-1 border-b-1 border-gray-1 text-[20px] text-dark placeholder:text-gray-1 text-start outline-none"
            type="text"
            autoFocus
            value={blinkAnswer}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBlinkAnswer(e.target.value)}
            maxLength={quizData.answer.length}
          />
          <Button type="submit" className="bg-dark">
            다음
          </Button>
        </form>
      </div>
    );
  }

  if (QUIZ_FORM[quizData.form].type === 'ox') {
    return (
      <div className="w-full h-full flex flex-col gap-8 justify-between px-3 pb-28">
        <div className="flex flex-col items-start gap-1 ">
          <span className="text-[14px] font-semibold text-gray-1">{QUIZ_FORM[quizData.form].label}</span>
          <span className="text-[24px] font-semibold text-start">{quizData.quiz}</span>
          <div className="[&>*]:text-[14px] [&>*]:font-semibold">
            <span className="text-dark">{quizIndex + 1}</span>
            <span className="text-gray-1">/{totalCount}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full h-[150px] [&>*]:rounded-2xl">
          <button className="bg-green-1" onClick={() => handleClickOXNext('O')}>
            <object className="pointer-events-none m-auto" data="icons/circle.svg" />
          </button>
          <button className="bg-point-2" onClick={() => handleClickOXNext('X')}>
            <object className="pointer-events-none bg-point-2  m-auto" data="icons/close.svg" />
          </button>
        </div>
      </div>
    );
  }
};
