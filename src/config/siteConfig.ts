import { SiteConfig, SubscriptionConfig } from '../types/news';

export const siteConfig: SiteConfig = {
  name: '만날신문',
  nameEn: 'MANNAL DAILY',
  tagline: '깊이 있는 정보, 미래를 여는 통찰',
  description: '테크/IT, 경제/투자, 사회/환경을 중심으로 복잡한 현대 사회의 이슈를 명쾌하게 해설하는 온라인 종합일간지입니다.',
  publisher: '김만날 [운영자 입력 필요]',
  editorInChief: '이통찰 [운영자 입력 필요]',
  youthProtectionOfficer: '박준수 [운영자 입력 필요]',
  registrationNumber: '서울 아 05892호 [운영자 입력 필요]',
  registrationDate: '2026년 01월 05일',
  firstPublishDate: '2026년 02월 01일',
  businessNumber: '123-45-67890 [운영자 입력 필요]',
  address: '서울특별시 중구 세종대로 110 만날미디어타워 8층 [운영자 입력 필요]',
  phone: '02-1588-0000',
  email: 'contact@mannaldaily.kr',
  copyright: '© 2026 만날신문. All rights reserved.',
  disclaimer: '기사 내용의 무단 전재 및 재배포를 금합니다. 본 웹사이트의 모든 기사는 데모 시연용 샘플 콘텐츠입니다.',
  categories: [
    {
      slug: 'tech',
      label: '테크/IT',
      description: '인공지능, 반도체, 미래 교육, 스마트 제조 등 산업 혁신의 최전선',
      badgeColor: '#1E3A8A',
    },
    {
      slug: 'economy',
      label: '경제/투자',
      description: '거시경제 흐름, 금융시장 분석, 3040 자산관리와 신성장 산업 동향',
      badgeColor: '#065F46',
    },
    {
      slug: 'society',
      label: '사회/환경',
      description: '탄소중립, 스마트시티, 기후 테크, 지역 균형과 지속가능한 미래 사회',
      badgeColor: '#047857',
    },
    {
      slug: 'politics',
      label: '정치',
      description: '디지털 입법, 미래 세대를 위한 정책 연구 및 합리적 공론장',
      badgeColor: '#4338CA',
    },
    {
      slug: 'world',
      label: '국제',
      description: '글로벌 공급망, 외교 지정학, 해외 신기술 트렌드와 국제 연대',
      badgeColor: '#B45309',
    },
    {
      slug: 'culture',
      label: '문화',
      description: 'K-콘텐츠 글로벌 생태계, 미디어 아트, 디지털 인문학과 라이프스타일',
      badgeColor: '#9D174D',
    },
  ],
};

export const subscriptionConfig: SubscriptionConfig = {
  regularMonthlyPrice: 4900,
  lifetimeDiscountRate: 80,
  // 80% discount off standard annual baseline
  lifetimeSpecialPrice: 29400,
  currency: 'KRW',
  eventBannerText: '창간 특별 혜택 · 평생 구독 80% 할인',
  eventSubText: '깊이 있는 뉴스와 미래 통찰을 오래도록 만나보세요.',
  conditionsUrl: '/policy/terms#subscription',
  features: [
    {
      title: '심층 기획 리포트 무제한 열람',
      description: '전문 취재진의 독점 분석과 산업 동향 해설서를 제한 없이 열람합니다.',
      isPremium: true,
    },
    {
      title: '광고 없는 쾌적한 독서 환경',
      description: '배너와 후원 광고를 최소화하여 기사 본문과 데이터에만 집중할 수 있습니다.',
      isPremium: true,
    },
    {
      title: '프리미엄 모닝 브리핑 뉴스레터',
      description: '매일 아침 7시, 당일 놓치면 안 될 핵심 인사이트를 요약해 메일함으로 전송합니다.',
      isPremium: true,
    },
    {
      title: '관심 분야 맞춤 아카이빙 & 알림',
      description: '나의 관심 산업과 기자를 등록하고 새 기사와 분석 자료를 실시간으로 저장합니다.',
      isPremium: true,
    },
    {
      title: '오프라인 포럼 및 독자 좌담회 우선 초대',
      description: '만날신문 주최 미래 산업 컨퍼런스와 편집국 대담 행사에 특별 할인 초청됩니다.',
      isPremium: false,
    },
  ],
  faq: [
    {
      question: '평생 구독 상품의 실제 결제 및 이용 기간은 어떻게 되나요?',
      answer: '평생 구독권은 1회 결제 시 추가 정기 결제 없이 만날신문의 유료 디지털 콘텐츠 및 구독자 전용 혜택을 영구적으로 이용할 수 있는 창간 특별 기념 상품입니다. (단, 서비스 중단 등 불가피한 사유 발생 시 잔여 기간에 따른 소비자 보호 정책 적용)',
    },
    {
      question: '기존 월 구독 회원도 평생 구독으로 전환할 수 있나요?',
      answer: '네, 가능합니다. 기존 정기 구독 잔여 기간에 대해 일할 계산하여 환불 또는 평생 구독 결제 시 크레딧 차감 혜택을 적용해 드립니다.',
    },
    {
      question: '중도 해지 및 환불 규정은 어떻게 구성되어 있나요?',
      answer: '결제 후 7일 이내에 유료 독점 리포트를 3건 이하로 열람한 경우 전액 환불이 가능합니다. 7일 경과 후에는 표준 디지털 콘텐츠 이용약관에 따라 수수료를 제외한 금액이 반환됩니다. 자세한 사항은 [이벤트 조건 확인] 링크의 약관을 참고해 주시기 바랍니다.',
    },
    {
      question: '회원 1인당 몇 대의 기기에서 동시 접속이 가능한가요?',
      answer: '스마트폰, 태블릿, PC 등 최대 5대의 기기에서 로그인하여 이용하실 수 있어 어디서나 끊김 없이 뉴스를 읽으실 수 있습니다.',
    },
    {
      question: '결제 수단은 어떤 것들이 지원되나요?',
      answer: '신용카드, 체크카드, 간편결제(카카오페이, 네이버페이, 토스페이), 계좌이체 등 국내 모든 주요 결제 수단을 지원합니다. (현재 시연 버전에서는 결제 연동 전 신청 데모 모드로 진행됩니다.)',
    },
  ],
};
