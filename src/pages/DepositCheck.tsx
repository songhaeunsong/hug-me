import { useState } from 'react';

import type { CityType, HouseType } from '@/api/deposit';
import { DepositHousePrice } from '@/components/depositCheck/DepositHousePrice';
import { DepositHouseType } from '@/components/depositCheck/DepositHouseType';
import { DepositResult } from '@/components/depositCheck/DepositResult';

type CheckState = 'HOUSE_TYPE' | 'HOUSE_PRICE' | 'RESULT';
export const DepositCheck = () => {
  const [checkState, setCheckState] = useState<CheckState>('HOUSE_TYPE');

  const [city, setCity] = useState<CityType | null>('경기도');
  const [district, setDistrict] = useState<string | null>('안양시 동안구');
  const [type, setType] = useState<HouseType | null>('아파트');
  const [price, setPrice] = useState<number>(1000000000);

  const handleSubmitHouseType = (city: CityType, district: string, type: HouseType) => {
    if (city === null || district === null || type === null) return;

    setCity(city);
    setDistrict(district);
    setType(type);

    setCheckState('HOUSE_PRICE');
  };
  const handleSubmitHousePrice = (price: number) => {
    if (price === 0) return;

    setPrice(price);

    setCheckState('RESULT');
  };
  const handleCloseResult = () => {
    setCity(null);
    setDistrict(null);
    setType(null);
    setPrice(0);

    setCheckState('HOUSE_TYPE');
  };

  if (checkState === 'HOUSE_TYPE') return <DepositHouseType handleSubmitHouseType={handleSubmitHouseType} />;

  if (checkState === 'HOUSE_PRICE') return <DepositHousePrice handleSubmitHousePrice={handleSubmitHousePrice} />;

  if (checkState === 'RESULT') {
    if (city === null || district === null || type === null || price === 0) return;

    const checkCondition = { city, district, type, price };
    return <DepositResult checkCondition={checkCondition} handleCloseResult={handleCloseResult} />;
  }
};
