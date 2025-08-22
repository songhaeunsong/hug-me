import { useEffect, useState } from 'react';

import { type DepositCheckCondition, usePostDeposit } from '@/api/deposit';
import { BottomButtonLayout } from '@/layouts/BottomButtonLayout';
import { formatMoneyKRW } from '@/utils/formatMoneyKRW';

import { ErrorComponent } from '../common/ErrorComponent';
import { Spinner } from '../common/Spinner';

interface DepositResultProps {
  checkCondition: DepositCheckCondition;
  handleCloseResult: () => void;
}

export const DepositResult = ({ checkCondition, handleCloseResult }: DepositResultProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deposit, setDeposit] = useState<number | null>(null);
  const postDeposit = usePostDeposit();

  useEffect(() => {
    postDeposit(checkCondition, {
      onSuccess: (data) => {
        setDeposit(data.averagePrice);

        setIsLoading(false);
      },
    });
  }, [checkCondition]);

  if (isLoading) return <Spinner text="적정보증금액을 계산 중이에요!" />;

  if (deposit === null) return <ErrorComponent goBackLink="/" />;

  return (
    <BottomButtonLayout onClickButton={handleCloseResult} buttonText={'확인'}>
      <div className="flex flex-col pt-12 px-4 gap-18">
        <div className="flex flex-col gap-1 text-[20px] font-semibold items-center">
          <span>{`${checkCondition.city} ${checkCondition.district} ${checkCondition.type}`}의</span>
          <span>주택가액이 {formatMoneyKRW(checkCondition.price)}인 경우</span>
        </div>

        <div className="flex flex-col gap-2 text-[30px] font-bold">
          <span>적정 보증금의 평균값은</span>
          <span>
            <span className="text-point">{formatMoneyKRW(deposit)}</span>입니다.
          </span>
        </div>
      </div>
    </BottomButtonLayout>
  );
};
