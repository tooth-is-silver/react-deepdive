---
category: JavaScript
topic: call-by-sharing
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/javascript
  - status/ai-draft
---

# JavaScript - call by sharing

## 질문

call by value, call by reference, call by sharing의 차이는 무엇이고 자바스크립트는 어느 쪽인가요?

## 최적 답변

call by value는 값 자체를 복사해서 넘기는 방식입니다. 숫자나 문자열 같은 원시 타입이 여기 해당하고, 함수 안에서 매개변수를 바꿔도 원본은 그대로입니다.

call by reference는 변수가 놓인 자리 자체를 넘기는 방식입니다. 함수 안에서 매개변수에 다른 값을 대입하면 원본 변수까지 바뀝니다.

자바스크립트는 둘 중 어느 쪽도 아닌 call by sharing으로 동작합니다. 객체를 넘길 때 참조값을 복사해서 넘기기 때문입니다. 그래서 매개변수의 속성을 바꾸면 같은 객체를 가리키고 있으니 원본도 바뀌지만, 매개변수에 새 객체를 통째로 대입하면 복사본만 다른 곳을 가리키게 되어 원본 변수는 그대로입니다.

## 예시 코드

```js
function mutate(user) {
  user.name = 'kim';      // 원본 객체 속성 변경 → 원본에 반영
}

function reassign(user) {
  user = { name: 'lee' }; // 매개변수만 새 객체를 가리킴 → 원본 그대로
}

const person = { name: 'park' };
mutate(person);   // person.name === 'kim'
reassign(person); // person.name === 'kim' (변화 없음)
```

## 반드시 포함할 키워드

- call by value(원시 복사)
- call by reference(변수 자리 전달)
- call by sharing
- 참조값 복사
- 속성 변경은 반영, 재할당은 미반영

## 자주 틀리는 표현

- 자바스크립트 객체는 call by reference로 전달된다.
- 함수 안에서 매개변수에 새 객체를 대입하면 원본도 바뀐다.

## 한 줄 요약

자바스크립트는 참조값을 복사해 넘기는 call by sharing이라, 속성 변경은 원본에 반영되지만 매개변수 재할당은 원본에 영향을 주지 않는다.

## 관련 노트

- [[React - 불변성]]
