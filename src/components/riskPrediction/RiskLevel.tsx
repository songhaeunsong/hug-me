import type { RiskStepType } from './RiskPredictionResult';
import { RiskProgress } from './RiskPregress';

interface RiskLevelProps {
  isBetterVersion?: boolean;
  riskStep: RiskStepType;
  probability: number;
}
export const RiskLevel = ({ isBetterVersion = false, riskStep, probability }: RiskLevelProps) => {
  return (
    <div className="p-[18px] flex flex-col gap-2 [&>*]:flex [&>*]:items-center [&>*]:gap-2 [&>*]:font-semibold [&>*]:text-[20px]">
      {!isBetterVersion && (
        <>
          {riskStep === 'LOWER' && (
            <div>
              <object data="icons/Smiley.svg" />
              <span>위험도가 낮은 매물이에요!</span>
            </div>
          )}
          {riskStep === 'MIDDLE' && (
            <div>
              <object data="icons/SmileySad-1.svg" />
              <span>주의가 필요한 매물이에요!</span>
            </div>
          )}

          {riskStep === 'UPPER' && (
            <div>
              <object data="icons/SmileySad.svg" />
              <span>위험도가 높은 매물이에요!</span>
            </div>
          )}
        </>
      )}
      {isBetterVersion && <span>위험도가 낮아졌어요!</span>}

      <RiskProgress riskStep={riskStep} value={probability} />
    </div>
  );
};
