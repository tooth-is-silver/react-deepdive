---
category: CSS
topic: responsive
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/css
  - status/ai-draft
---

# CSS - responsive

## 질문

반응형 웹을 구현할 때 `px`, `em`, `rem`, `%`, 뷰포트 단위는 어떻게 구분해 쓰고, 미디어 쿼리와 mobile-first는 무엇인가요?

## 최적 답변

`px`는 고정 크기라 사용자 브라우저 글꼴 설정에 반응하지 않습니다. `rem`은 루트(`html`)의 글꼴 크기를 기준으로 하므로 접근성 있는 글꼴·간격 스케일에 적합하고, `em`은 부모 요소 글꼴 크기를 기준으로 해서 컴포넌트 내부 상대 크기에 씁니다. `%`와 `vw`/`vh` 같은 뷰포트 단위는 컨테이너나 화면 크기에 비례하는 유동적 레이아웃에 씁니다.

미디어 쿼리는 뷰포트 폭 같은 조건에 따라 다른 스타일을 적용하는 문법입니다. mobile-first는 작은 화면 스타일을 기본으로 작성하고 `min-width`로 큰 화면 스타일을 점진적으로 덧붙이는 전략으로, 기본 스타일이 단순해지고 모바일 성능에 유리합니다. 실무에서는 고정 `px` 남용을 피하고 `rem`과 유동 단위, 그리고 콘텐츠가 깨지는 지점을 기준으로 한 breakpoint를 조합해서 구현합니다.

## 반드시 포함할 키워드

- rem(루트 기준)과 em(부모 기준)
- 뷰포트 단위(vw/vh)
- 미디어 쿼리
- mobile-first(min-width)
- 콘텐츠 기준 breakpoint

## 한 줄 요약

rem·유동 단위로 크기를 상대화하고, mobile-first로 작은 화면을 기본으로 두고 min-width 미디어 쿼리로 큰 화면을 덧붙인다.

## 관련 노트

- [[CSS - flex grid]]
