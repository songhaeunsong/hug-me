import * as ProgressPrimitive from '@radix-ui/react-progress';
import { type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import type { RiskStepType } from './RiskPredictionResult';

interface RiskProgressProps {
  riskStep: RiskStepType;
}

type Props = ComponentProps<typeof ProgressPrimitive.Root> & RiskProgressProps;

export const RiskProgress = ({ className, value, ...props }: Props) => {
  return (
    <div className="w-full flex items-center gap-1">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn('bg-divider-gray relative h-4 w-full overflow-hidden rounded-full', className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            props.riskStep === 'LOWER' && 'bg-green-1',
            props.riskStep === 'MIDDLE' && 'bg-yellow-1',
            props.riskStep === 'UPPER' && 'bg-point-2',
            'h-full w-full flex-1 transition-all',
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      <span
        className={cn(
          props.riskStep === 'LOWER' && 'text-green-1',
          props.riskStep === 'MIDDLE' && 'text-yellow-1',
          props.riskStep === 'UPPER' && 'text-point-2',
          'font-semibold',
        )}
      >
        {value}%
      </span>
    </div>
  );
};
