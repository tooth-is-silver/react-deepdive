---
category: JavaScript
topic: this
difficulty: junior-3
status: weak
score: 60
last_reviewed: 2026-07-12
next_review: 2026-07-14
tags:
  - interview/javascript
  - status/weak
---

# JavaScript - this 바인딩

## 질문

아래 코드의 출력 결과와 이유를 설명하세요.

```ts
const user = {
  name: '가은',

  sayName() {
    console.log(this.name);
  },
};

const say = user.sayName;

user.sayName();
say();
```

## 내 첫 답변

> 둘 다 '가은'이 출력될 것 같다. `say`도 `user.sayName`으로 선언했으니 this가 user에 묶여 있을 것 같다.

## 피드백

### 맞은 부분

- `user.sayName()`에서 this가 user를 가리킨다는 점은 맞았다.

### 부족한 부분

- 메서드를 변수에 할당하면 원래 객체와의 this 바인딩이 유지된다고 착각했다.
- this는 선언 시점이 아니라 호출 방식에 따라 결정된다.

### 부정확한 표현

- “선언할 때 user.sayName으로 선언했으니 this가 user에 바인딩된다.”

## 최적 답변

첫 번째 `user.sayName()`은 `'가은'`이 찍힙니다. JavaScript의 `this`는 함수가 선언된 위치가 아니라 호출 방식에 따라 결정됩니다. `user.sayName()`처럼 객체의 메서드로 호출하면 함수 내부의 `this`는 호출 주체인 `user`를 가리킵니다.

반면 `const say = user.sayName`은 메서드 함수만 변수에 할당한 것이고, 이후 `say()`처럼 일반 함수로 호출하면 `user`와의 연결이 사라집니다. strict mode에서는 이때 `this`가 `undefined`가 되고, non-strict 환경에서는 전역 객체를 가리킬 수 있습니다. 그래서 두 번째 호출은 `'가은'`이 보장되지 않습니다.

this를 고정하려면 `user.sayName.bind(user)`처럼 bind를 사용하거나, `() => user.sayName()`처럼 객체를 유지한 채 호출하도록 감쌀 수 있습니다.

## 개선 코드

```ts
const say = user.sayName.bind(user);

say(); // '가은'
```

또는:

```ts
const say = () => user.sayName();

say(); // '가은'
```

## 반드시 포함할 키워드

- this
- 호출 방식
- 메서드 호출
- 일반 함수 호출
- strict mode
- bind

## 자주 틀리는 표현

- this는 선언 시점에 결정된다.
- user.sayName을 변수에 담아도 this는 user다.
- arrow function을 객체 메서드로 쓰면 this가 user를 가리킨다.

## 한 줄 요약

this는 함수 저장 시점이 아니라 호출 형태로 결정되고, 메서드를 변수에 떼어내면 원래 객체와의 this 바인딩은 사라진다.

## 꼬리질문

객체 메서드를 arrow function으로 작성하면 왜 this가 기대와 다르게 동작할 수 있을까?

## 관련 노트

- [[JavaScript - closure]]
- [[JavaScript - var let 클로저]]
