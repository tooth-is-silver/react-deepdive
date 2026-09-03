---
category: Lint
topic: type-aware-lint
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - 타입 기반 린트

## 질문

typescript-eslint의 타입 기반(type-aware) 린트 규칙은 일반 규칙과 무엇이 다른가요? 왜 느린가요?

## 최적 답변

보통의 린트 규칙은 AST만 보고 판단합니다. 반면 타입 기반 규칙은 타입스크립트의 타입 검사기까지 동원해, 그 값이 실제로 어떤 타입인지 알아야 판단할 수 있는 문제를 잡습니다. 대표적으로 `no-floating-promises`는 프로미스를 `await` 없이 흘려보내는 걸 잡는데, 어떤 값이 프로미스인지는 타입을 알아야 알 수 있습니다. `no-misused-promises`나 `await-thenable`도 같은 부류입니다.

이 규칙들을 켜려면 `parserOptions.project`로 타입스크립트 설정을 연결해 타입 정보를 쓸 수 있게 해야 합니다. 느린 이유가 여기 있습니다. AST만 훑는 게 아니라 프로젝트의 타입 프로그램을 만들어 타입을 계산해야 하므로, 파일 하나를 검사하는 데 그 파일이 참조하는 타입까지 따라가야 합니다. 그래서 타입 기반 룰은 큰 프로젝트에서 린트를 눈에 띄게 느리게 만들고, 캐시나 변경 파일만 검사하는 전략이 특히 중요해집니다.

## 반드시 포함할 키워드

- 일반 룰은 AST만
- 타입 기반 룰은 타입 검사기 사용
- no-floating-promises 등
- parserOptions.project 연결 필요
- 타입 프로그램 계산으로 느림

## 자주 틀리는 표현

- 모든 typescript-eslint 룰은 타입 정보를 쓴다.
- 타입 기반 룰도 AST만 보므로 일반 룰과 속도가 같다.

## 한 줄 요약

타입 기반 룰은 AST를 넘어 타입 검사기까지 써서 no-floating-promises 같은 문제를 잡으며, parserOptions.project로 타입 프로그램을 만들어 계산하느라 느리다.

## 관련 노트

- [[Lint - 린트와 타입 검사 경계]]
- [[Lint - 린트 성능]]
