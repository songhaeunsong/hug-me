import { type ChangeEvent, useState } from 'react';

import { BottomButtonLayout } from '@/layouts/BottomButtonLayout';
import { formatMoneyKRW } from '@/utils/formatMoneyKRW';

interface DepositHousePriceProps {
  handleSubmitHousePrice: (price: number) => void;
}
export const DepositHousePrice = ({ handleSubmitHousePrice }: DepositHousePriceProps) => {
  const [housePrice, setHousePrice] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = String(Number(e.target.value));

    if (+value <= 100_000_000_000) {
      setHousePrice(value);
    }
  };
  const handleClickButton = () => {
    //수정
    handleSubmitHousePrice(+housePrice);
  };
  return (
    <BottomButtonLayout onClickButton={handleClickButton} buttonText={'적정 보증금 평균값 보기'}>
      <div className="flex flex-col h-full pt-12 pb-28 px-4 gap-12">
        <p className="text-[24px] font-bold text-start">
          적정 보증금을 확인고자 하는 매물의 <span className="text-point">주택가액</span>을 입력해주세요.
        </p>

        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col w-full items-start gap-4">
            <div className="flex gap-2 items-center w-full border-b-1 border-gray-1">
              <input
                type="number"
                value={housePrice}
                min={0}
                max={10_000_000_000_000}
                step={1_000_000}
                onChange={handleChange}
                className="w-full px-1 py-[4px] outline-none border-0 text-[20px] text-dark shadow-none rounded-none"
              />
              <span className="text-[20px]">원</span>
            </div>
            <span className="text-point">{formatMoneyKRW(+housePrice)}</span>
          </div>
        </div>
      </div>
    </BottomButtonLayout>
  );
};
