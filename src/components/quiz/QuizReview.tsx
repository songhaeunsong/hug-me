import type { Quiz } from '@/api/quiz';

interface QuizReviewProps {
  quizIndexes: number[];
  quizData: Quiz[];
}

export const QuizReview = ({ quizIndexes, quizData }: QuizReviewProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {quizIndexes.map((idx) => (
        <div key={idx} className="w-full flex flex-col p-3 gap-2 bg-white rounded-xl">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-1">문제 {idx + 1}</span>
            <span className="text-point font-semibold">
              <span className="text-dark">정답</span> {quizData[idx].answer}
            </span>
          </div>
          {quizData[idx].form === 'ox퀴즈' && <span className="text-start font-semibold">{quizData[idx].quiz}</span>}

          {quizData[idx].form === '빈칸퀴즈' && (
            <div className="text-start font-semibold leading-6 [&>*]:align-middle">
              <span>{quizData[idx].quiz.split('*')[0]}</span>
              {Array.from({ length: quizData[idx].quiz.split('*').length - 1 }).map((_, i) => (
                <i key={i} aria-hidden className="inline-block mx-[1px] w-4 h-4 rounded bg-divider-gray" />
              ))}
              <span>{quizData[idx].quiz.split('*').at(-1)}</span>
            </div>
          )}

          <hr />
          <p className="text-start text-gray-2/70">{quizData[idx].commentary}</p>
        </div>
      ))}
    </div>
  );
};
