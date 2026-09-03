---
category: Lint
topic: linter-vs-formatter
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - 린터와 포매터

## 질문

린터(ESLint)와 포매터(Prettier)는 역할이 어떻게 다른가요? 둘을 같이 쓸 때 충돌은 어떻게 처리하나요?

## 최적 답변

린터는 코드의 품질과 잠재적 버그, 팀 규칙을 검사하는 도구입니다. 쓰지 않는 변수, 위험한 패턴, 훅 규칙 위반처럼 "이 코드가 옳은가"를 봅니다. 포매터는 들여쓰기, 따옴표, 줄바꿈처럼 "이 코드가 어떻게 보이는가"만 다루며 의미는 건드리지 않습니다.

옛날에는 ESLint가 포맷 관련 stylistic 룰도 함께 가졌는데, 지금은 이 룰들이 코어에서 deprecated 되어 `@stylistic` 플러그인으로 빠졌습니다. 실무 흐름은 포맷은 Prettier에 온전히 맡기고, ESLint는 품질 검사에 집중하는 것입니다. 이때 ESLint의 포맷 룰과 Prettier가 충돌할 수 있어서 `eslint-config-prettier`를 마지막에 붙여 충돌하는 스타일 룰을 전부 꺼줍니다. 정리하면 린터는 옳고 그름, 포매터는 겉모양을 맡고, 겹치는 스타일 룰은 꺼서 역할을 분리합니다.

## 반드시 포함할 키워드

- 린터는 품질·버그·규칙
- 포매터는 겉모양만
- stylistic 룰은 @stylistic으로 이관
- 포맷은 Prettier에 위임
- eslint-config-prettier로 충돌 제거

## 자주 틀리는 표현

- Prettier가 코드 품질 문제도 잡아주니 ESLint가 필요 없다.
- ESLint와 Prettier는 역할이 같아 둘 중 하나만 쓰면 된다.

## 한 줄 요약

린터는 옳고 그름(품질·버그·규칙)을, 포매터는 겉모양을 맡으며, 겹치는 스타일 룰은 eslint-config-prettier로 꺼서 Prettier에 포맷을 위임한다.

## 관련 노트

- [[Lint - 정적 분석과 동적 분석]]
- [[Lint - 린트와 타입 검사 경계]]
