import { CheckList } from '@/pages/CheckList';
import { DepositCheck } from '@/pages/DepositCheck';
import { Quiz } from '@/pages/Quiz';
import { RiskPrediction } from '@/pages/RiskPrediction';

export const pageRoutes = [
  { path: 'check-list', element: <CheckList />, handle: { title: '체크리스트' } },
  { path: 'quiz', element: <Quiz />, handle: { title: '퀴즈' } },
  { path: 'risk-prediction', element: <RiskPrediction />, handle: { title: '위험 분석' } },
  { path: 'deposit-check', element: <DepositCheck />, handle: { title: '보증금 점검' } },
];
