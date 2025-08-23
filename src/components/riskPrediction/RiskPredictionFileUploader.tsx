import { RiskPredictionOCR } from './RiskPredictionOCR';

interface RiskPredictionFileUploaderProps {
  handleSubmitContractData: (depositAmount: number, region: string) => void;
}
export const RiskPredictionFileUploader = ({ handleSubmitContractData }: RiskPredictionFileUploaderProps) => {
  return (
    <div className="flex flex-col h-full pt-12 pb-28 px-4 gap-12">
      <p className="text-[24px] font-bold text-start wrap-words">
        자동 인식을 위해 <span className="text-point">전세 계약서</span>를 업로드해주세요!
      </p>

      <RiskPredictionOCR handleSubmitContractData={handleSubmitContractData} />
    </div>
  );
};
