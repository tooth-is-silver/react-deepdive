---
category: Lint
topic: codemod-vs-autofix
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - 코드모드와 autofix

## 질문

코드모드(codemod)와 린트의 autofix는 무엇이 다른가요? 언제 어느 쪽을 쓰나요?

## 최적 답변

둘 다 AST를 바꿔 코드를 고친다는 점은 같지만 목적과 수명이 다릅니다.

린트 autofix는 규칙 위반을 상시로 자잘하게 고치는 용도입니다. 규칙과 함께 저장소에 살아 있으면서 커밋할 때마다, 저장할 때마다 반복적으로 같은 종류의 위반을 정리합니다. 의미를 바꾸지 않는 안전한 수정에 한정됩니다.

코드모드는 대규모 일회성 변환입니다. 라이브러리 API가 바뀌었거나 문법을 마이그레이션할 때, jscodeshift 같은 도구로 스크립트를 짜서 수백 개 파일을 한 번에 바꿉니다. 의미를 바꾸는 큰 변환도 다루고, 다 적용한 뒤에는 스크립트를 버립니다. 정리하면 autofix는 규칙과 함께 상주하며 반복되는 안전한 수정을, 코드모드는 한 번 크게 바꾸고 사라지는 마이그레이션을 맡습니다.

## 반드시 포함할 키워드

- 둘 다 AST 변환
- autofix는 상시·반복·안전
- 규칙과 함께 상주
- 코드모드는 일회성 대규모
- jscodeshift로 마이그레이션

## 자주 틀리는 표현

- 코드모드는 규칙처럼 커밋마다 계속 돌린다.
- 대규모 API 마이그레이션도 린트 autofix로 하는 게 정석이다.

## 한 줄 요약

autofix는 규칙과 함께 상주하며 반복되는 안전한 수정을, 코드모드(jscodeshift)는 한 번 크게 바꾸고 버리는 일회성 마이그레이션을 맡는다.

## 관련 노트

- [[Lint - fixable와 suggestion]]
- [[Lint - AST와 CST]]
