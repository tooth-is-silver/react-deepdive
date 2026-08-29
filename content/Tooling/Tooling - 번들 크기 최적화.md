---
category: Tooling
topic: bundle-size
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/tooling
  - status/ai-draft
---

# Tooling - 번들 크기 최적화

## 질문

번들 크기는 어떻게 측정하고, 줄이려면 어떤 방법이 있나요?

## 최적 답변

측정부터 말합니다. Vite는 빌드할 때마다 청크별 크기와 gzip 크기를 찍어주고, `rollup-plugin-visualizer`를 붙이면 어떤 모듈이 그 크기를 차지하는지 트리맵으로 볼 수 있습니다. 웹팩이면 `webpack-bundle-analyzer`가 같은 역할을 합니다.

줄이는 방법은 셋으로 나뉩니다. 라우트 단위로 코드를 쪼개서 첫 화면에 필요 없는 것을 나중에 받게 하고, 무거운 라이브러리를 가벼운 것으로 바꾸고, 트리 셰이킹이 되도록 필요한 것만 이름으로 가져옵니다. 배럴 파일을 거쳐 가져오면 쓰지 않는 모듈까지 딸려 들어올 수 있어 주의합니다.

CSS도 대상입니다. 컴포넌트 라이브러리 스타일시트를 통째로 넣으면 실제로 쓰는 컴포넌트가 몇 개뿐이어도 자바스크립트보다 CSS가 더 커질 수 있어, 필요한 것만 가져오거나 사용하지 않는 규칙을 걷어냅니다.

## 예시 코드

```ts
// 라우트 단위 코드 스플리팅
const Settings = lazy(() => import('./pages/Settings'));

// 트리 셰이킹: 필요한 것만 이름으로 가져오기
import { debounce } from 'lodash-es'; // O
// import _ from 'lodash';            // X (전체가 딸려옴)
```

## 반드시 포함할 키워드

- 번들 애널라이저로 측정
- 라우트 단위 코드 스플리팅
- 무거운 라이브러리 교체
- 트리 셰이킹(이름으로 import)
- 배럴 파일 주의

## 자주 틀리는 표현

- 코드 스플리팅만 하면 총 번들 크기 자체가 줄어든다.
- 배럴 파일(index.ts)로 모아 import하면 트리 셰이킹에 유리하다.

## 한 줄 요약

애널라이저로 어떤 모듈이 큰지 측정한 뒤, 라우트 단위 코드 스플리팅·무거운 라이브러리 교체·이름 단위 import로 트리 셰이킹을 살리고 배럴 파일 남용을 피해 번들을 줄인다.

## 관련 노트

- [[Tooling - 번들러]]
