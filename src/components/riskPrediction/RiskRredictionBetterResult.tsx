import { useEffect, useState } from 'react';

import { type RiskPredictionCondition, usePostBetterRisk } from '@/api/riskPrediction';

import { ErrorComponent } from '../common/ErrorComponent';
import { Spinner } from '../common/Spinner';
import { RiskPredictionDetailSection } from './RiskPredictionDetailSection';
import type { RiskStepType } from './RiskPredictionResult';
import { type RiskPredictionConditionKey } from './riskPredictonContants';

interface RiskPredictionBetterResultProps {
  riskPredictionCondition: RiskPredictionCondition;
}

interface RecommendationCondition {
  percentage: string;
  result: number;
}

export interface Recommendation {
  usefulConditions: Partial<Record<RiskPredictionConditionKey, RecommendationCondition>>;
  betterRiskStep: RiskStepType;
  betterRiskPercentage: number;
}

export type UsefulConditionType = Partial<Record<RiskPredictionConditionKey, RecommendationCondition>>;

export const RiskPredictionBetterResult = ({ riskPredictionCondition }: RiskPredictionBetterResultProps) => {
  const postBetterRisk = usePostBetterRisk();

  const [isLoading, setIsLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  useEffect(() => {
    postBetterRisk(riskPredictionCondition, {
      onSuccess: (data) => {
        let riskStep: RiskStepType = 'NONE';
        const percentage = data.recommendation.probability;

        if (percentage <= 40) riskStep = 'LOWER';
        else if (percentage <= 70) riskStep = 'MIDDLE';
        else if (percentage <= 100) riskStep = 'UPPER';

        const newUsefulConditions: UsefulConditionType = {};

        if (data.recommendation.주택가액.isUseful) {
          const recommendationCondition = data.recommendation.주택가액;

          newUsefulConditions['housePrice'] = {
            percentage: `${Math.floor(recommendationCondition.result)}%`,
            result: recommendationCondition.newResult,
          };
        }

        if (data.recommendation.임대보증금액.isUseful) {
          const recommendationCondition = data.recommendation.임대보증금액;

          newUsefulConditions['depositAmount'] = {
            percentage: `${Math.floor(recommendationCondition.result)}%`,
            result: recommendationCondition.newResult,
          };
        }

        if (data.recommendation.선순위.isUseful) {
          const recommendationCondition = data.recommendation.선순위;

          newUsefulConditions['seniority'] = {
            percentage: `${Math.floor(recommendationCondition.result)}%`,
            result: recommendationCondition.newResult,
          };
        }

        console.log(riskStep, percentage);
        setRecommendation({
          usefulConditions: newUsefulConditions,
          betterRiskStep: riskStep,
          betterRiskPercentage: percentage,
        });

        setIsLoading(false);
      },
    });
  }, [riskPredictionCondition]);

  if (isLoading)
    return (
      <div className="h-[450px]">
        <Spinner text="개선 사항을 분석중이에요!" />
      </div>
    );

  if (recommendation === null)
    return (
      <div className="h-[450px]">
        <ErrorComponent goBackLink="/" />
      </div>
    );

  return <RiskPredictionDetailSection data={riskPredictionCondition} recommendation={recommendation} />;
};
