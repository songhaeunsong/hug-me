import { useState } from 'react';

import type { CityType, HouseType } from '@/api/deposit';
import { BottomButtonLayout } from '@/layouts/BottomButtonLayout';

import { CITYES, CITYES_RISK_PREDICTION_MAP, HOUSE_TYPE } from '../depositCheck/regionConstants';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface RiskPredictionHouseTypeProps {
  handleSubmitHouseType: (egion: string, houseType: HouseType) => void;
}

export const RiskPredictionHouseType = ({ handleSubmitHouseType }: RiskPredictionHouseTypeProps) => {
  const [selectedRegion, setSelectedRegion] = useState<CityType | null>(null);
  const [selectedType, setSelectedType] = useState<HouseType | null>(null);

  const handleClickbutton = () => {
    if (selectedRegion === null || selectedType === null) return;

    handleSubmitHouseType(CITYES_RISK_PREDICTION_MAP[selectedRegion], selectedType);
  };

  return (
    <BottomButtonLayout onClickButton={handleClickbutton} buttonText={'확인'}>
      <div className="flex flex-col h-full pt-12 pb-28 px-4 gap-12">
        <p className="text-[24px] font-bold text-start wrap-words">
          매물의 <span className="text-point">지역</span>과 <span className="text-point">주택 유형</span>을
          선택해주세요.
        </p>

        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col w-full items-start gap-4">
            <Label className="font-semibold">지역 선택</Label>
            <Select onValueChange={(city: CityType) => setSelectedRegion(city)}>
              <SelectTrigger className="w-full px-1 py-2 border-0 border-b-1 border-gray-1 text-[20px] text-dark shadow-none rounded-none">
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent>
                {CITYES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col w-full items-start gap-4">
            <Label className="font-semibold">주택 유형 선택</Label>
            <Select onValueChange={(type: HouseType) => setSelectedType(type)}>
              <SelectTrigger className="w-full px-1 py-2 border-0 border-b-1 border-gray-1 text-[20px] text-dark shadow-none rounded-none">
                <SelectValue placeholder="주택 유형 선택" />
              </SelectTrigger>
              <SelectContent>
                {HOUSE_TYPE.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </BottomButtonLayout>
  );
};
