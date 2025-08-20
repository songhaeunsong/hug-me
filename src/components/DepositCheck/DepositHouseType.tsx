import { useState } from 'react';

import type { CityType, HouseType } from '@/api/deposit';
import { BottomButtonLayout } from '@/layouts/BottomButtonLayout';

import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CITYES, DISTRICTS, HOUSE_TYPE } from './regionConstants';

interface DepositHouseTypeProps {
  handleSubmitHouseType: (city: CityType, district: string, type: HouseType) => void;
}

export const DepositHouseType = ({ handleSubmitHouseType }: DepositHouseTypeProps) => {
  const [selectedCity, setSelectedCity] = useState<CityType | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<HouseType | null>(null);

  const handleClickbutton = () => {
    if (selectedCity === null || selectedDistrict === null || selectedType === null) return;
    handleSubmitHouseType(selectedCity, selectedDistrict, selectedType);
  };

  return (
    <BottomButtonLayout onClickButton={handleClickbutton} buttonText={'확인'}>
      <div className="flex flex-col h-full pt-12 pb-28 px-4 gap-12">
        <p className="text-[24px] font-bold text-start">
          적정 보증금을 확인고자 하는 매물의 <span className="text-point">지역</span>과{' '}
          <span className="text-point">주택 유형</span>을 선택해주세요.
        </p>

        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col w-full items-start gap-4">
            <Label className="font-semibold">지역 선택</Label>
            <Select onValueChange={(city: CityType) => setSelectedCity(city)}>
              <SelectTrigger className="w-full px-1 py-2 border-0 border-b-1 border-gray-1 text-[20px] text-dark shadow-none rounded-none">
                <SelectValue placeholder="시 / 도 선택" />
              </SelectTrigger>
              <SelectContent>
                {CITYES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              disabled={selectedCity === null ? true : false}
              onValueChange={(district: string) => setSelectedDistrict(district)}
            >
              <SelectTrigger className="w-full px-1 py-2 border-0 border-b-1 border-gray-1 text-[20px] text-dark shadow-none rounded-none">
                <SelectValue placeholder="구 / 군 선택" />
              </SelectTrigger>
              <SelectContent>
                {selectedCity !== null &&
                  DISTRICTS[selectedCity].map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
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
