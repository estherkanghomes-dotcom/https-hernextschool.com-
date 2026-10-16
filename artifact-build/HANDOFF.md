# HER NEXT — 인계 패키지

## 폴더 구성
- source/ : Lovable 원본 소스 (실제 사이트 hernextschool.com용, 최신 수정 모두 반영)
- dist/ : artifact용 빌드 결과물 — index.html + assets/ 를 그대로 Artifact로 퍼블리시하면 됨
- artifact-build-overrides/ : artifact(정적 사이트)로 빌드할 때 source/ 위에 덮어쓰는 파일

## 다른 Claude에서 이어서 수정할 때 (요청 예시)
"이 artifact 링크 [링크]를 이어서 수정해줘. 첨부 zip의 README대로 source/를 수정하고,
artifact-build-overrides/를 적용해서 빌드한 뒤 같은 링크에 퍼블리시해줘. capabilities는 sample 유지."

## artifact 빌드 방법
1. source/ 복사 → src/routes/_authenticated, src/routes/lovable, src/routes/sitemap[.]xml.ts,
   src/routeTree.gen.ts, src/server.ts, src/start.ts 삭제
2. artifact-build-overrides/ 파일 배치:
   - vite.config.ts, index.html → 프로젝트 루트
   - main.tsx, stub-start.ts → src/
   - ai-planner.functions.ts, contact.functions.ts → src/lib/  (AI 플래너는 artifact의 sample 기능 사용)
3. src/routes/__root.tsx 에서 shellComponent, styles.css?url import 제거 (main.tsx가 styles.css를 import)
4. 의존성: vite@8.0.16, @vitejs/plugin-react@5.2.0, @tanstack/router-plugin@1.168.42 설치 후 `npx vite build`
5. dist/assets/index-*.js 의 U+FFFD 문자를 � 로 치환 (artifact 업로드 거부 방지)
6. dist/index.html + assets/* 를 같은 artifact URL로 퍼블리시, capabilities: { sample: {} }

## 메모
- 라우팅은 hash 방식 (#/programs 등)
- 결제는 데모 모드: src/routes/checkout.tsx 의 DEMO_MODE
- 1기 정보: src/lib/cohort.ts / 가격: src/lib/content.ts (program.pricing, program.consult)
