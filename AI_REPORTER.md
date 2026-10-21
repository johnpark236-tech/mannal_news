# 전하리 AI 기자 자동 발행

GitHub Actions `AI reporter - every 30 minutes`가 매시 7분/37분(UTC, 한국 시간도 동일한 분)에 공식 RSS를 확인합니다. GitHub 예약 실행은 지연될 수 있어 정확한 30분 SLA는 아닙니다.

## 시작

1. 저장소 Settings → Secrets and variables → Actions → New repository secret에 `GEMINI_API_KEY`를 등록합니다. 브라우저 코드에 넣지 않습니다. Gemini API 사용량/요금은 해당 키 계정에 적용됩니다.
2. 선택 사항: Actions variable `GEMINI_MODEL`로 사용 가능한 모델을 지정합니다. 기본값은 `gemini-2.5-flash`입니다.
3. Actions → AI reporter - every 30 minutes → Run workflow를 실행하고 성공 여부를 확인합니다. 기본 브랜치에 워크플로가 있으면 예약 실행됩니다.

## 발행 원칙

- OpenAI, Google AI, Microsoft AI, NVIDIA의 공식 RSS 중 최근 72시간 발표만 대상으로 합니다.
- 실행당 최대 1건, 원문 URL 중복 방지. 신규 발표가 없거나 근거가 부족하면 건너뜁니다.
- 실제 제품 이미지가 아닌 자체 SVG 편집 그래픽을 포함합니다.
- 핵심 요약 3줄, 발표 내용, 활용 제안, 20분 수업, 실습 프롬프트, 주의사항, 마무리 멘트를 제공합니다.
- 공식 원문 링크/발표일, AI 자동 작성 표시를 노출합니다. 모델이 사실을 잘못 해석할 수 있으므로 편집 검토가 필요합니다.
- 현재 근거는 공식 RSS 제목과 설명입니다. 본문에 없는 구체적 수치·기능은 추측하지 않도록 지시합니다. 장문 원문 전체를 복제하지 않습니다.
- 키/네트워크/형식 검증 실패 시 발행하지 않고 Actions를 실패 처리합니다.
- 자동 기사는 `public/data/ai-news.json`, 이미지는 `public/images/ai-auto-*.svg`에 저장합니다. 독자 화면은 5분마다 새 목록을 확인합니다.
- 중지: Actions에서 워크플로를 Disable workflow. 삭제/정정: JSON에서 해당 기사를 수정하고 커밋합니다.
- 무료 공개 저장소의 예약 워크플로는 장기 비활동 시 GitHub에 의해 비활성화될 수 있습니다.

기존 데모 콘텐츠와 구독/댓글 등 다른 기능은 유지합니다. 기존 Dots 기사의 사실관계는 이 작업에서 재검증하지 않았습니다.
