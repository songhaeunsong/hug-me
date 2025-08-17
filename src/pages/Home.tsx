import { NavigationBar } from '@/components/common/NavigationBar';
// import { PrecautionList } from '@/components/home/PrecautionList';

export const Home = () => {
  return (
    <>
      <div className="pt-12 pb-8 px-4 flex flex-col items-start font-semibold text-xl sm:text-2xl gap-1 border-b-5">
        <span>위험도 확인이 필요한 매물을</span>
        <span>확인해보세요!</span>
      </div>
      <NavigationBar />
      {/* <PrecautionList /> */}
    </>
  );
};
