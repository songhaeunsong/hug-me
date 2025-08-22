import { useState } from 'react';
import Picker from 'react-mobile-picker';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { BottomButtonLayout } from '@/layouts/BottomButtonLayout';
import { cn } from '@/lib/utils';

import { Label } from '../ui/label';

interface RiskPredictionGuaranteeMonthProps {
  handleSubmitGuaranteeMonth: (guaranteeStartMonth: number, guaranteeEndMonth: number) => void;
}

type CalenderKeyType = 'year' | 'month';

const SELECTIONS: Record<CalenderKeyType, string[]> = {
  year: [
    '2021년',
    '2022년',
    '2023년',
    '2024년',
    '2025년',
    '2026년',
    '2027년',
    '2028년',
    '2029년',
    '2030년',
    '2031년',
    '2032년',
    '2033년',
    '2034년',
    '2035년',
    '2036년',
    '2037년',
    '2038년',
    '2039년',
    '2040년',
  ],
  month: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
};

export const RiskPredictionGuaranteeMonth = ({ handleSubmitGuaranteeMonth }: RiskPredictionGuaranteeMonthProps) => {
  const handleClickbutton = () => {
    const selectedStartMonth = +startMonth.year.slice(0, -1) * 100 + +startMonth.month.slice(0, -1);

    const selectedEndMonth = +endMonth.year.slice(0, -1) * 100 + +endMonth.month.slice(0, -1);

    if (selectedStartMonth >= selectedEndMonth) return;
    handleSubmitGuaranteeMonth(+selectedStartMonth, +selectedEndMonth);
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const [startMonth, setStartMonth] = useState({
    year: '2021년',
    month: '1월',
  });

  const [endMonth, setEndMonth] = useState({
    year: `${year}년`,
    month: `${month}월`,
  });

  const calenderKeys = Object.keys(SELECTIONS) as CalenderKeyType[];
  return (
    <BottomButtonLayout onClickButton={handleClickbutton} buttonText={'확인'}>
      <div className="flex flex-col h-full pt-12 pb-28 px-4 gap-12 ">
        <p className="text-[24px] font-bold text-start wrap-words">
          매물의 <span className="text-point">보증 시작 월</span>과 <span className="text-point">보증 완료 월</span>을
          입력해주세요.
        </p>

        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col w-full items-start gap-4">
            <Label className="font-semibold">보증 시작 월</Label>
            <Dialog>
              <DialogTrigger className="w-full px-1 py-[4px] text-[20px] border-b-1 border-gray-1 text-start">
                {`${startMonth.year} ${startMonth.month}`}
              </DialogTrigger>
              <DialogContent aria-describedby={undefined} showCloseButton={false}>
                <Picker value={startMonth} onChange={setStartMonth}>
                  {calenderKeys.map((name) => (
                    <Picker.Column key={name} name={name}>
                      {SELECTIONS[name].map((option) => (
                        <Picker.Item key={option} value={option}>
                          {({ selected }) => (
                            <div
                              className={cn(
                                selected && 'text-white bg-point/90',
                                'rounded-2xl py-[5px] px-[20px] cursor-pointer',
                              )}
                            >
                              {option}
                            </div>
                          )}
                        </Picker.Item>
                      ))}
                    </Picker.Column>
                  ))}
                </Picker>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col w-full items-start gap-4">
            <Label className="font-semibold">보증 완료 월</Label>
            <Dialog>
              <DialogTrigger className="w-full px-1 py-[4px] text-[20px] border-b-1 border-gray-1 text-start">
                {`${endMonth.year} ${endMonth.month}`}
              </DialogTrigger>
              <DialogContent aria-describedby={undefined} showCloseButton={false}>
                <Picker value={endMonth} onChange={setEndMonth}>
                  {calenderKeys.map((name) => (
                    <Picker.Column key={name} name={name}>
                      {SELECTIONS[name].map((option) => (
                        <Picker.Item key={option} value={option}>
                          {({ selected }) => (
                            <div
                              className={cn(
                                selected && 'text-white bg-point/90',
                                'rounded-2xl py-[5px] px-[20px] cursor-pointer',
                              )}
                            >
                              {option}
                            </div>
                          )}
                        </Picker.Item>
                      ))}
                    </Picker.Column>
                  ))}
                </Picker>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </BottomButtonLayout>
  );
};
