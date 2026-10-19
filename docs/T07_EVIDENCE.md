# T07 증거 기록

> 비밀번호·토큰·비밀키 원문을 이 파일에 넣지 않는다.  
> password: `[REDACTED]`  
> Authorization: `Bearer eyJ...생략`

## 테스트 환경

- Result URL: https://dfdfewqk.github.io/Horse-Journey-Diary-ALEPH/t07/ (GitHub Pages 배포 성공 확인)
- Source: https://github.com/dfdfewqk/ALEPH-7-
- Timezone: Asia/Seoul
- Auth: Supabase Auth / Email + Password
- SDK: @supabase/supabase-js 2.117.3

## 카드 1 — 가입·로그인·로그아웃

### 회원가입
- 시각:
- 결과:
- 판정: 대기

### 로그인
- 시각:
- 결과:
- 판정: 대기

### 로그아웃
- 시각:
- 결과:
- 판정: 대기

### 비로그인 상태 직접 접속
- 요청:
- 응답:
- 판정: 대기

## 카드 2 — 비밀번호 저장

- 테스트 계정 A encrypted_password: `[캡처 시 일부 가림]`
- 테스트 계정 B encrypted_password: `[캡처 시 일부 가림]`
- 두 저장값 비교:
- 로그인 요청 password: `[REDACTED]`
- 판정: 대기

## 카드 3 — 세션/JWT

### 로그인 상태 보호 요청
- Method:
- URL:
- Authorization: `Bearer eyJ...생략`
- Status:
- Response:
- 판정: 대기

### 로그아웃 뒤 같은 요청
- Method:
- URL:
- Authorization: `Bearer eyJ...생략`
- Status:
- Response:
- 판정: 대기

## 카드 4 — 다른 사람 자료 차단

| 테스트 | 요청 | HTTP | 결과 | 판정 |
|---|---|---:|---|---|
| A → B READ |  |  |  | 대기 |
| A → B UPDATE |  |  |  | 대기 |
| A → B DELETE |  |  |  | 대기 |
| B → A READ |  |  |  | 대기 |
| B → A UPDATE |  |  |  | 대기 |
| B → A DELETE |  |  |  | 대기 |
| URL user_id 조작 |  |  |  | 대기 |
| Header user_id 조작 |  |  |  | 대기 |
| Body user_id 조작 |  |  |  | 대기 |
| 로그아웃 직접 요청 |  |  |  | 대기 |

### 공격 전후 건수
- 공격 전:
- 공격 후:
- 판정: 대기

### 목록 분리
- A 목록의 B 자료: 대기
- B 목록의 A 자료: 대기

## 카드 5 — 5일 실제 사용

| Day | 실제 날짜 | 지표 값 | 단위 | 비고 |
|---|---|---:|---|---|
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 규칙 변경 |  |  |  | Day 2 뒤 / Day 3 전 |
| 3 |  |  |  |  |
| 4 |  |  |  |  |
| 5 |  |  |  |  |

- 고정 질문:
- 지표:
- 단위:
- 계산 규칙:
- 누락값:
- 중복값:
- 이상치:
- 반올림:
- 주 시작 요일:
- 변경 전 평균:
- 변경 후 평균:
- 전체 합계:
- 전체 평균:
- 손 계산 대조:


## 카드 5B — T07 **인증된 계정의 실제 5개 날짜 사용** (2026-10-19 추가 점검)

이 표는 **서버에 저장된 사용자 소유 활동**을 근거로 한다. '별도 Day 버튼 저장' 여부와 혼동하지 않는다.

| 한국 날짜 | T07 로그인 계정 소유 서버 활동 | 실기 공부 시간 | 검증 |
|---|---|---:|---|
| 10/15 | 실기 21년 문제 공부하기 완료, 실행 기록 저장 | 76분 | 공부 시간 76분 기록 2건은 동일 시작시각·종료 약 1초 차이의 중복 의심 → 분석에서는 1회만 셈 |
| 10/16 | 자격증공부 1시간 완료, 실행 기록 저장 | 61분 | 실제 완료 시각과 저장 시각 확인 |
| 10/17 | 다음 회차 공부 및 전체 내용 복습 완료, 실행 기록 저장 | 247분 | 실제 완료 시각과 저장 시각 확인 |
| 10/18 | 실기 공부 완료, 실행 기록 저장 | 113분 | 실제 완료 시각과 저장 시각 확인 |
| **10/19** | **복습 할 일 완료 09:14:54, 하루 기준 30문제 중 30문제 완료 기록** | 시간 미측정 | **별도 학습 시간 대신 완료 이벤트 및 직접 단위 목표 기록이 존재함** |

- **판정: T07 인증된 계정으로 서로 다른 실제 날짜 5일(10/15~19)에 활동이 저장된 사실은 확인됨.** 5일 모두 당일 작업 생성·완료 이벤트가 확인된다.
- 고정 지표가 공부 시간인 실험의 **서로 비교 가능한 학습 시간은 4일(10/15~18, 중복을 1회만 계산해 합계 497분)**. 10/19의 `30문제`와 497분을 같은 단위로 합산하지 않는다.
- 서버 데이터 출처: `public.t07_tasks`, `public.t07_completion_events`, `public.t07_execution_records`, `public.t07_daily_goal_records`. 조회일 2026-10-19, 날짜 Asia/Seoul.
- 10/15 초기 실험 설정(`t07_experiment_setup`)은 존재한다.
- **별도 Day 표(`t07_daily_observations`)는 0건**. 여기서 0건이라는 이유로 앱 자체를 사용하지 않았거나 5일 저장을 하지 않았다고 판단하는 것은 잘못이며, 이를 명확히 구분한다.
- **Day 2 이후 실험 규칙 변경(`t07_rule_changes`)은 0건**으로, 해당 실험 규칙이 변경됐다는 증거는 없다. 과제 평가 시 이 항목이 별도 필수 조건인지 확인이 필요하다.
- 비밀번호와 인증 토큰 원문은 기록하지 않는다.

### T06 기록도 보존되어 있음 (별도 과제의 참고 증거)

기존 T06 `public.execution_records`, `public.daily_goal_records`에도 10월 5~11일 7일 연속의 날짜별 실제 수행 기록이 있다: **64, 72, 60, 66, 64, 67, 69분** (합계 **462분**). 다만 10/8~11 데이터 중 일부는 10/12에 사후 입력됐으므로, 이를 각 날짜의 당일 앱 접속으로 주장하지 않는다. T06 기록은 T07 인증 사용 5일 증거와 **별도로 보존·제시**한다.

## 자동 사전 점검

- T06 고정 commit ancestry: **PASS**
  - base / merge-base: `6949cabd358e0290332172c7be9604200ac7fcb7`
  - T07 source branch: `dfdfewqk/Horse-Journey-Diary-ALEPH:t07-aleph7`
- T07 HTML JavaScript 문법 검사: **PASS**
- 중복 HTML id 검사: **PASS**
- T07 테이블 anon 권한: **0건**
- 보안 Advisor: leaked-password protection 미활성화 1건만 남음
- GitHub 저장소 secret 문자열 검색:
  - `service_role` 원문: 없음
  - `sb_secret`: 없음
  - 실제 JWT / access token / refresh token 원문: 없음
- Edge Function:
  - `t07-protected` ACTIVE
  - `t07-delete-account` ACTIVE

사용자 계정과 실제 HTTP 요청이 필요한 카드 1~5 증거는 아래 대기 항목에 실제 결과만 추가한다.
