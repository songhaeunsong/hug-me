import { CheckList } from '@/pages/CheckList';
import { DepositCheck } from '@/pages/DepositCheck';
import { Quiz } from '@/pages/Quiz';
import { RiskPrediction } from '@/pages/RiskPrediction';
import { SearchComponent } from '@/pages/SearchComponent';

export const pageRoutes = [
  { path: 'check-list', element: <CheckList />, handle: { title: '체크리스트' } },
  { path: 'quiz', element: <Quiz />, handle: { title: '퀴즈' } },
  { path: 'risk-prediction', element: <RiskPrediction />, handle: { title: '위험 분석' } },
  { path: 'deposit-check', element: <DepositCheck />, handle: { title: '보증금 점검' } },
  { path: 'search', element: <SearchComponent />, handle: { title: '빠른 기능 찾기' } },
];
