import { Label } from '@radix-ui/react-label';
import { type ChangeEvent, useState } from 'react';

import { BottomButtonLayout } from '@/layouts/BottomButtonLayout';
import { formatMoneyKRW } from '@/utils/formatMoneyKRW';

interface RiskPredictionHouseSeniorityProps {
  handleSubmitHouseSeniority: (seniority: number) => void;
}

export const RiskPredictionHouseSeniority = ({ handleSubmitHouseSeniority }: RiskPredictionHouseSeniorityProps) => {
  const [mortgageAmount, setMortgageAmount] = useState<string>('');
  const [priorDepositAmount, setPriorDepositAmount] = useState<string>('');

  const handleMortgageAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = String(Number(e.target.value));

    if (+value <= 100_000_000_000) {
      setMortgageAmount(value);
    }
  };

  const handleDepositAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = String(Number(e.target.value));

    if (+value <= 100_000_000_000) {
      setPriorDepositAmount(value);
    }
  };

  const handleClickButton = () => {
    if (mortgageAmount === '' || priorDepositAmount === '') return;

    if (+mortgageAmount >= 0 && +priorDepositAmount >= 0)
      handleSubmitHouseSeniority(+mortgageAmount + +priorDepositAmount);
  };
  return (
    <BottomButtonLayout onClickButton={handleClickButton} buttonText={'확인'}>
      <div className="flex flex-col h-full w-full gap-8">
        <div className="flex flex-col pt-8 px-4 gap-8">
          <p className="text-[24px] font-bold text-start wrap-words">
            매물의 <span className="text-point">선순위근저당권설정액</span>과{' '}
            <span className="text-point">선순위임대차보증금액</span>을 입력해주세요.
          </p>

          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col w-full items-start gap-4">
              <Label className="text-gray-2 font-semibold">선순위근저당권설정액</Label>

              <div className="flex gap-2 items-center w-full border-b-1 border-gray-1">
                <input
                  type="number"
                  value={mortgageAmount}
                  placeholder="선순위근저당권설정액 입력"
                  min={0}
                  max={10_000_000_000_000}
                  step={1_000_000}
                  onChange={handleMortgageAmountChange}
                  className="w-full px-1 py-[4px] outline-none border-0 text-[20px] text-dark shadow-none rounded-none"
                />
                <span className="text-gray-2 text-[20px]">원</span>
              </div>
              <span className="text-point">{formatMoneyKRW(+mortgageAmount)}</span>
            </div>

            <div className="flex flex-col w-full items-start gap-4">
              <Label className="text-gray-2 font-semibold">선순위임대차보증금액</Label>
              <div className="flex gap-2 items-center w-full border-b-1 border-gray-1">
                <input
                  type="number"
                  value={priorDepositAmount}
                  placeholder="선순위임대차보증금액 입력"
                  min={0}
                  max={10_000_000_000_000}
                  step={1_000_000}
                  onChange={handleDepositAmountChange}
                  className="w-full px-1 py-[4px] outline-none border-0 text-[20px] text-dark shadow-none rounded-none"
                />
                <span className="text-gray-2 text-[20px]">원</span>
              </div>
              <span className="text-point">{formatMoneyKRW(+priorDepositAmount)}</span>
            </div>
          </div>
        </div>
        <hr className="border-4 border-divider-gray" />
        <div className="text-gray-2 text-start">
          <div className="text-start text-[16px] text-dark font-bold p-4 border-b-1 border-divider-gray">
            <span>자주 묻는 질문</span>
          </div>

          <div className="w-full text-start text-[16px] p-4">
            <span>선순위근저당권설정액이 무엇인가요?</span>
          </div>
          <div className="w-full text-start text-[14px] text-gray-1 p-4 bg-divider-gray">
            <span>
              선순위 근저당권 설정액은 집이나 부동산에 설정된 1순위 담보대출 금액을 의미합니다. 이 값은 등기부등본에서
              확인할 수 있습니다.
            </span>
          </div>
          <div className="w-full text-start text-[16px] p-4">
            <span>선순위근저당권설정액이 무엇인가요?</span>
          </div>
          <div className="w-full text-start text-[14px] text-gray-1 p-4 bg-divider-gray">
            <span>
              선순위임대차보증금액은 임차인이 법적으로 우선적으로 보호받는 보증금 금액을 의미합니다. 이 값은
              등기부등본의 임차권 등기 사항에서 확인할 수 있습니다.
            </span>
          </div>
        </div>
      </div>
    </BottomButtonLayout>
  );
};
