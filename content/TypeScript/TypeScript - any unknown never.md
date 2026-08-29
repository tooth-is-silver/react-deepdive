---
category: TypeScript
topic: any-unknown-never
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/typescript
  - status/ai-draft
---

# TypeScript - any unknown never

## 질문

`any`, `unknown`, `never`의 차이를 설명해 주세요. `never`와 `void`는 어떻게 다른가요?

## 최적 답변

`never`는 절대 생길 수 없는 값을 가리키는 타입입니다. 항상 예외를 던지거나 무한 루프를 도는 함수의 반환 타입이 `never`가 됩니다. 모든 타입의 하위 타입이라 bottom type이라고 부르며, `switch`에서 처리하지 않은 케이스를 컴파일 단계에서 잡을 때도 씁니다.

`unknown`은 값이 무엇인지 아직 모른다는 타입입니다. 외부 API 응답처럼 런타임에야 타입이 정해지는 값에 씁니다. 모든 타입의 상위 타입이라 top type이라고 부릅니다.

`any`도 top type이지만 아무 데나 그냥 쓸 수 있어서 타입 검사를 통째로 꺼버립니다. `unknown`은 타입을 좁히기 전에는 못 쓰기 때문에 검사가 살아 있습니다. 그래서 모르는 값에는 `any` 대신 `unknown`을 씁니다. 덧붙여 `never`와 `void`는 다릅니다. `void`는 반환값 없이 정상적으로 끝나는 함수이고, `never`는 아예 정상적으로 끝날 수 없는 함수입니다.

## 예시 코드

```ts
function fail(message: string): never {
  throw new Error(message); // 정상 종료 불가 → never
}

function log(message: string): void {
  console.log(message);     // 반환값 없이 정상 종료 → void
}

// unknown은 좁히기 전엔 사용 불가
function handle(value: unknown) {
  // value.trim();          // Error
  if (typeof value === 'string') value.trim(); // OK
}
```

## 반드시 포함할 키워드

- never는 bottom type
- unknown·any는 top type
- unknown은 좁혀야 사용
- any는 타입 검사 해제
- never vs void

## 자주 틀리는 표현

- unknown은 any와 사실상 같아서 바로 메서드를 호출할 수 있다.
- 반환값이 없는 함수의 타입은 never다.

## 한 줄 요약

never는 값이 없는 bottom type, unknown·any는 top type이며 unknown은 좁혀야 써서 검사가 살아 있고 any는 검사를 끄며, void는 정상 종료·never는 종료 불가를 뜻한다.

## 관련 노트

- [[TypeScript - never exhaustive check]]
- [[TypeScript - type과 interface]]
