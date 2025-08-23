import { formatDateKR } from '@/utils/formatDateKR';
import { formatMoneyKRW } from '@/utils/formatMoneyKRW';

import { RiskLevel } from './RiskLevel';
import {
  RISK_PREDICTION_CONDITION_MAP,
  type RiskPredictionConditionKey,
  type RiskPredictionDetailKey,
} from './riskPredictonContants';
import type { Recommendation } from './RiskRredictionBetterResult';

interface DetailSectionPieceProps {
  pieceKey: RiskPredictionDetailKey;
  percentage?: string;
  value: string;
}

interface RiskPredictionDetailSectionProps {
  recommendation?: Recommendation;
  data: Record<RiskPredictionDetailKey, number | string>;
}

const DetailSectionPiece = ({ pieceKey, value }: DetailSectionPieceProps) => {
  return (
    <div className="flex items-center justify-between">
      <span>{RISK_PREDICTION_CONDITION_MAP[pieceKey]}</span>
      <span>{value}</span>
    </div>
  );
};

const DetailSectionUsefulPiece = ({ pieceKey, percentage, value }: DetailSectionPieceProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-point">{RISK_PREDICTION_CONDITION_MAP[pieceKey]}</span>
      <div className="flex items-center gap-1">
        <span className="text-point">{percentage}</span>
        <span className="text-dark">{value}</span>
      </div>
    </div>
  );
};

export const RiskPredictionDetailSection = ({ recommendation, data }: RiskPredictionDetailSectionProps) => {
  const isBetterVersion = recommendation !== undefined;

  const usefulConditionKeys = isBetterVersion
    ? (Object.keys(recommendation.usefulConditions) as RiskPredictionConditionKey[])
    : [];
  const usefulConditions = usefulConditionKeys.map((conditionKey) => RISK_PREDICTION_CONDITION_MAP[conditionKey]);

  const { year: startYear, month: startMonth } = formatDateKR(+data.guaranteeStartMonth);
  const { year: endYear, month: endMonth } = formatDateKR(+data.guaranteeEndMonth);

  return (
    <div className="rounded-2xl w-full">
      {isBetterVersion && (
        <>
          <div className="flex flex-col items-start w-full p-[20px] gap-2">
            <span className="text-[20px] font-semibold text-start wrap-words">
              <span className="text-point">{usefulConditions.join(', ')}</span>을 변경하면 위험도가 낮아져요!
            </span>
          </div>

          <hr />
        </>
      )}
      <div className="w-full flex flex-col gap-3 font-semibold text-[16px] p-[20px]">
        <span className="text-start">상세정보</span>
        <div className="text-gray-2 flex flex-col gap-3">
          {isBetterVersion && recommendation.usefulConditions.housePrice ? (
            <DetailSectionUsefulPiece
              pieceKey={'housePrice'}
              percentage={recommendation.usefulConditions.housePrice.percentage}
              value={formatMoneyKRW(recommendation.usefulConditions.housePrice.result)}
            />
          ) : (
            <DetailSectionPiece pieceKey={'housePrice'} value={formatMoneyKRW(+data.housePrice)} />
          )}

          {isBetterVersion && recommendation.usefulConditions.depositAmount ? (
            <DetailSectionUsefulPiece
              pieceKey="depositAmount"
              percentage={recommendation.usefulConditions.depositAmount.percentage}
              value={formatMoneyKRW(recommendation.usefulConditions.depositAmount.result)}
            />
          ) : (
            <DetailSectionPiece pieceKey="depositAmount" value={formatMoneyKRW(+data.depositAmount)} />
          )}

          {isBetterVersion && recommendation.usefulConditions.seniority ? (
            <DetailSectionUsefulPiece
              pieceKey="seniority"
              percentage={recommendation.usefulConditions.seniority.percentage}
              value={formatMoneyKRW(recommendation.usefulConditions.seniority.result)}
            />
          ) : (
            <DetailSectionPiece pieceKey="seniority" value={formatMoneyKRW(+data.seniority)} />
          )}

          <DetailSectionPiece pieceKey="region" value={data.region.toString()} />

          <DetailSectionPiece pieceKey="houseType" value={data.houseType.toString()} />

          <DetailSectionPiece pieceKey="guaranteeStartMonth" value={`${startYear}년 ${startMonth}월`} />

          <DetailSectionPiece pieceKey="guaranteeEndMonth" value={`${endYear}년 ${endMonth}월`} />
        </div>
      </div>
      {isBetterVersion && (
        <RiskLevel
          isBetterVersion={true}
          riskStep={recommendation.betterRiskStep}
          probability={recommendation.betterRiskPercentage}
        />
      )}
    </div>
  );
};
