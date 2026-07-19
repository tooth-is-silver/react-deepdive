---
category: React
topic: context-render
difficulty: junior-3
status: review
score: 85
last_reviewed: 2026-07-12
next_review: 2026-07-16
tags:
  - interview/react
  - status/review
---

# React - Context value 최적화

## 질문

Provider를 가진 부모의 state가 바뀔 때 Context consumer가 왜 다시 렌더링될 수 있나요?

## 최적 답변

버튼을 누를 때마다 consumer 컴포넌트가 렌더링될 수 있습니다. 이유는 두 가지입니다.

첫째, 부모 state가 바뀌면 Provider를 가진 부모 컴포넌트가 다시 렌더링되고, 기본적으로 자식 컴포넌트도 다시 렌더링 대상이 될 수 있습니다.

둘째, Provider의 `value`로 객체 리터럴을 직접 전달하면 부모가 렌더링될 때마다 새 객체 참조가 만들어집니다. Context consumer는 Provider의 value가 변경되면 다시 렌더링되므로, 내부 값이 같아 보여도 참조가 달라지면 consumer가 다시 렌더링될 수 있습니다.

개선하려면 고정 값은 컴포넌트 밖으로 빼거나 `useMemo`로 value 참조를 안정화하고, 필요하다면 consumer를 `React.memo`로 감싸거나 state를 별도 컴포넌트로 분리해 Provider가 불필요하게 리렌더되지 않도록 구조를 나눌 수 있습니다.

## 반드시 포함할 키워드

- Context Provider
- value 참조
- consumer 리렌더링
- 부모 리렌더
- useMemo
- React.memo
- 구조 분리

## 한 줄 요약

Context 최적화는 value 참조 안정화만 보면 부족하고, Provider를 가진 부모가 왜 리렌더되는지도 같이 봐야 한다.

## 관련 노트

- [[React - React.memo와 객체 props]]
- [[React - render phase와 commit phase]]
