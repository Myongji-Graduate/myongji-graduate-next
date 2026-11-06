# DEV-122 이수과목 UI 검증

프론트 작업 브랜치는 `chore/agent-harness`다. DEV-122는 연결된 작업 키이며,
프론트 GitHub 이슈 번호를 뜻하지 않는다.

실제 Next 서버와 Cypress 브라우저를 stateful 합성 API에 연결한다. 과목 추가·삭제 후
목록, 졸업 결과의 남은 학점, 새로고침 유지와 실제 API 변경 요청을 확인한다.
Spring/MySQL을 연결한 시스템 E2E나 학사 규칙 계산 정확성의 증거는 아니다.

## 실행

macOS/Linux의 Node 24.x와 저장소 lockfile 의존성, Cypress 13.9.0 브라우저가 필요하다.
저장소 루트에서 실행한다. 개인 `.env`나 학생 데이터 파일을 복사하지 않는다.

```sh
npm ci --ignore-scripts
# Cypress binary가 없는 첫 환경에서만 별도 설치:
npx cypress install
node tools/agent-harness/run.mjs
```

runner가 loopback 임시 포트에 API fixture와 Next 개발 서버를 만들고 고정 spec
`cypress/e2e/takenlecture-harness.cy.ts`를 Electron에서 실행한다. 합성 로그인은
fixture 전용이며 실제 사용자 계정이 아니다. API와 parser 주소는 fixture로 지정하고
MSW 및 외부 분석 키를 비활성화한다. 브라우저의 외부 HTTPS 요청도 차단한다.
상속된 `CYPRESS_*` override는 제거하며 기존 Cypress 전체 suite는 변경하지 않는다.

전체 제한 시간은 10분, Next 기동은 2분이다. 종료·실패·SIGINT/SIGTERM 시 Next와
브라우저의 실행 소유 프로세스 그룹을 TERM/KILL하고 API 서버를 닫는다. 기존 서버를
종료하거나 점유된 포트를 비우지 않는다. CLI 자체 SIGKILL과 OS 종료에는 최종 정리를
보장할 수 없으며, 보고서가 없는 실행은 통과가 아니다.

각 그룹의 `owned-process.mjs` 리더는 실제 명령이 끝난 뒤에도 최종 그룹 신호까지 유지된다.
이미 회수된 PID를 다른 그룹의 식별자로 다시 사용하지 않는다. 실제 명령의 결과는 IPC로 전달하며,
owner 연결을 잃으면 해당 그룹을 종료한다. root 종료/정리 결과가 불확실하면 통과로 표시하지 않는다.

## 증거와 판정

`build/agent-harness/<UTC-UUID>/`에 매번 별도 산출물을 보존한다.

- `report.json`: 선택한 spec, 실제 결과, Git revision/추적 파일 diff 지문, fixture 요청,
  마지막 상태, cleanup 및 한계
- `cypress.json`, `browser.log`: Cypress 원본 결과와 실행 로그
- `next.log`, `browser-console.json`: 서버 및 브라우저 진단
- `screenshots/`: 추가·삭제 후 새로고침 화면 또는 실패 시점

정확한 spec 1개, 테스트 1개 통과, 실패/pending/skip 0, POST·DELETE 각각 1회,
최종 fixture 상태, 실행 중 추적 코드 불변, 자원 정리를 모두 확인해야 통과다.
untracked/ignored 파일은 지문에 포함하지 않는다. 공개 비교 평가에는 관련 파일을
커밋한 고정 기준선이 필요하다.

## 확인한 범위와 남은 한계

합성 기준 과목 3학점에 검증 과목 3학점을 추가하고 삭제한다. 총 기준 12학점에 대해
남은 학점이 9 → 6 → 9로 변하고 새로고침 후에도 유지되는지 확인한다.
fixture는 메모리 상태를 유지하며 브라우저만 새로고침한다. 서버 재시작 영속성은 검증하지 않는다.

