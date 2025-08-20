import { useMutation } from '@tanstack/react-query';

export type HouseType = '아파트' | '연립다세대' | '단독주택';
export type CityType =
  | '서울시'
  | '경기도'
  | '인천시'
  | '부산시'
  | '대구시'
  | '광주시'
  | '대전시'
  | '울산시'
  | '세종시'
  | '강원도'
  | '충청북도'
  | '충청남도'
  | '전라북도'
  | '전라남도'
  | '경상북도'
  | '경상남도'
  | '제주특별자치도';

export interface DepositCheckCondition {
  city: CityType;
  district: string;
  type: HouseType;
  price: number;
}

interface PostDepositResponse {
  rate: number;
  averagePrice: number;
}

const postDeposit = async (body: DepositCheckCondition): Promise<PostDepositResponse> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/average-deposit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  return res.json();
};

export const usePostDeposit = () => {
  const { mutate } = useMutation({
    mutationFn: (body: DepositCheckCondition) => postDeposit(body),
  });

  return mutate;
};
