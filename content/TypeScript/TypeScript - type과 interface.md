---
category: TypeScript
topic: type-vs-interface
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/typescript
  - status/ai-draft
---

# TypeScript - type과 interface

## 질문

`type`과 `interface`는 무엇이 다르고, 컴포넌트 props에는 어느 쪽을 쓰는 게 좋을까요? 같은 이름으로 다시 선언하면 각각 어떻게 되나요?

## 최적 답변

`type`과 `interface`는 추론되는 방식이 같습니다. 갈리는 지점은 셋입니다.

첫째, `interface`가 나은 지점입니다. 같은 이름으로 다시 선언하면 멤버가 합쳐지는 선언 병합이 일어나, 외부 라이브러리 타입을 원본을 건드리지 않고 넓힐 수 있습니다. `extends`로 확장할 때 결과가 캐시되기 때문에 타입이 커질수록 검사도 빠르고, 에러 메시지에도 펼쳐진 모양 대신 이름이 그대로 남아 읽기 쉽습니다.

둘째, `type`만 되는 지점입니다. 유니온과 튜플, 매핑드 타입과 조건부 타입, 원시 타입에 이름 붙이기는 인터페이스로 표현할 수 없습니다.

셋째, 그래서 기준은 모양입니다. 객체 모양을 정의하면 `interface`, 그 밖은 `type`으로 갑니다. props도 객체 모양이니 `interface`를 씁니다. 한편 `type`으로 선언한 객체는 암묵적 인덱스 시그니처를 갖지만 `interface`는 갖지 않아서, 인터페이스로 만든 값을 `Record<string, unknown>` 자리에 넘기면 거절당합니다. 인터페이스가 나중에 병합될 수 있어 컴파일러가 키 목록을 확정하지 못하기 때문이며, 선언 병합과 같은 뿌리입니다. `type`을 같은 이름으로 두 번 쓰면 합칠 대상이 없어 중복 식별자로 막힙니다.

## 예시 코드

```ts
// interface: 같은 이름 재선언 → 선언 병합(멤버 합쳐짐)
interface User { id: number; }
interface User { name: string; }
// 최종 User = { id: number; name: string; }

// type: 같은 이름 재선언 → 중복 식별자 에러
type Point = { x: number };
// type Point = { y: number }; // Error: Duplicate identifier

// type만 표현 가능
type Status = 'idle' | 'loading' | 'done'; // union
type Pair = [number, string];              // tuple
```

## 반드시 포함할 키워드

- 선언 병합(interface)
- extends 결과 캐시
- union·tuple·조건부는 type
- 인덱스 시그니처(type만 암묵적)
- 객체 모양은 interface

## 자주 틀리는 표현

- interface는 호버 시 펼쳐지지 않으니 추론이 덜 된다.
- type과 interface는 성능·추론이 완전히 동일해 아무거나 써도 된다.

## 한 줄 요약

객체 모양은 선언 병합·확장 캐시가 되는 interface, 유니온·튜플 등은 type을 쓰며, interface는 암묵적 인덱스 시그니처가 없어 Record 자리에 바로 못 넘기는 차이가 있다.

## 관련 노트

- [[TypeScript - any unknown never]]
