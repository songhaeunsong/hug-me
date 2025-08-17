import { CheckList } from '@/pages/CheckList';
import { DepositCheck } from '@/pages/DepositCheck';
import { Quiz } from '@/pages/Quiz';
import { RiskAnalysis } from '@/pages/RiskAnalysis';

export const pageRoutes = [
  { path: 'check-list', element: <CheckList />, handle: { title: '체크리스트' } },
  { path: 'quiz', element: <Quiz />, handle: { title: '퀴즈' } },
  { path: 'risk-analysis', element: <RiskAnalysis />, handle: { title: '위험 분석' } },
  { path: 'deposit-check', element: <DepositCheck />, handle: { title: '보증금 점검' } },
];
