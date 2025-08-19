import { Outlet } from 'react-router-dom';

import { ScrollToTop } from '@/components/common/ScrollToTop';

export const AppLayout = () => {
  return (
    <div className="max-w-[1150px] h-screen mx-auto flex justify-center">
      <div className="max-w-[500px] w-full bg-bgcolor h-full shadow-2xl overflow-auto">
        <div className="w-full h-full pt-[59px]">
          <Outlet />
          <ScrollToTop />
        </div>
      </div>
      <div className="bg-gray-500/50 flex-1 hidden lg:flex">서비스 이름 및 설명</div>
    </div>
  );
};
