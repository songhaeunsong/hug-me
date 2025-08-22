import { Outlet, type UIMatch, useMatches } from 'react-router-dom';

import { BackButton } from '@/components/common/BackButton';
type LayoutHandle = { title?: string };

export const DefaultLayout = () => {
  const matches = useMatches() as Array<UIMatch<unknown, LayoutHandle>>;
  const title = [...matches].reverse().find((m) => m.handle?.title)?.handle?.title ?? '페이지';

  return (
    <div className="flex flex-col w-full h-full">
      <div className="sticky top-[59px] left-0 p-[10px] bg-bgcolor z-50">
        <div className="absolute inset-x-0 -top-[59px] h-[59px] bg-bgcolor" />
        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 [&>*]:align-middle">
            <BackButton />
          </div>
          <span className="m-auto text-[20px] font-bold">{title}</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
