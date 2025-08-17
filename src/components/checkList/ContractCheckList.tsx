import { useState } from 'react';

import { cn } from '@/lib/utils';

import { PRECAUTION_MENUS } from '../home/PrecautionList';
import { Button } from '../ui/button';
import {
  AFTER_CONTRACT_CHECKLIST_DATA,
  BEFORE_CONTRACT_CHECKLIST_DATA,
  IN_CONTRACT_CHECKLIST_DATA,
} from './checkListConstants';
import { ContractCheck } from './ContractCheck';

export type PrecautionMenuType = (typeof PRECAUTION_MENUS)[number]['key'];

export const ContractCheckList = () => {
  const [precautionMenu, setPrecautionMenu] = useState<PrecautionMenuType>('BEFORE_CONTRACT');

  const handleClickPrecautionMenu = (menu: PrecautionMenuType) => {
    setPrecautionMenu(menu);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="pb-8 px-4 flex flex-col items-start gap-6">
      <div className="grid grid-cols-3 w-full gap-2 sticky top-[109px] left-0 bg-bgcolor pt-8">
        {PRECAUTION_MENUS.map(({ key, label }) => {
          const active = precautionMenu === key;
          return (
            <Button
              key={key}
              size="sm"
              variant="transparent"
              className={cn(
                active ? ' border-dark text-dark' : 'text-gray-1 border-transparent',
                'pb-2 font-semibold border-b-3',
              )}
              onClick={() => handleClickPrecautionMenu(key)}
            >
              {label}
            </Button>
          );
        })}
      </div>
      {precautionMenu === 'BEFORE_CONTRACT' && <ContractCheck checks={BEFORE_CONTRACT_CHECKLIST_DATA} />}
      {precautionMenu === 'IN_CONTRACT' && <ContractCheck checks={IN_CONTRACT_CHECKLIST_DATA} />}
      {precautionMenu === 'AFTER_CONTRACT' && <ContractCheck checks={AFTER_CONTRACT_CHECKLIST_DATA} />}
    </div>
  );
};
