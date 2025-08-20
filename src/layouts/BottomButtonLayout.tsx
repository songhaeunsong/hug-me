import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

interface BottomButtonLayoutProps {
  children: ReactNode;
  onClickButton: () => void;
  buttonText: string;
}

export const BottomButtonLayout = ({ children, onClickButton, buttonText }: BottomButtonLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1">{children}</div>
      <div className="sticky bottom-0 w-full p-4 pb-12">
        <Button onClick={onClickButton} className="bg-point h-16 text-xl font-semibold w-full hover:bg-point/90">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
