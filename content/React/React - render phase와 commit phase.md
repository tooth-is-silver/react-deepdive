---
category: React
topic: render-commit
difficulty: junior-3
status: review
score: 70
last_reviewed: 2026-07-12
next_review: 2026-07-15
tags:
  - interview/react
  - status/review
---

# React - render phase와 commit phase

## 질문

부모의 state가 바뀌면 자식 컴포넌트 함수는 다시 실행될까요? 실제 DOM도 매번 새로 만들어질까요?

## 예시 코드

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child />
    </>
  );
}

function Child() {
  console.log('Child render');
  return <div>child</div>;
}
```

## 내 첫 답변

> props가 전달되지 않고 이전 컴포넌트와 비교해 변한 게 없으므로 Child render는 찍히지 않을 것 같다.

## 피드백

### 맞은 부분

- 실제 DOM이 변경되지 않을 수 있다는 방향은 맞았다.

### 부족한 부분

- 부모가 리렌더되면 기본적으로 자식 컴포넌트 함수도 다시 실행될 수 있다.
- 컴포넌트 함수 실행과 실제 DOM mutation을 구분해야 한다.

## 최적 답변

부모의 `count`가 바뀌면 `Parent`가 다시 렌더링되고, 기본적으로 자식 컴포넌트인 `Child`도 다시 렌더링되기 때문에 `Child render`는 찍힙니다. 다만 렌더링된다는 것이 실제 DOM을 매번 새로 만든다는 뜻은 아닙니다.

React는 렌더 단계에서 새로운 React element tree를 만들고 이전 Fiber tree와 비교합니다. 그 결과 `Child`가 반환하는 DOM 구조와 텍스트가 이전과 같다면 커밋 단계에서 실제 DOM 변경은 발생하지 않고 기존 DOM을 재사용합니다. 즉 컴포넌트 함수 실행과 실제 DOM mutation은 구분해야 합니다.

## 반드시 포함할 키워드

- render phase
- commit phase
- reconciliation
- Fiber
- DOM mutation
- React.memo

## 한 줄 요약

부모 리렌더는 자식 함수 실행을 유발할 수 있지만, 실제 DOM 변경은 diff 결과가 있을 때만 커밋된다.

## 꼬리질문

`React.memo`를 적용하면 이 예시에서 Child render를 막을 수 있을까요?

## 관련 노트

- [[React - React.memo와 객체 props]]
- [[React - key와 state 보존]]
