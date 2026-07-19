---
category: TypeScript
topic: discriminated-union
difficulty: junior-3
status: mastered
score: 90
last_reviewed: 2026-07-12
next_review: 2026-07-18
tags:
  - interview/typescript
  - status/mastered
---

# TypeScript - discriminated union

## 질문

TypeScript는 왜 `response.status === 'success'` 분기 안에서만 `response.data` 접근을 허용할까요?

## 최적 답변

`ApiResponse`는 여러 객체 타입을 하나로 묶은 union type입니다. 이때 모든 케이스가 공통으로 가지는 `status` 필드가 있고, 각 케이스의 `status` 값이 `'success'`, `'error'`, `'loading'`처럼 literal type으로 구분되기 때문에 `status`는 discriminant, 즉 판별자 역할을 합니다.

TypeScript는 `response.status === 'success'` 같은 조건문을 만나면 해당 블록 안에서 `response` 타입을 success 케이스로 좁힙니다. 그래서 그 안에서는 success 케이스에만 존재하는 `data`에 안전하게 접근할 수 있습니다. 반대로 조건 없이 `response.data.name`에 접근하면 response가 error나 loading일 가능성이 남아 있고, 그 타입들에는 data가 없기 때문에 타입 에러가 납니다.

## 반드시 포함할 키워드

- union type
- discriminated union
- literal type
- status 판별자
- narrowing

## 한 줄 요약

공통 literal 필드인 `status`로 union의 케이스를 판별하고, 조건문 안에서 해당 케이스로 타입이 좁혀진다.

## 관련 노트

- [[TypeScript - never exhaustive check]]
- [[TypeScript - optional property narrowing]]
