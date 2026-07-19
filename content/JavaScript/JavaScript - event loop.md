---
category: JavaScript
topic: event-loop
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/javascript
  - status/ai-draft
---

# JavaScript - event loop

## 질문

아래 코드의 출력 순서를 이벤트 루프 관점에서 설명하세요.

```ts
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');
```

## 최적 답변

출력은 `1, 4, 3, 2` 순서입니다. 자바스크립트는 싱글 스레드이고, 실행 중인 코드는 콜 스택에서 처리됩니다. 먼저 동기 코드인 `console.log('1')`과 `console.log('4')`가 콜 스택에서 바로 실행됩니다.

`setTimeout`의 콜백은 태스크 큐(매크로태스크 큐)에, `Promise.then`의 콜백은 마이크로태스크 큐에 들어갑니다. 이벤트 루프는 콜 스택이 비면 먼저 마이크로태스크 큐를 전부 비운 뒤, 매크로태스크 큐에서 하나를 꺼내 실행합니다. 그래서 마이크로태스크인 `3`이 매크로태스크인 `2`보다 먼저 출력됩니다. `setTimeout(fn, 0)`이어도 매크로태스크라서 항상 마이크로태스크 뒤로 밀립니다.

## 반드시 포함할 키워드

- 콜 스택
- 태스크 큐(매크로태스크)
- 마이크로태스크 큐
- 마이크로태스크 우선 처리
- 이벤트 루프

## 한 줄 요약

콜 스택이 비면 이벤트 루프는 마이크로태스크 큐를 먼저 모두 비운 뒤 매크로태스크를 하나 실행한다.

## 관련 노트

- [[JavaScript - Promise chain]]
- [[JavaScript - async await]]
