# 만날신문 클라우드 자동 발행

공통 엔진과 상세 운영 기록은 [AI 교안 저장소 운영 문서](https://github.com/johnpark236-tech/ai-instructor-update-log/blob/main/docs/cloud-publishing-operations.md)를 참조한다.

- `.github/workflows/codex-cloud-hourly-news.yml`: 매시 05분, Codex CLI 작성·독립 검수 후 커밋·push·배포·실제 뉴스 JSON/SVG 확인.
- `.github/workflows/publishing-dashboard.yml`: 매시 17분 및 발행 완료 시, 최근 24시간 결과와 90분 초과 간격 확인. 활성 실행이 없고 90분 초과 무실행이면 보충 요청.
- Summary와 발행 result artifact의 PUBLISHED만 실제 URL 확인 완료 상태다. COMMITTED/PUSHED/Actions Success와 구분한다.
- 추가 API 과금 없이 기존 구독 한도로 실행하며 한도 소진 시 다음 예약 재시도한다.
- 2026-10-25 02:41 KST 사용자 승인에 따라 기존 ChatGPT ‘만날신문 AI 기자 자동 발행’ 예약을 중지했다. 홈페이지 자동 발행은 GitHub Actions의 Codex CLI 경로로 통합했다. 다른 브리핑·알림 예약은 변경하지 않았다.
- 기사 제목의 한국어 단어 줄바꿈을 keep-all/balance로 보완했다. 화면 크기별 최종 육안 검증은 별도다.