추가 버튼은 visible/enabled를 확인한 후 `HTMLElement.click()`으로 한 번 활성화한다.
Cypress 13/Vaul drawer의 합성 포인터 클릭은 submit이 발생하지 않았고 Enter 입력은
POST가 두 번 발생했다. **실제 포인터·키보드 입력 호환성은 아직 확인하지 않았다.**
직접 API를 호출해 UI 동작을 대체하거나 토스트·목록·학점·요청 횟수 단언을 제거하지 않았다.
삭제 버튼의 opacity만 Cypress에서 드러내고 기존 확인 dialog를 사용한다.

기존 개발 모드 MSW가 명시적 disable 설정에도 켜지던 문제는
`NEXT_PUBLIC_API_MOCKING=enable`일 때만 시작하도록 수정했다. `dev:mock`과 `start:mock`은
`API_MOCKING=enable`과 `NEXT_PUBLIC_API_MOCKING=enable`을 함께 설정한다.

기존 head의 스타일 link에는 Suspense 경계를 추가했다. Cypress 13의 bootstrap script
삽입과 React hydration 충돌을 해결하는 [공식 이슈의 방법](https://github.com/cypress-io/cypress/issues/27204)을
적용했으며, 이 suite는 기존 support 파일의 hydration 예외 무시를 사용하지 않는다.
검색 시 React의 render 중 Router 갱신 경고는 진단에 남아 있으며, 경고가 없는
제품 전체 또는 production 빌드 검증을 주장하지 않는다.

## 실행기 회귀와 코드 검사

```sh
node --test tools/agent-harness/supervisor.test.mjs
npm test -- --runInBand --coverage=false
npm run type
npm run lint -- --file app/layout.tsx --file app/mocks/msw-component.mock.tsx --file app/mocks/msw-component.mock.test.tsx --file cypress/e2e/takenlecture-harness.cy.ts
```

실행기 회귀는 임시 저장소와 합성 Next/browser 프로세스를 사용한다. TERM을 무시하는
browser 자식까지 종료되고 실패 보고서가 남는지 확인한다. 실제 UI 성공과 구분한다.
Skill 적용 전후 효과와 운영 성능은 이 도구의 평가 범위가 아니다.

2026-11-02 확인: 전체 TypeScript 검사, 위 파일 ESLint, 중단 회귀 1개 및 실제 UI
1시나리오 통과. 최종 UI 실행 ID는
`2026-11-02T01-58-48.159Z-0311c821-3506-4abb-a6bd-209fbfa31228`이며 위 build 경로에
원본 결과가 있다. cleanup과 대상 spec 일치, POST/DELETE 각 1회도 확인했다.

2026-11-06 재확인: 종료 회귀4개, Jest14개(새 MSW 선택 검사3개 포함), 전체 type와 변경 파일 lint,
위 추가·삭제 UI1시나리오가 통과했다. UI 실행 ID는
`2026-11-06T02-00-30.393Z-976c9a59-91db-427b-847e-7cddc8859707`이다.
UI 입력 source의 실행 전후 SHA-256도 별도로 대조했다.

합성 loopback 주소와 mock/분석 비활성 설정으로 `npm run build`도 종료0으로 완료했다.
변경 범위 밖의 user query에서 React `cache` export 경고와 기존 Hook lint 경고가 발생했으므로
경고 없는 production 런타임 검증으로 해석하지 않는다. Jest의 기존 MSW query-parameter 경고도 남아 있다.

`.github/workflows/agent-harness.yml`은 dev/main 대상 관련 PR에서 unit·종료 회귀·type·lint·빌드·
합성 UI 검증을 수행하고 증거를 보존한다. 원격 실행의 현재 결과는 해당 PR checks에서 확인한다.
새 checkout의 `next-env.d.ts`는 Git에서 제외돼 있으므로 CI는 Next production build로
타입 선언을 생성한 뒤 별도 type 검사를 실행한다. 이 생성 전에는 이미지 import가 TS2307로 실패할 수 있다.
