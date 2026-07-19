---
category: TypeScript
topic: never-exhaustive-check
difficulty: junior-3
status: review
score: 80
last_reviewed: 2026-07-12
next_review: 2026-07-16
tags:
  - interview/typescript
  - status/review
---

# TypeScript - never exhaustive check

## 질문

Union type의 모든 케이스를 switch에서 처리했는지 TypeScript로 안전하게 잡으려면 어떻게 할 수 있나요?

## 최적 답변

`switch`의 `default`에서 `never` 타입을 이용해 exhaustive check를 합니다. 모든 union 케이스를 처리했다면 default에 도달할 수 없어서 response는 never가 되어야 합니다. 그런데 `loading` 같은 케이스를 빠뜨리면 default에서 response가 never로 좁혀지지 않기 때문에 타입 에러가 나고, 누락된 분기를 컴파일 타임에 잡을 수 있습니다.

## 예시 코드

```ts
function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${value}`);
}

function getMessage(response: ApiResponse) {
  switch (response.status) {
    case 'success':
      return response.data.name;

    case 'error':
      return response.message;

    case 'loading':
      return 'loading...';

    default:
      return assertNever(response);
  }
}
```

## 반드시 포함할 키워드

- never
- exhaustive check
- union type
- switch
- 누락 분기

## 한 줄 요약

모든 union 케이스를 처리하면 남는 값은 `never`여야 한다는 점을 이용해 누락 분기를 잡는다.

## 관련 노트

- [[TypeScript - discriminated union]]
