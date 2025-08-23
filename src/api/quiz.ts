import { useQuery } from '@tanstack/react-query';

type QuizState = '계약전' | '계약중' | '계약후';
export type QuizForm = '빈칸퀴즈' | 'ox퀴즈';

export interface Quiz {
  state: QuizState;
  form: QuizForm;
  quiz: string;
  answer: string;
  commentary: string;
}

const getQuizes = async (state: QuizState): Promise<Quiz[]> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/quiz?state=${state}`);

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return await res.json();
};

export const useGetQuizes = (state: QuizState) =>
  useQuery({
    queryKey: ['quizes'],
    queryFn: () => getQuizes(state),
  });
