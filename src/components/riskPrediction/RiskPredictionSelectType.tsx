import type { RiskPredictionType } from '@/pages/RiskPrediction';

interface RiskPredictionSelectTypeProps {
  handleSelectType: (selectType: RiskPredictionType) => void;
}

export const RiskPredictionSelectType = ({ handleSelectType }: RiskPredictionSelectTypeProps) => {
  return (
    <div className="flex flex-col justify-between h-full pt-12 pb-28 px-4 gap-12">
      <p className="text-[24px] font-bold text-start wrap-words">위험도 분석 방식을 선택해주세요.</p>

      <div
        className="grid grid-rows-2 gap-4 w-full [&>*]:rounded-2xl p-8
      [&>*]:hover:border-point/40 [&>*]:hover:drop-shadow-glow [&>*]:hover:bg-point-hover [&>*]:hover:text-point"
      >
        <button
          className="bg-white text-[20px] font-semibold p-4 hover:bg-green-1/10"
          onClick={() => handleSelectType('AUTO')}
        >
          <span>자동 인식</span>
        </button>
        <button
          className="bg-white text-[20px] font-semibold p-4 hover:bg-point-2/10"
          onClick={() => handleSelectType('INSERT')}
        >
          <span>직접 입력</span>
        </button>
      </div>
    </div>
  );
};
