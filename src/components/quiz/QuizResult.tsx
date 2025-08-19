import type { Quiz } from '@/api/quiz';

interface QuizResult {
  quizData: Quiz[];
  rightQuizes: boolean[];
  resetQuizState: () => void;
}

export const QuizResult = ({ quizData, rightQuizes, resetQuizState }: QuizResult) => {
  const totalCount = quizData.length;
  const wrongQuizIndexes = rightQuizes.flatMap((v, i) => (!v ? [i] : []));
  const rightCount = totalCount - wrongQuizIndexes.length;

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
        <span className="text-start font-semibold">오답노트</span>
        <div className="w-full flex flex-col gap-4">
          {wrongQuizIndexes.map((idx) => (
            <div key={idx} className="w-full flex flex-col p-3 gap-2 bg-white rounded-xl">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-1">문제 {idx + 1}</span>
                <span className="font-semibold text-point">
                  <span className="font-normal">정답</span> {quizData[idx].answer}
                </span>
              </div>
              <p className="text-start">
                <span className="text-gray-2/40">{'해설) '}</span>
                {quizData[idx].commentary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
