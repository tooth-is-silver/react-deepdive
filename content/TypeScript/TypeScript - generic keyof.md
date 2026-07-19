---
category: TypeScript
topic: generic-keyof
difficulty: junior-3
status: review
score: 75
last_reviewed: 2026-07-12
next_review: 2026-07-15
tags:
  - interview/typescript
  - status/review
---

# TypeScript - generic keyof

## 질문

객체와 key를 받아 값을 반환하는 `getValue` 함수를 타입 안전하게 작성하세요. 객체에 없는 key를 넘기면 타입 에러가 나야 합니다.

```ts
function getValue(obj, key) {
  return obj[key];
}
```

## 최적 답변

객체와 key의 관계를 타입으로 연결해야 하므로 generic을 사용합니다. `T`는 객체 전체 타입이고, `K extends keyof T`로 key가 반드시 객체에 존재하는 key 중 하나가 되도록 제한합니다. 그리고 반환 타입은 `T[K]`로 표현하면 전달한 key에 해당하는 value 타입을 그대로 반환할 수 있습니다.

## 개선 코드

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: '가은',
  email: 'gaeun@example.com',
};

const name = getValue(user, 'name');
// string

const id = getValue(user, 'id');
// number

const age = getValue(user, 'age');
// 타입 에러
```

## 반드시 포함할 키워드

- generic
- keyof
- K extends keyof T
- T[K]
- indexed access type

## 자주 틀리는 표현

- `T[K]`를 generic 선언부에 쓴다.
- `K keyof T`라고 쓴다.

## 한 줄 요약

`K extends keyof T`로 key를 객체의 실제 key로 제한하고, `T[K]`로 해당 key의 value 타입을 반환한다.

## 관련 노트

- [[TypeScript - optional property narrowing]]
- [[TypeScript - discriminated union]]
