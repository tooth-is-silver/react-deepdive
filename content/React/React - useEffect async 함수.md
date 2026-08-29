---
category: React
topic: useeffect-async
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react
  - status/ai-draft
---

# React - useEffect async 함수

## 질문

`useEffect` 콜백을 `async`로 직접 만들지 않고 안에서 async 함수를 따로 선언해 호출하는 이유는 무엇인가요? 콜백을 즉시 실행 함수로 바꾸면 어떻게 되나요?

## 최적 답변

`useEffect`의 콜백이 반환하는 값은 클린업 함수로 쓰입니다. `async` 함수를 그대로 넘기면 프로미스가 반환되므로 리액트가 그걸 클린업으로 받아들이는데, 클린업은 동기적으로 실행되어야 해서 맞지 않습니다.

그래서 콜백은 평범한 함수로 두고 그 안에 `async` 함수를 선언한 뒤 바로 호출합니다. 이러면 반환값 자리가 비어 있거나 진짜 클린업 함수를 돌려줄 수 있습니다. 부수적으로 요청 로직에 이름이 붙어 읽기 쉬워지고, 재시도 버튼 같은 곳에서 다시 부르기도 편해집니다.

컴포넌트 본문에 즉시 실행 함수를 두면 렌더링될 때마다 실행됩니다. 그 안에서 상태를 갱신하면 다시 렌더링되고 또 실행되어 요청이 끝없이 나갑니다. 의존성 배열이 없으니 언제 다시 실행할지 정할 방법도 없고, 클린업을 반환할 자리가 없어 언마운트될 때 요청을 취소하거나 구독을 끊지 못합니다. 무엇보다 렌더링 도중에 부수효과를 일으키는 셈이라 리액트가 보장하는 순서 밖에서 동작합니다. 부수효과는 화면이 커밋된 뒤에 일어나야 하고 그 자리가 `useEffect`입니다.

## 예시 코드

```tsx
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/users');
    setUsers(await response.json());
  };

  fetchData();
}, []);
```

## 반드시 포함할 키워드

- 콜백 반환값은 클린업
- async는 Promise 반환
- 클린업은 동기 실행
- IIFE는 매 렌더 실행·무한요청
- 부수효과는 커밋 이후

## 자주 틀리는 표현

- useEffect 콜백을 async로 직접 만들어도 아무 문제 없다.
- 컴포넌트 본문의 즉시 실행 함수는 useEffect와 같은 시점에 돈다.

## 한 줄 요약

콜백 반환값은 동기 클린업이라 async를 직접 넘기면 프로미스가 클린업으로 잘못 잡히므로 안에서 async 함수를 선언해 호출하고, 본문 IIFE는 매 렌더 실행·무한요청·클린업 부재로 부적절하다.

## 관련 노트

- [[React - useEffect 클린업 함수]]
- [[React - 요청 취소]]
