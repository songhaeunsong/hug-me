import { useEffect, useState } from 'react';

import {
  type PostRiskPredictionResponse,
  type RiskPredictionCondition,
  usePostRiskPrediction,
} from '@/api/riskPrediction';
import { BottomButtonLayout } from '@/layouts/BottomButtonLayout';

import { Button } from '../ui/button';
import { RiskLevel } from './RiskLevel';
import { RiskPredictionDetailSection } from './RiskPredictionDetailSection';
import { RISK_PREDICTION_DETAIL_FAKE_DATA, USEFUL_CONDITION_FAKE_DATA } from './riskPredictonContants';
import { RiskPredictionBetterResult } from './RiskRredictionBetterResult';

interface RiskPredictionResultProps {
  riskPredictionCondition: RiskPredictionCondition;
  handleCloseResult: () => void;
}

export type RiskStepType = 'LOWER' | 'MIDDLE' | 'UPPER' | 'NONE';

export const RiskPredictionResult = ({ riskPredictionCondition, handleCloseResult }: RiskPredictionResultProps) => {
  const postRiskPrediction = usePostRiskPrediction();

  const [risk, setRisk] = useState<PostRiskPredictionResponse | null>(null);
  const [isOpenBetterResult, setIsOpenBetterResult] = useState(false);
  const [riskStep, setRiskStep] = useState<RiskStepType>('NONE');

  useEffect(() => {
    postRiskPrediction(riskPredictionCondition, {
      onSuccess: (data) => {
        setRisk(data);
        const percentage = data.probability;
        if (percentage <= 40) setRiskStep('LOWER');
        else if (percentage <= 70) setRiskStep('MIDDLE');
        else if (percentage <= 100) setRiskStep('UPPER');
      },
    });
  }, [riskPredictionCondition]);

  if (risk === null) return null;

  return (
    <BottomButtonLayout onClickButton={handleCloseResult} buttonText={'확인'}>
      <div className="flex flex-col pt-8 px-4 gap-12">
        <div className="bg-white rounded-2xl">
          <RiskLevel riskStep={riskStep} probability={risk.probability} />
          <hr className="border-t-[1px] border-divider-gray" />

          {risk.prediction && (
            <div className="w-full">
              {!isOpenBetterResult && (
                <div className="relative flex justify-center items-center">
                  <Button
                    className="absolute top-30 z-10 bg-point hover:bg-point-2 text-[16px]"
                    onClick={() => setIsOpenBetterResult(true)}
                  >
                    분석 조건 개선해보기
                  </Button>
                  <div className="absolute top-0 blur-[4px] bg-white w-full">
                    <RiskPredictionDetailSection
                      recommendation={USEFUL_CONDITION_FAKE_DATA}
                      data={RISK_PREDICTION_DETAIL_FAKE_DATA}
                    />
                  </div>
                </div>
              )}

              {isOpenBetterResult && <RiskPredictionBetterResult riskPredictionCondition={riskPredictionCondition} />}
            </div>
          )}
          {!risk.prediction && <RiskPredictionDetailSection data={riskPredictionCondition} />}
        </div>
      </div>
    </BottomButtonLayout>
  );
};
