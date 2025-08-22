import { useMutation } from '@tanstack/react-query';

import type { HouseType } from './deposit';

export interface RiskPredictionCondition {
  initialLTV: number;
  housePrice: number;
  depositAmount: number;
  seniority: number;
  region: string;
  houseType: HouseType;
  guaranteeStartMonth: number;
  guaranteeEndMonth: number;
}

interface RecommendationCondition {
  isUseful: boolean;
  result: number;
}

interface Recommendation {
  주택가액: RecommendationCondition;
  임대보증금액: RecommendationCondition;
  선순위: RecommendationCondition;
  probability: number;
}

export interface PostRiskPredictionResponse {
  prediction: boolean;
  probability: number;
}

export interface PostBetterRiskResponse {
  prediction: boolean;
  probability: number;
  recommendation: Recommendation;
}

const postRiskPrediction = async (body: RiskPredictionCondition): Promise<PostRiskPredictionResponse> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/risk-prediction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return await res.json();
};

export const usePostRiskPrediction = () => {
  const { mutate } = useMutation({
    mutationFn: (body: RiskPredictionCondition) => postRiskPrediction(body),
  });

  return mutate;
};

const postBetterRisk = async (body: RiskPredictionCondition): Promise<PostBetterRiskResponse> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/better-risk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return await res.json();
};

export const usePostBetterRisk = () => {
  const { mutate } = useMutation({
    mutationFn: (body: RiskPredictionCondition) => postBetterRisk(body),
  });

  return mutate;
};
