import { Link } from 'react-router-dom';

import { NavigationBar } from '@/components/common/NavigationBar';
import { PrecautionList } from '@/components/home/PrecautionList';

export const Home = () => {
  return (
    <>
      <div className="py-8 px-4 flex flex-col items-start  gap-3 border-b-5">
        <div className="flex items-center gap-2 text-[24px] font-semibold">
          <object data="icons/speaker.svg" />
          <span>빠른 기능 찾기</span>
        </div>
        <Link to="/search" className="text-[20px] text-start px-4 py-3  w-full text-gray-1 bg-divider-gray rounded-xl">
          원하는 기능을 검색해보세요.
        </Link>
      </div>
      <NavigationBar />
      <PrecautionList />
    </>
  );
};
