---
category: React
topic: key-state
difficulty: junior-3
status: review
score: 80
last_reviewed: 2026-07-12
next_review: 2026-07-15
tags:
  - interview/react
  - status/review
---

# React - key와 state 보존

## 질문

React에서 `key={index}`를 쓰면 어떤 문제가 생길 수 있나요? 리스트 중간에 삽입/삭제/정렬이 발생하는 상황을 기준으로 설명하세요.

## 내 첫 답변

> key는 리액트 파이버 노드에 이미 그려진 컴포넌트가 변경되었는지 판단하는 기준입니다. key가 변경되면 리액트는 언마운트 후 변경된 key의 컴포넌트를 마운트합니다. index를 쓰면 순서가 바뀔 때 state 매칭이 달라질 수 있습니다.

## 피드백

### 맞은 부분

- key가 컴포넌트와 state 재사용 기준이라는 방향은 맞았다.
- index key가 순서 변경 시 문제를 만든다는 점을 잡았다.

### 부족한 부분

- “전체 리렌더”라고 표현하면 부정확하다.
- 핵심은 React가 item의 정체성이 아니라 위치를 정체성으로 착각해 기존 Fiber/DOM/state를 잘못 재사용하는 것이다.

## 최적 답변

React는 key를 기준으로 이전 리스트와 다음 리스트의 항목을 매칭합니다. key가 같으면 같은 항목으로 보고 기존 Fiber, DOM, 컴포넌트 state를 재사용합니다. 그래서 고유 id를 key로 쓰면 순서가 바뀌어도 해당 item의 state가 같이 이동합니다.

반면 index를 key로 쓰면 item의 정체성이 아니라 위치가 key가 됩니다. 중간에 삽입, 삭제, 정렬이 발생하면 React가 기존 컴포넌트와 state를 다른 item에 잘못 재사용할 수 있습니다. 특히 uncontrolled input, focus, 내부 state를 가진 Row 컴포넌트에서 값이 다른 item에 붙어 보이는 문제가 생길 수 있습니다.

## 개선 코드

```tsx
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <input defaultValue={item.name} />
        </li>
      ))}
    </ul>
  );
}
```

## 반드시 포함할 키워드

- key
- item identity
- Fiber 재사용
- DOM 재사용
- state 보존
- index key 문제

## 자주 틀리는 표현

- index key를 쓰면 무조건 전체가 리렌더된다.
- key는 단순히 리스트 렌더링 경고를 없애는 값이다.

## 한 줄 요약

key는 “이 자리에 뭐가 있냐”가 아니라 “이 item이 이전의 어떤 item이냐”를 알려주는 값이어야 한다.

## 꼬리질문

같은 위치의 같은 컴포넌트 타입이면 state가 보존되는 이유는 무엇인가?

## 관련 노트

- [[React - 같은 위치의 컴포넌트 state 보존]]
- [[React - render phase와 commit phase]]
