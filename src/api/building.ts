import { useQuery } from '@tanstack/react-query';

export interface GetBrTitleInfoParam {
  sigunguCd: number;
  bjdongCd: number;
  bun: number;
  ji?: number;
}

export interface GetBrTitleInfoResponce {
  mainPurpsCdNm: string;
}

const getBrTitleInfo = async (param: GetBrTitleInfoParam): Promise<GetBrTitleInfoResponce> => {
  const api = `${import.meta.env.VITE_BUILDING_REGISTER_URL}?serviceKey=${
    import.meta.env.VITE_BUILDING_REGISTER_SECRET_KEY
  }`;

  const url = param.ji ? `${api}?sigunguCd=?bjdongCd=?bun=?ji=` : `${api}?sigunguCd=?bjdongCd=?bun=`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return (await res.json()).body.items;
};

export const useGetBrTitleInfo = (param: GetBrTitleInfoParam) =>
  useQuery({
    queryKey: ['brTitleInfo'],
    queryFn: () => getBrTitleInfo(param),
  });
