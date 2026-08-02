---
category: Tooling
topic: bundler
difficulty: junior-2
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/tooling
  - status/ai-draft
---

# Tooling - 번들러

## 질문

번들러는 무엇이고, 프론트엔드 프로젝트에서 왜 필요한가요?

## 최적 답변

번들러는 진입 파일부터 `import` 관계를 따라가며 모듈 그래프를 만들고, 브라우저가 실행할 수 있는 자바스크립트·CSS·에셋 묶음으로 변환하는 도구입니다. 개발자는 파일을 여러 모듈로 나눠 작성하지만, 배포 시에는 브라우저가 효율적으로 내려받고 실행할 수 있는 형태가 필요합니다.

프로덕션 빌드에서는 사용하지 않는 코드를 제거하는 tree shaking, 파일 크기를 줄이는 minification, 필요한 시점에 나눠 받는 code splitting, 디버깅을 돕는 source map 생성 같은 최적화도 함께 수행합니다. 정리하면 번들러는 흩어진 소스 코드를 배포 가능한 실행 단위로 만들고, 네트워크와 실행 성능을 고려해 최적화하는 도구입니다.

## 반드시 포함할 키워드

- 번들러
- 모듈 그래프
- entry point
- tree shaking
- code splitting
- source map
- Vite/Webpack/Rollup

## 한 줄 요약

번들러는 진입점에서 모듈 그래프를 따라가 소스 코드를 브라우저가 실행할 배포용 파일 묶음으로 만든다.

## 관련 노트

- [[Tooling - 패키지 매니저]]
- [[Tooling - 트랜스파일러]]
