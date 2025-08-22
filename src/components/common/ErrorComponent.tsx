import { Link } from 'react-router-dom';

import { Button } from '../ui/button';

interface ErrorComponentProps {
  goBackLink: string;
}

export const ErrorComponent = ({ goBackLink }: ErrorComponentProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center pb-4">
      <span className="text-8 font-semibold">문제가 생겼어요. 다시 시도해주세요.</span>
      <Link to={goBackLink}>
        <Button className="text-white bg-dark rounded-lg">돌아가기</Button>
      </Link>
    </div>
  );
};
