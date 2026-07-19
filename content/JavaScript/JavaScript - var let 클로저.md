---
category: JavaScript
topic: scope-closure
difficulty: junior-3
status: weak
score: 70
last_reviewed: 2026-07-12
next_review: 2026-07-14
tags:
  - interview/javascript
  - status/weak
---

# JavaScript - var let 클로저

## 질문

아래 코드의 출력 결과와 이유를 설명하세요.

```ts
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log(j);
  }, 1000);
}
```

## 내 첫 답변

> 0, 1, 2, 0, 1, 2가 찍힐 것 같다. setTimeout이 task queue에 들어가고 먼저 등록된 순서대로 실행되기 때문이다.

## 피드백

### 맞은 부분

- `setTimeout` 콜백이 나중에 실행된다는 점은 맞았다.
- 먼저 등록된 타이머 콜백이 먼저 실행된다는 흐름은 맞았다.

### 부족한 부분

- `var`와 `let`이 반복문에서 변수를 만드는 방식이 다르다는 점을 놓쳤다.
- 콜백이 값을 복사해서 저장하는 것이 아니라 특정 스코프의 변수를 참조한다는 점을 놓쳤다.

### 부정확한 표현

- “var도 0, 1, 2를 각각 기억한다.”

## 최적 답변

출력은 `3, 3, 3, 0, 1, 2`입니다. `setTimeout` 콜백은 1초 뒤 task queue에 들어가 실행되기 때문에, 그 전에 두 반복문은 모두 동기적으로 끝납니다.

첫 번째 반복문의 `var i`는 함수 스코프라서 반복마다 새로운 `i`가 생기지 않고 하나의 `i`를 공유합니다. 반복문이 끝난 시점의 `i`는 3이고, timeout 콜백들은 모두 같은 `i` 변수를 참조하므로 3이 세 번 출력됩니다.

반면 `let j`는 블록 스코프이고 for문에서는 반복마다 새로운 렉시컬 바인딩이 만들어지기 때문에, 각 콜백이 해당 반복의 `j` 값을 따로 기억합니다. 그래서 0, 1, 2가 출력됩니다.

## 반드시 포함할 키워드

- var는 함수 스코프
- let은 블록 스코프
- for문의 let은 반복마다 새 바인딩
- 클로저
- setTimeout은 나중에 실행

## 자주 틀리는 표현

- var도 반복마다 값을 기억한다.
- setTimeout 등록 순서만 알면 답을 맞힐 수 있다.

## 한 줄 요약

var는 하나의 변수 칸을 공유해서 나중에 모두 3을 보고, let은 반복마다 새로운 바인딩을 만들어 각각 0, 1, 2를 기억한다.

## 꼬리질문

var를 사용했을 때 0, 1, 2가 찍히도록 만들려면 어떻게 고칠 수 있을까?

## 관련 노트

- [[JavaScript - closure]]
- [[JavaScript - this 바인딩]]
