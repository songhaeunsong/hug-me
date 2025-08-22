import { Link } from 'react-router-dom';

export const NavigationBar = () => {
  return (
    <ul className="w-full grid grid-cols-4 sm:text-[13px] text-[10px] border-b-[1px] p-4 wrap-words">
      <Link to="/check-list" className="flex flex-col justify-start items-center gap-2 py-4 mx-2">
        <div className="h-[45px]">
          <object className="pointer-events-none" data="icons/list_alt_check.svg" />
        </div>
        <span>계약 체크리스트</span>
      </Link>
      <Link to="/quiz" className="flex flex-col justify-start items-center gap-2 py-4 mx-2">
        <div className="h-[45px]">
          <object className="pointer-events-none" data="icons/quiz.svg" />
        </div>
        <span>퀴즈</span>
      </Link>
      <Link to="/risk-prediction" className="flex flex-col justify-start items-center gap-2 py-4 mx-2">
        <div className="h-[45px]">
          <object className="pointer-events-none" data="icons/bar_chart.svg" />
        </div>
        <span>위험도 분석</span>
      </Link>
      <Link to="/deposit-check" className="flex flex-col justify-start items-center gap-2 py-4 mx-2">
        <div className="h-[45px]">
          <object className="pointer-events-none" data="icons/admin_panel_settings.svg" />
        </div>
        <span>보증금 점검</span>
      </Link>
    </ul>
  );
};
