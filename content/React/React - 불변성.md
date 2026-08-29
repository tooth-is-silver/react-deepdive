---
category: React
topic: immutability
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react
  - status/ai-draft
---

# React - 불변성

## 질문

`useState`에서 배열이나 객체를 직접 수정하면 안 되는 이유가 무엇인가요?

## 최적 답변

리액트는 이전 상태와 새 상태를 `Object.is`로 비교해서 바뀌었는지 판단합니다. 값을 하나하나 뜯어보지 않고 참조가 같은지만 봅니다.

배열에 `push`로 값을 넣고 그 배열을 그대로 넘기면 참조가 그대로입니다. 내용은 달라졌지만 리액트가 보기엔 같은 것이라 리렌더링이 일어나지 않습니다.

그래서 새 배열을 만들어 넘겨야 합니다. 전개 연산자로 기존 항목을 펼치고 새 값을 더한 배열을 넘기면 참조가 달라져 리액트가 변화를 감지합니다. 객체도 마찬가지입니다.

## 예시 코드

```tsx
const [todos, setTodos] = useState<string[]>([]);

// 안 됨: 같은 배열 참조 → 리렌더 안 일어남
const addWrong = (todo: string) => {
  todos.push(todo);
  setTodos(todos);
};

// 됨: 새 배열 참조 → 변화 감지
const addRight = (todo: string) => {
  setTodos(previous => [...previous, todo]);
};
```

## 반드시 포함할 키워드

- Object.is 참조 비교
- push는 참조 유지
- 전개 연산자로 새 참조
- 객체도 동일

## 자주 틀리는 표현

- push 후 setState하면 내용이 바뀌었으니 리렌더된다.
- 리액트는 상태 내부 값을 깊게 비교해서 변화를 감지한다.

## 한 줄 요약

리액트는 Object.is로 참조만 비교하므로, push처럼 참조가 그대로면 리렌더가 안 일어나고 전개 연산자로 새 배열·객체를 만들어 넘겨야 변화가 감지된다.

## 관련 노트

- [[JavaScript - call by sharing]]
- [[React - render phase와 commit phase]]
