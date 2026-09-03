---
category: Lint
topic: lint-vs-typecheck
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - 린트와 타입 검사 경계

## 질문

ESLint와 타입 검사(tsc)는 역할이 어떻게 갈리나요? 겹치는 부분은 없나요?

## 최적 답변

tsc는 타입 정합성을 봅니다. 값의 타입이 서로 맞는지, 없는 속성에 접근하지 않는지처럼 타입 시스템으로 표현되는 정확성을 검사합니다. ESLint는 타입으로 표현되지 않는 패턴과 베스트 프랙티스, 팀 규칙, 버그가 되기 쉬운 습관을 봅니다. 훅 규칙, 쓰지 않는 변수, 위험한 비교, 특정 import 금지 같은 것입니다.

겹치는 부분도 있습니다. 쓰지 않는 지역 변수는 tsc의 `noUnusedLocals`로도, ESLint의 `no-unused-vars`로도 잡힙니다. 이럴 때는 보통 한 곳에서만 켜서 중복 경고를 피하고, 프로젝트에 따라 린트 쪽으로 통일하는 편입니다. 정리하면 tsc는 "타입이 맞는가", ESLint는 "타입 밖의 규칙과 패턴이 옳은가"를 맡고, 둘 다 정적 분석이지만 검사하는 대상이 다릅니다.

## 반드시 포함할 키워드

- tsc는 타입 정합성
- ESLint는 패턴·규칙·습관
- 타입으로 표현 안 되는 것은 린트
- noUnusedLocals vs no-unused-vars 겹침
- 중복은 한쪽만 켬

## 자주 틀리는 표현

- ESLint가 타입 에러도 잡아주니 tsc가 필요 없다.
- 타입 기반 린트 룰이 곧 타입 검사와 같은 것이다.

## 한 줄 요약

tsc는 타입 정합성을, ESLint는 타입 밖의 패턴·규칙·습관을 맡으며, no-unused-vars처럼 겹치는 검사는 한쪽만 켜 중복을 피한다.

## 관련 노트

- [[Lint - 정적 분석과 동적 분석]]
- [[Lint - 타입 기반 린트]]
