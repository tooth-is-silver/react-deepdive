---
category: CSS
topic: css-in-js
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/css
  - status/ai-draft
---

# CSS - CSS-in-JS

## 질문

CSS-in-JS는 무엇이고, 런타임 방식과 zero-runtime 방식은 어떤 차이가 있나요? 장단점은 무엇인가요?

## 최적 답변

CSS-in-JS는 자바스크립트 안에서 스타일을 선언하고 컴포넌트 단위로 캡슐화하는 방식입니다. 클래스명이 자동으로 고유하게 생성되어 전역 이름 충돌이 사라지고, props나 상태에 따라 동적으로 스타일을 계산할 수 있으며, 컴포넌트와 스타일을 같은 파일에 두어 응집도를 높입니다.

styled-components나 emotion 같은 런타임 방식은 브라우저에서 렌더링 시점에 스타일을 계산하고 주입합니다. 동적 스타일이 유연한 대신, 런타임 비용과 번들 크기가 늘고 SSR에서 스타일 추출을 신경 써야 합니다. 반면 vanilla-extract나 최신 zero-runtime 방식은 빌드 타임에 스타일을 정적 CSS 파일로 추출합니다. 런타임 오버헤드가 없어 성능에 유리하지만, 완전한 런타임 동적 스타일에는 제약이 있습니다. 즉 동적 유연성이 중요하면 런타임 방식, 성능과 정적 추출이 중요하면 zero-runtime 방식이 유리합니다.

## 반드시 포함할 키워드

- 스타일 캡슐화
- 고유 클래스명 생성
- 런타임 방식(styled-components/emotion)
- zero-runtime(빌드 타임 추출)
- 런타임 비용 vs 동적 유연성

## 한 줄 요약

CSS-in-JS는 JS에서 스타일을 캡슐화하는 방식으로, 런타임 방식은 동적 유연성이, zero-runtime 방식은 빌드 타임 추출로 성능이 강점이다.

## 관련 노트

- [[CSS - flex grid]]
