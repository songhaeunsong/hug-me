import { useState } from 'react';

import type { HouseType } from '@/api/deposit';
import { RiskPredictionFileUploader } from '@/components/riskPrediction/RiskPredictionFileUploader';
import { RiskPredictionGuaranteeMonth } from '@/components/riskPrediction/RiskPredictionGuaranteeMonth';
import { RiskPredictionHousePrice } from '@/components/riskPrediction/RiskPredictionHousePrice';
import { RiskPredictionHouseSeniority } from '@/components/riskPrediction/RiskPredictionHouseSeniority';
import { RiskPredictionHouseType } from '@/components/riskPrediction/RiskPredictionHouseType';
import { RiskPredictionResult } from '@/components/riskPrediction/RiskPredictionResult';
import { RiskPredictionSelectType } from '@/components/riskPrediction/RiskPredictionSelectType';

type RiskPredictionState =
  | 'SELECT_TYPE'
  | 'FILE_UPLOAD'
  | 'HOUSE_PRICE'
  | 'HOUSE_SENIORITY'
  | 'HOUSE_TYPE'
  | 'GUARANTEE_MONTH'
  | 'RESULT';

export type RiskPredictionType = 'AUTO' | 'INSERT';

export const RiskPrediction = () => {
  const [riskPredictionState, setRiskPredictionState] = useState<RiskPredictionState>('SELECT_TYPE');
  const [riskPredictionType, setRiskPredictionType] = useState<RiskPredictionType>('INSERT');

  const [housePrice, setHousePrice] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [seniority, setSeniority] = useState<number>(0);
  const [region, setRegion] = useState('');
  const [houseType, setHouseType] = useState<HouseType | null>(null);
  const [guaranteeStartMonth, setGuaranteeStartMonth] = useState<number>(0);
  const [guaranteeEndMonth, setGuaranteeEndMonth] = useState<number>(0);

  const handleSelectType = (selectType: RiskPredictionType) => {
    setRiskPredictionType(selectType);

    if (selectType === 'INSERT') setRiskPredictionState('HOUSE_PRICE');
    else if (selectType === 'AUTO') setRiskPredictionState('FILE_UPLOAD');
  };

  const handleSubmitContractData = (depositAmount: number, region: string) => {
    setDepositAmount(depositAmount);
    setRegion(region);

    setRiskPredictionState('HOUSE_PRICE');
  };

  const handleSubmitHousePrice = (housePrice: number, depositAmount: number) => {
    setHousePrice(housePrice);
    setDepositAmount(depositAmount);

    setRiskPredictionState('HOUSE_SENIORITY');
  };

  const handleSubmitHouseSeniority = (seniority: number) => {
    setSeniority(seniority);

    setRiskPredictionState('HOUSE_TYPE');
  };

  const handleSubmitHouseType = (region: string, houseType: HouseType) => {
    setRegion(region);
    setHouseType(houseType);

    setRiskPredictionState('GUARANTEE_MONTH');
  };

  const handleSubmitGuaranteeMonth = (guaranteeStartMonth: number, guaranteeEndMonth: number) => {
    setGuaranteeStartMonth(guaranteeStartMonth);
    setGuaranteeEndMonth(guaranteeEndMonth);

    setRiskPredictionState('RESULT');
  };

  const handleCloseResult = () => {
    setRiskPredictionState('SELECT_TYPE');
  };

  if (riskPredictionState === 'SELECT_TYPE') return <RiskPredictionSelectType handleSelectType={handleSelectType} />;

  if (riskPredictionState === 'FILE_UPLOAD')
    return <RiskPredictionFileUploader handleSubmitContractData={handleSubmitContractData} />;
  if (riskPredictionState === 'HOUSE_PRICE')
    return <RiskPredictionHousePrice handleSubmitHousePrice={handleSubmitHousePrice} />;

  if (riskPredictionState === 'HOUSE_TYPE')
    return <RiskPredictionHouseType handleSubmitHouseType={handleSubmitHouseType} />;

  if (riskPredictionState === 'HOUSE_SENIORITY')
    return <RiskPredictionHouseSeniority handleSubmitHouseSeniority={handleSubmitHouseSeniority} />;

  if (riskPredictionState === 'GUARANTEE_MONTH')
    return <RiskPredictionGuaranteeMonth handleSubmitGuaranteeMonth={handleSubmitGuaranteeMonth} />;

  if (riskPredictionState === 'RESULT') {
    if (
      housePrice === 0 ||
      depositAmount === 0 ||
      seniority === 0 ||
      region === null ||
      houseType === null ||
      guaranteeStartMonth === 0 ||
      guaranteeEndMonth === 0
    )
      return;

    const initialLTV = +((depositAmount + seniority) / housePrice).toFixed(2);

    const riskPredictionCondition = {
      initialLTV,
      housePrice,
      depositAmount,
      seniority,
      region,
      houseType,
      guaranteeStartMonth,
      guaranteeEndMonth,
    };

    return (
      <RiskPredictionResult riskPredictionCondition={riskPredictionCondition} handleCloseResult={handleCloseResult} />
    );
  }
};
