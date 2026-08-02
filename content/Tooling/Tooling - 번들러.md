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

## 대표 도구/라이브러리

- Vite: 개발 서버는 빠른 ESM 기반으로 동작하고, 프로덕션 빌드는 Rollup 계열 번들링을 사용합니다.
- Webpack: 오래 쓰인 범용 번들러로, 로더와 플러그인 생태계가 크고 설정 자유도가 높습니다.
- Rollup: 라이브러리 번들링과 tree shaking에 강점이 있습니다.
- Parcel: 설정을 적게 하고 빠르게 시작하기 좋은 zero-config 성향의 번들러입니다.
- Rspack: Webpack 호환성을 목표로 하면서 Rust 기반 성능을 내세우는 번들러입니다.
- Turbopack: Next.js 생태계에서 빠른 개발 빌드를 목표로 하는 번들러입니다.

## 예시 코드

```ts
// main.ts
import { formatPrice } from './format';
import './style.css';

console.log(formatPrice(10000));
```

```ts
// format.ts
export function formatPrice(price: number) {
  return `${price.toLocaleString()}원`;
}
```

번들러는 `main.ts`를 entry point로 보고, `format.ts`와 `style.css`까지 이어지는 import 관계를 따라 모듈 그래프를 만듭니다. 이후 브라우저가 내려받을 수 있는 자바스크립트와 CSS 파일로 묶습니다.

## 반드시 포함할 키워드

- 번들러
- 모듈 그래프
- entry point
- tree shaking
- code splitting
- source map
- Vite/Webpack/Rollup/Rspack

## 한 줄 요약

번들러는 진입점에서 모듈 그래프를 따라가 소스 코드를 브라우저가 실행할 배포용 파일 묶음으로 만든다.

## 관련 노트

- [[Tooling - 패키지 매니저]]
- [[Tooling - 트랜스파일러]]
