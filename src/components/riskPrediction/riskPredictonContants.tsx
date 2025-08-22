import type { Recommendation } from './RiskRredictionBetterResult';

export type RiskPredictionConditionKey =
  | 'initialLTV'
  | 'housePrice'
  | 'depositAmount'
  | 'seniority'
  | 'mortgageAmount'
  | 'priorDepositAmount'
  | 'region'
  | 'houseType'
  | 'guaranteeStartMonth'
  | 'guaranteeEndMonth';

export type RiskPredictionDetailKey = Exclude<RiskPredictionConditionKey, 'mortgageAmount' | 'priorDepositAmount'>;

export const RISK_PREDICTION_CONDITION_MAP: Record<RiskPredictionConditionKey, string> = {
  initialLTV: '초기LTV',
  housePrice: '주택가액',
  depositAmount: '임대보증금액',
  seniority: '선순위금액',
  mortgageAmount: '선순위근저당권설정액',
  priorDepositAmount: '선순위임대차보증금액',
  region: '지역 선택',
  houseType: '주택 유형',
  guaranteeStartMonth: '보증시작월',
  guaranteeEndMonth: '보증완료월',
};

export const RISK_PREDICTION_DETAIL_FAKE_DATA: Record<RiskPredictionDetailKey, number | string> = {
  initialLTV: 0.9,
  housePrice: 300_000_000,
  depositAmount: 190_000_000,
  seniority: 80_000_000,
  region: '부산광역시',
  houseType: '아파트',
  guaranteeStartMonth: 202508,
  guaranteeEndMonth: 202708,
};

export const USEFUL_CONDITION_FAKE_DATA: Recommendation = {
  usefulConditions: {
    housePrice: { percentage: '-10%', result: 270_000_000 },
  },
  betterRiskStep: 'LOWER',
  betterRiskPercentage: 30,
};
