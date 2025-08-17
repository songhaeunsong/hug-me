type LinkContent = {
  type: 'link';
  title?: string;
  lists: {
    title: string;
    description: string;
    url: string;
  }[];
};

type DepositCheckContent = {
  type: 'deposit-check';
  title: string;
  description: string;
};

type TextContent = {
  type: 'text';
  title?: string;
  lists: string[];
};

type ExampleContent = {
  type: 'example';
  title?: string;
  lists: string[];
};

type ContentItem = LinkContent | DepositCheckContent | TextContent | ExampleContent;

type PrecautionItem = {
  trigger: string;
  checkPoints?: string[];
  contents: ContentItem[];
};

export type Precaution = {
  title: string;
  items: PrecautionItem[];
};

export const BEFORE_CONTRACT_PRECAUTION_DATA: Precaution[] = [
  {
    title: '집이 안전한지 꼭 확인하세요!',
    items: [
      {
        trigger: '🏠 주택 시세 확인하기',
        checkPoints: ['보증금이 시세의 80% 이하인지, 국토부 실거래가·KB시세로 비교하세요.'],
        contents: [
          {
            title: '시세 알아보기',
            type: 'link',
            lists: [
              {
                title: '국토교통부 실거래가 공개시스템',
                description: '',
                url: 'https://rt.molit.go.kr',
              },
              {
                title: 'KB 시세',
                description: '',
                url: 'https://kbland.kr/benefit?xy=37.5205559,126.9265729,17',
              },
              {
                title: '부동산테크 시세',
                description: '',
                url: 'https://rtech.or.kr/main/main.do',
              },
              {
                title: '부동산 공시가격',
                description: '',
                url: 'https://www.realtyprice.kr/notice/main/mainBody.htm',
              },
              {
                title: '국세청에서 공시한 오피스텔 기준 가격 참고',
                description: '오피스텔인 경우',
                url: 'https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3',
              },
            ],
          },
          {
            title: '적정 보증금인지 확인하기',
            description: '현재 보증금이 적정 보증금인지 확인해보세요',
            type: 'deposit-check',
          },
        ],
      },
      {
        trigger: '📄 등기부등본 확인하기',
        checkPoints: [
          '1. 집의 소유자가 임대인과 동일한지 확인해요.',
          '2. 압류, 가압류, 강제 경매 등 권리 침해사항이 없는지 확인해요.',
          '3. 주택에 설정된 근저당권이 과도하지 않은지',
          '(근저당권 설정 금액이 주택가격의 60% 를 넘지 않는지) 확인해요.',
        ],
        contents: [
          {
            type: 'link',
            lists: [
              {
                title: '대법원 인터넷 등기소',
                description: '등기사항전부증명서 발급',
                url: 'https://www.iros.go.kr',
              },
            ],
          },
        ],
      },
      {
        trigger: '🗂️ 건축물대장 확인하기',
        checkPoints: [
          '1. 위반건축물은 아닌지',
          '(건축물대장 상단에 위반건축물 표시가 없는지) 확인해요.',
          '2. 건물 용도가 주택이 맞는지 (근린생활시설은 아닌지) 확인해요.',
          '3. 건물의 동호수가 건축물 대장상 동호수와 일치하는지 확인해요.',
        ],
        contents: [
          {
            type: 'link',
            lists: [
              {
                title: '정부24',
                description: '건축물대장 발급',
                url: ' https://plus.gov.kr',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '다가구 주택인 경우 선순위 임차보증금 규모가 주택 가격에 비해 과도하지 않은지 확인하세요.',
    items: [
      {
        trigger: '📊 선순위 임차보증금 규모 비교하기',
        contents: [
          {
            type: 'text',
            lists: [
              '방법 1: 공인중개사에게 선순위 임차보증금 등 권리관계 확인·설명 요구',
              '방법 2: 주민센터 또는 대법원 인터넷등기소에서 열람',
              '(임대인 동의가 필요할 수 있음)',
              '방법 3: 선순위보증금 정보에 대한 불일치 시 계약 해제 특약을 넣어 계약 진행',
            ],
          },
        ],
      },
    ],
  },
];

export const IN_CONTRACT_PRECAUTION_DATA: Precaution[] = [
  {
    title: '주택소유자, 대리인, 공인중개사, 계약 내용, 특약사항 이 5가지를 확인하세요!',
    items: [
      {
        trigger: '🙋🏻‍♂️ 주택소유자',
        contents: [
          {
            type: 'text',
            lists: [
              '1.계약을 체결하러 나온 사람이 등본상 집주인이 맞는지',
              '2. 임대인의 신분증을 제시하는지',
              '3. 등기부등본 상 임대인이 여러명인 경우 임대인 모두와 계약 하는지',
            ],
          },
        ],
      },
      {
        trigger: '👩🏻‍💼 대리인',
        contents: [
          {
            type: 'text',
            lists: [
              '1. 집주인 대신 나온 사람이 위임장을 가지고 있는지',
              '2. 위임장에 집주인과 대리인의 인적 사항, 집 주소,보증금 등 계약조건, 보증금을 받을 사람이 명시되어 있는지',
            ],
          },
        ],
      },
      {
        trigger: '‍🏘️ 공인중개사',
        contents: [
          {
            type: 'text',
            lists: [
              '1. 개업 공인중개사가 맞는지, 공인중개사 본인이 맞는지',
              '2. 주택의 권리 관계와 시설 등에 대한 설명이 적힌 ‘중개대상물 확인서’를 교부하고 내용을 설명해 주는지',
              '3. 공제증서를 교부하는지',
            ],
          },
        ],
      },
      {
        trigger: '‍📋 계약 내용',
        contents: [
          {
            type: 'text',
            lists: [
              '1. 임차하는 주택의 주소 , 면적이 건축물대장 , 등기부등본과 일치하는지',
              '2. 임대인 , 공인중개사의 인적사항이 정확하게 작성되었는지',
              '3. 계약 시작일자와 종료일시가 정확하게 명시되어 있는지',
              '4. 보증금과 월세를 납부하는 날짜와 입금하는 계좌가 명시되어 있는지',
              '5. 관리비에 포함된 세부 내역과 부담주체가 명시되어 있는지',
            ],
          },
        ],
      },
      {
        trigger: '⭐️ 특약사항',
        contents: [
          {
            type: 'text',
            lists: ['1. 안전한 계약을 위한 특약사항 요구하기'],
          },
          {
            type: 'example',
            title: '특약사항 예시',
            lists: [
              'EX 1) 전세보증금반환보증에 가입할 수 없을 경우 계약을 무효로 하고 보증금을 반환한다.',
              'EX 2) 계약서를 작성한 날부터 계약 시작일 다음날까지 담보권 설정, 소유권변경등의행위를하지않는다.',
              'EX 3) 임차인의 잔금지급일 전까지 담보물권을 해소한다.',
            ],
          },
          {
            type: 'text',
            lists: [
              '2.임차인에게 일방적으로 불리한 특약사항은 없는지 확인하기',
              '3. 임대인이 구두로 약속한 내용이 특약사항에 반영되어 있는지 확인하기',
            ],
          },
        ],
      },
    ],
  },
];
export const AFTER_CONTRACT_PRECAUTION_DATA: Precaution[] = [
  {
    title: '사는 도중 임대인이 바뀌었다면?',
    items: [
      {
        trigger: '🏚️ 주택 상태 확인',
        contents: [
          {
            type: 'text',
            lists: [
              '1. 잔금 치르기 전 확인한 등기부등본에 변동사항은 없는지 확인해요.',
              '2. 집 상태가 계약조건과 동일한지 확인해요.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: '계약 기간이 끝나도 임대인이 보증금을 돌려주지 않는다면?',
    items: [
      {
        trigger: '🔑 대항력 확인',
        contents: [
          {
            type: 'text',
            lists: ['1. 집 열쇠를 모두 받아야 (출입문 비밀번호 전달 받아야) 해요. ', '2. 전입신고를 해야해요.'],
          },
          {
            type: 'example',
            title: '대항력이란?',
            lists: [
              '대항력이란 내가 사는 집에 대한 권리를 주장할 수 있는 힘을 말해요. 내가 살고있는 집의 주인이 바뀌어도 계약을 유지할 수 있어요. 만약 집이 경매로 넘어갔다면 보증금을 돌려 받을 수 있는 조건 중 필수 요건이 대항력이에요. 대항력을 얻으려면 입주 + 전입신고 이 2가지 조건이 만들어져야해요  이 2가지 조건이 충족 다음날 0시부터 대항력이 만들어져요. 입주날짜는 따로 공식적으로 기록되지 않으니 열쇠 인수/인도 확인서(임대인·중개사 서명) 공과금 개통/사용 시작 증빙(전기·가스·수도 개통일 통지, 첫 고지서 등) 이사 영수증·사진(짐 반입) 등의 증거를 남겨놓는 것이 좋아요!',
            ],
          },
        ],
      },
      {
        trigger: '📜 우선변제권 확인',
        contents: [
          {
            type: 'text',
            lists: ['전세계약서를 작성하고 즉시 확정일자를 받아야 해요.'],
          },
          {
            type: 'example',
            title: '우선변제권이란?',
            lists: [
              '우선변제권은 집이 경매/공매로 넘어갔을 때 다른 채권자보다 앞서 보증금을 배당받을 수 있는 권리에요. 경매대금이 모자랄 때 좀 더 앞줄에 서서 보증금을 더 안전하게 회수할 수 있어요 반대로 순위가 낮다면 덜 받거나 못 받을 수도 있겠죠? 우선변제권을 갖기 위해서는 앞서 설명한 대항력을 갖추고 확정일자를 받아야 해요. 결국 입주 + 전입신고 + 확정일자 조건이 충족돼야 대항력 및 우선변제권을 얻을 수 있는 거예요. 확정일자는 이사 전에도 임대차 계약서만 있다면 받을 수 있어요. 그래서 계약서를 작성한 날에 바로 발급받기를 권해요.',
            ],
          },
        ],
      },
    ],
  },
];
