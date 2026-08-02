---
category: Tooling
topic: transpiler
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/tooling
  - status/ai-draft
---

# Tooling - 트랜스파일러

## 질문

트랜스파일러는 무엇이고, 번들러와는 어떤 역할 차이가 있나요?

## 최적 답변

트랜스파일러는 소스 코드를 같은 수준의 다른 소스 코드로 변환하는 도구입니다. 프론트엔드에서는 TypeScript를 JavaScript로 바꾸거나, JSX를 함수 호출 형태로 바꾸거나, 최신 JavaScript 문법을 더 넓은 브라우저가 이해할 수 있는 문법으로 바꾸는 데 사용합니다.

번들러가 여러 모듈을 따라가 배포용 파일 묶음을 만드는 도구라면, 트랜스파일러는 개별 코드의 문법을 변환하는 도구에 가깝습니다. 실제 빌드 도구에서는 두 역할이 함께 엮이는 경우가 많지만, 면접에서는 “번들러는 모듈을 묶고 최적화한다, 트랜스파일러는 문법을 변환한다”로 구분하면 됩니다. 정리하면 트랜스파일러는 코드의 실행 의미를 유지하면서 실행 환경이 이해할 수 있는 문법으로 바꾸는 도구입니다.

## 대표 도구/라이브러리

- Babel: 플러그인 생태계가 크고, 최신 JavaScript와 JSX 변환에 오래 쓰여 온 도구입니다.
- SWC: Rust 기반으로 빠른 JavaScript, TypeScript, JSX 변환을 제공합니다.
- esbuild: Go 기반으로 매우 빠른 변환과 번들링을 제공합니다.
- TypeScript compiler(tsc): TypeScript 타입 검사와 JavaScript 출력에 사용합니다.
- Sucrase: 개발 환경에서 빠른 TypeScript, JSX 변환을 목표로 하는 도구입니다.

## 예시 코드

```tsx
const title: string = 'React';
const element = <h1>{title}</h1>;
```

트랜스파일 이후에는 타입 주석이 사라지고, JSX는 자바스크립트 호출 형태로 바뀝니다.

```js
const title = 'React';
const element = jsx('h1', { children: title });
```

실제 출력 형태는 사용하는 JSX runtime과 도구 설정에 따라 달라질 수 있지만, 핵심은 실행 환경이 이해하지 못하는 TypeScript·JSX 문법을 JavaScript로 바꾸는 것입니다.

## 반드시 포함할 키워드

- 트랜스파일러
- Babel/SWC/esbuild/tsc
- TypeScript 변환
- JSX 변환
- 최신 문법 변환
- 번들러와 차이

## 한 줄 요약

트랜스파일러는 TypeScript·JSX·최신 JavaScript 문법을 실행 환경이 이해할 수 있는 JavaScript로 바꾼다.

## 관련 노트

- [[Tooling - 파서와 AST]]
- [[Tooling - 번들러]]
