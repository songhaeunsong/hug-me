import { Label } from '@radix-ui/react-label';
import { type ChangeEvent, useState } from 'react';

import { BottomButtonLayout } from '@/layouts/BottomButtonLayout';
import { formatMoneyKRW } from '@/utils/formatMoneyKRW';

interface RiskPredictionHousePriceProps {
  handleSubmitHousePrice: (housePrice: number, depositAmount: number) => void;
}

export const RiskPredictionHousePrice = ({ handleSubmitHousePrice }: RiskPredictionHousePriceProps) => {
  const [housePrice, setHousePrice] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState<string>('');

  const handleHousePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = String(Number(e.target.value));

    if (+value <= 100_000_000_000) {
      setHousePrice(value);
    }
  };

  const handleDepositAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = String(Number(e.target.value));

    if (+value <= 100_000_000_000) {
      setDepositAmount(value);
    }
  };

  const handleClickButton = () => {
    if (+housePrice > 0 && +depositAmount > 0) handleSubmitHousePrice(+housePrice, +depositAmount);
  };
  return (
    <BottomButtonLayout onClickButton={handleClickButton} buttonText={'확인'}>
      <div className="flex flex-col h-full pt-8 pb-28 px-4 gap-8">
        <p className="text-[24px] font-bold text-start wrap-words">
          위험도 분석을 원하는 매물의 <span className="text-point">주택가액</span>과{' '}
          <span className="text-point">임대보증금액</span>을 입력해주세요.
        </p>

        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full items-start gap-4">
            <Label className="text-gray-2 font-semibold">주택가액</Label>

            <div className="flex gap-2 items-center w-full border-b-1 border-gray-1">
              <input
                type="number"
                value={housePrice}
                placeholder="주택가액 입력"
                min={0}
                max={10_000_000_000_000}
                step={1_000_000}
                onChange={handleHousePriceChange}
                className="w-full px-1 py-[4px] outline-none border-0 text-[20px] text-dark shadow-none rounded-none"
              />
              <span className="text-gray-2 text-[20px]">원</span>
            </div>
            <span className="text-point">{formatMoneyKRW(+housePrice)}</span>
          </div>

          <div className="flex flex-col w-full items-start gap-4">
            <Label className="text-gray-2 font-semibold">임대보증금액</Label>
            <div className="flex gap-2 items-center w-full border-b-1 border-gray-1">
              <input
                type="number"
                value={depositAmount}
                placeholder="임대보증금액 입력"
                min={0}
                max={10_000_000_000_000}
                step={1_000_000}
                onChange={handleDepositAmountChange}
                className="w-full px-1 py-[4px] outline-none border-0 text-[20px] text-dark shadow-none rounded-none"
              />
              <span className="text-gray-2 text-[20px]">원</span>
            </div>
            <span className="text-point">{formatMoneyKRW(+depositAmount)}</span>
          </div>
        </div>
      </div>
    </BottomButtonLayout>
  );
};
