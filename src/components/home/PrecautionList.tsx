import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { ContractPrecaution } from './ContractPrecaution';
import {
  AFTER_CONTRACT_PRECAUTION_DATA,
  BEFORE_CONTRACT_PRECAUTION_DATA,
  IN_CONTRACT_PRECAUTION_DATA,
} from './precautionConstants';

export const PRECAUTION_MENUS = [
  { key: 'BEFORE_CONTRACT', label: '계약 전' },
  { key: 'IN_CONTRACT', label: '계약 중' },
  { key: 'AFTER_CONTRACT', label: '계약 후' },
];

export type PrecautionMenuType = (typeof PRECAUTION_MENUS)[number]['key'];

export const PrecautionList = () => {
  const [precautionMenu, setPrecautionMenu] = useState<PrecautionMenuType>('BEFORE_CONTRACT');

  const handleClickPrecautionMenu = (menu: PrecautionMenuType) => {
    setPrecautionMenu(menu);
  };
  return (
    <div className="py-8 px-4 flex flex-col items-start gap-6">
      <div className="flex flex-row items-center gap-4">
        {PRECAUTION_MENUS.map(({ key, label }) => {
          const active = precautionMenu === key;
          return (
            <Button
              key={key}
              size="sm"
              variant="tag"
              className={cn(
                active
                  ? 'bg-point text-white shadow'
                  : 'bg-bgcolor text-gray-300 hover:bg-point/20 hover:text-point/80',
              )}
              onClick={() => handleClickPrecautionMenu(key)}
            >
              {label}
            </Button>
          );
        })}
      </div>
      {precautionMenu === 'BEFORE_CONTRACT' && <ContractPrecaution precautions={BEFORE_CONTRACT_PRECAUTION_DATA} />}
      {precautionMenu === 'IN_CONTRACT' && <ContractPrecaution precautions={IN_CONTRACT_PRECAUTION_DATA} />}
      {precautionMenu === 'AFTER_CONTRACT' && <ContractPrecaution precautions={AFTER_CONTRACT_PRECAUTION_DATA} />}
    </div>
  );
};
