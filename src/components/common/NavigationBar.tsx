import { Link } from 'react-router-dom';

export const NavigationBar = () => {
  return (
    <ul className="w-full grid grid-cols-4 sm:text-[13px] text-[10px] border-b-[1px] p-4 wrap-words">
      <Link to="/check-list" className="flex flex-col justify-start items-center gap-2 py-4 mx-2">
        <div className="w-[45px] h-[45px] bg-gray-500/20"></div>
        <span>계약 체크리스트</span>
      </Link>
      <Link to="/quiz" className="flex flex-col justify-start items-center gap-2 py-4 mx-2">
        <div className="w-[45px] h-[45px] bg-gray-500/20"></div>
        <span>퀴즈</span>
      </Link>
      <Link to="/risk-analysis" className="flex flex-col justify-start items-center gap-2 py-4 mx-2">
        <div className="w-[45px] h-[45px] bg-gray-500/20"></div>
        <span>위험도 분석</span>
      </Link>
      <Link to="/deposit-check" className="flex flex-col justify-start items-center gap-2 py-4 mx-2">
        <div className="w-[45px] h-[45px] bg-gray-500/20"></div>
        <span>맞춤 보증 추천</span>
      </Link>
    </ul>
  );
};
