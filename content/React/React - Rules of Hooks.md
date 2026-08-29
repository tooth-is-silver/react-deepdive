---
category: React
topic: rules-of-hooks
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react
  - status/ai-draft
---

# React - Rules of Hooks

## 질문

훅을 `if` 분기 안에서 호출하면 에러가 나는 이유가 무엇인가요?

## 최적 답변

리액트가 훅을 이름이 아니라 호출된 순서로 기억하기 때문입니다. 첫 번째 `useState`, 두 번째 `useState` 하는 식으로 순번에 맞춰 값을 저장하고 꺼냅니다.

훅을 조건문 안에 두면 어떤 렌더에서는 호출되고 어떤 렌더에서는 호출되지 않습니다. 그러면 순번이 밀려서, 이전에 두 번째 훅에 저장했던 값을 다음 렌더에서는 세 번째 훅이 가져가게 됩니다. 리액트는 이 어긋남을 감지하고 에러를 냅니다.

그래서 훅은 항상 컴포넌트 최상단에서 호출합니다. 조건문이나 반복문, 중첩 함수 안에 두지 않습니다. 조건이 필요하면 훅은 밖에서 부르고 그 안의 값을 조건으로 다룹니다.

## 예시 코드

```tsx
// 안 됨: 호출 순서가 렌더마다 달라짐
if (isLoggedIn) {
  const [name, setName] = useState('');
}

// 됨: 훅은 최상단, 조건은 값으로 다룸
const [name, setName] = useState('');
if (isLoggedIn) { /* name 사용 */ }
```

## 반드시 포함할 키워드

- 호출 순서로 훅 식별
- 조건문 안 호출 금지
- 순번 어긋남 감지
- 최상단에서 호출
- 조건은 값으로 처리

## 자주 틀리는 표현

- 리액트는 훅을 변수 이름으로 구분한다.
- 조건이 항상 참이면 if 안에서 훅을 호출해도 안전하다.

## 한 줄 요약

리액트가 훅을 호출 순서로 기억하므로 조건문 안에 두면 렌더마다 순번이 밀려 값이 어긋나고, 그래서 훅은 항상 최상단에서 호출하고 조건은 값으로 다룬다.

## 관련 노트

- [[React - stale closure]]
