---
category: TypeScript
topic: optional-narrowing
difficulty: junior-3
status: review
score: 85
last_reviewed: 2026-07-12
next_review: 2026-07-16
tags:
  - interview/typescript
  - status/review
---

# TypeScript - optional property narrowing

## 질문

아래 코드는 왜 타입 에러가 날까요? 안전하게 고치려면 어떤 방법이 있을까요?

```ts
type User = {
  id: number;
  name?: string;
};

function printUserName(user: User) {
  console.log(user.name.toUpperCase());
}
```

## 최적 답변

`name?: string`은 optional property이기 때문에 `user.name`의 타입은 `string | undefined`입니다. `undefined`에는 `toUpperCase()` 메서드가 없기 때문에 바로 호출하면 타입 에러가 납니다.

안전하게 처리하려면 `if (user.name !== undefined)`처럼 먼저 undefined를 체크해서 타입을 string으로 좁힌 뒤 사용하거나, 값이 없을 때 undefined를 허용해도 된다면 `user.name?.toUpperCase()`를 사용할 수 있습니다. 기본값이 필요하다면 `(user.name ?? '이름 없음').toUpperCase()`처럼 nullish coalescing을 사용할 수 있습니다.

`user.name!` 같은 non-null assertion은 타입 에러는 없애지만 실제 런타임 안전성을 보장하지 않으므로, 값이 확실할 때만 제한적으로 사용해야 합니다.

## 개선 코드

```ts
function printUserName(user: User) {
  if (user.name !== undefined) {
    console.log(user.name.toUpperCase());
  }
}
```

또는:

```ts
function printUserName(user: User) {
  console.log((user.name ?? '이름 없음').toUpperCase());
}
```

## 반드시 포함할 키워드

- optional property
- string | undefined
- narrowing
- optional chaining
- nullish coalescing
- non-null assertion

## 한 줄 요약

optional property는 undefined 가능성이 있으므로, 사용 전에 narrowing하거나 optional chaining/default value로 처리해야 한다.

## 관련 노트

- [[TypeScript - discriminated union]]
- [[TypeScript - generic keyof]]
