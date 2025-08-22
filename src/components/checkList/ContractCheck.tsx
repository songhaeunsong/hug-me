import { Label } from '@radix-ui/react-label';

import { Checkbox } from '../ui/checkbox';
import type { CheckList } from './checkListConstants';

interface ContractCheckProps {
  checks: CheckList[];
}

export const ContractCheck = ({ checks }: ContractCheckProps) => {
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      {checks.map((check, checkIdx) => {
        return (
          <div key={`check-${checkIdx}`} className="flex flex-col items-start gap-4 w-full">
            <span className="font-semibold text-[16px] text-start">{check.title}</span>
            <div className="flex flex-col items-start rounded-2xl bg-white w-full divide-y divide-border-1 border-divider-gray">
              {check.checkPoints.map((checkPoint, checkPointIdx) => {
                return (
                  <div key={`checkpoint-${checkIdx}-${checkPointIdx}`} className="flex items-center gap-3 p-5 w-full">
                    <Checkbox id={`item-${checkIdx}-${checkPointIdx}`} />
                    <Label htmlFor="terms" className="text-start text-[14px] wrap-words">
                      {checkPoint}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
