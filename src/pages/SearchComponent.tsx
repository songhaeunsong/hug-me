import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { PostSpeechResponse } from '@/api/stt';
import { Button } from '@/components/ui/button';

import { Search } from './Search';

type SearchState = 'VOICE' | 'TEXT';

const PATH_MAP = {
  risk_assessment: '/risk-prediction',
  quiz: '/quiz',
  myhouse: '/deposit-check',
  check_registry: '/check-list',
};

const LABEL_MAP = {
  risk_assessment: '매물의 위험도를 분석해요.',
  quiz: '퀴즈로 계약 주의사항을 익혀요.',
  myhouse: '집값에 적절한 보증금을 알아봐요.',
  check_registry: '주의사항을 체크해요.',
};

export const SearchComponent = () => {
  const [searchState, setSearchState] = useState<SearchState>('TEXT');
  const [isSearchResult, setSearchResult] = useState(false);

  const [searchData, setSearchData] = useState<PostSpeechResponse | null>(null);

  const handleSearchResultTrue = (data: PostSpeechResponse) => {
    setSearchData(data);
    setSearchResult(true);
  };

  const handleSearchResultFalse = () => {
    setSearchResult(false);
  };
  return (
    <div className="flex flex-col gap-12 w-full h-full">
      <div className="flex-1">
        {searchState === 'VOICE' && (
          <div className="flex flex-col w-full justify-center items-center pt-12">
            <Search handleSearchResultTrue={handleSearchResultTrue} handleSearchResultFalse={handleSearchResultFalse} />
            {!isSearchResult && (
              <div className="flex flex-col items-center gap-6 -mt-[20px]">
                <span className="text-[24px] font-bold">찾으시는 정보를 말씀해주세요!</span>
                <div className="flex flex-col gap-3">
                  <span className="font-semibold text-gray-2">다음과 같이 말할 수 있어요.</span>
                  <div className="flex flex-col text-gray-2">
                    <span>{'“경기도 성남시 분당구 OO아파트의 위험도를 알고 싶어"'}</span>
                    <span>{'“대전 서구 ○○빌라의 계약 위험도를 확인하고 싶어.”'}</span>
                  </div>
                </div>
              </div>
            )}
            {isSearchResult && searchData && (
              <div className="flex flex-col items-center gap-6 -mt-[20px]">
                <span className="text-[24px] font-bold">찾으시는 정보가 맞나요?</span>
                {searchData.intent.matched ? (
                  <div className="flex flex-col gap-3">
                    <Link to={PATH_MAP[searchData.intent.best_score]}>
                      <Button className="bg-white hover:bg-divider-gray/50 text-dark font-semibold">
                        {LABEL_MAP[searchData.intent.best_score]}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to={PATH_MAP[searchData.intent.best_score]}>
                      <Button className="bg-white hover-bg:divider-gray/50 text-dark font-semibold">
                        {LABEL_MAP[searchData.intent.best_score]}
                      </Button>
                    </Link>
                    <Link to={PATH_MAP[searchData.intent.second_best]}>
                      <Button className="bg-white hover-bg:divider-gray/50 text-dark font-semibold">
                        {LABEL_MAP[searchData.intent.second_best]}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {searchState === 'TEXT' && (
          <div className="flex flex-col w-full justify-center items-center pt-24">
            <div className="w-[50px] h-[50px] mt-20 mb-10">
              <object data="icons/search.svg" width="100%" height="100%" />
            </div>
            <div className="w-full px-8">
              <div className="flex flex-col items-center mb-12">
                <span className="text-[24px] font-bold">찾으시는 정보를</span>
                <span className="text-[24px] font-bold">입력해주세요!</span>
              </div>
              <input
                className="w-full bg-divider-gray/50 px-4 py-3 rounded-xl mb-[20px] outline-none"
                type="text"
                placeholder="예) 대전 서구 ○○빌라의 계약 위험도를 확인하고 싶어."
              />
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto p-20">
        <div className="bg-white p-[2px] w-60 rounded-2xl relative shadow-[inset_0_1px_6px_rgba(0,0,0,0.3)]">
          <motion.div
            className="absolute top-[2px] left-[4px] h-5/6 bottom-[2px] my-auto rounded-2xl bg-point"
            style={{ width: 'calc(50% - 4px)' }}
            animate={{ x: searchState === 'VOICE' ? '0%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />

          <div className="relative flex">
            <button
              onClick={() => setSearchState('VOICE')}
              className={`flex-1 py-2 z-10 transition-colors ${
                searchState === 'VOICE' ? 'text-white font-semibold' : 'text-gray-400'
              }`}
            >
              음성
            </button>
            <button
              onClick={() => setSearchState('TEXT')}
              className={`flex-1 py-2 z-10 transition-colors ${
                searchState === 'TEXT' ? 'text-white font-semibold' : 'text-gray-400'
              }`}
            >
              텍스트
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
