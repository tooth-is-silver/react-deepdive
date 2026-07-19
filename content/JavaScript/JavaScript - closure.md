---
category: JavaScript
topic: closure
difficulty: junior-3
status: mastered
score: 90
last_reviewed: 2026-07-12
next_review: 2026-07-18
tags:
  - interview/javascript
  - status/mastered
---

# JavaScript - closure

## 질문

아래 코드의 출력 결과와 클로저 동작을 설명하세요.

```ts
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log(counterA());
console.log(counterA());
console.log(counterB());
console.log(counterA());
```

## 최적 답변

출력은 `1, 2, 1, 3`입니다. `createCounter`가 호출될 때마다 새로운 실행 컨텍스트와 렉시컬 환경이 만들어지고, 그 안에 `count` 변수가 생성됩니다. 반환된 `increment` 함수는 자신이 생성된 렉시컬 환경의 `count`를 참조하는 클로저입니다.

그래서 `createCounter` 실행이 끝난 뒤에도 `increment`가 참조하는 `count`는 유지됩니다. `counterA`와 `counterB`는 `createCounter()`를 각각 따로 호출해서 만들어졌기 때문에 서로 다른 `count`를 참조합니다. 따라서 `counterA`는 호출될 때마다 1, 2, 3으로 증가하고, `counterB`는 독립적인 count를 사용하므로 처음 호출 시 1을 반환합니다.

## 반드시 포함할 키워드

- 실행 컨텍스트
- 렉시컬 환경
- 클로저
- 외부 함수 실행 종료 후에도 변수 유지
- 독립적인 환경

## 한 줄 요약

클로저는 함수가 생성될 당시의 렉시컬 환경을 기억하고, 호출이 끝난 외부 함수의 변수도 계속 참조할 수 있게 한다.

## 관련 노트

- [[JavaScript - var let 클로저]]
