---
category: React
topic: derived-state
difficulty: junior-3
status: mastered
score: 95
last_reviewed: 2026-07-12
next_review: 2026-07-18
tags:
  - interview/react
  - status/mastered
---

# React - 불필요한 useEffect 제거

## 질문

props로부터 계산 가능한 값을 state와 effect로 동기화하는 코드는 왜 아쉬울까요?

## 예시 코드

```tsx
function UserName({ firstName, lastName }) {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return <div>{fullName}</div>;
}
```

## 최적 답변

이 코드는 동작은 하지만 React 관점에서는 불필요한 state와 effect를 사용하고 있습니다. `fullName`은 외부 시스템과 동기화해야 하는 값이 아니라 `firstName`, `lastName` props로부터 렌더 중 바로 계산할 수 있는 derived value입니다.

현재 코드는 첫 렌더에서 `fullName`이 빈 문자열이기 때문에 잠깐 빈 값이 렌더링될 수 있고, 이후 effect에서 `setFullName`을 호출하면서 추가 렌더가 발생합니다. props가 변경되면 컴포넌트는 다시 렌더링되므로, 렌더 중 `const fullName = `${firstName} ${lastName}``처럼 계산하면 항상 최신 props 기준으로 UI가 반영됩니다.

## 개선 코드

```tsx
function UserName({ firstName, lastName }) {
  const fullName = `${firstName} ${lastName}`;

  return <div>{fullName}</div>;
}
```

## 반드시 포함할 키워드

- derived value
- 불필요한 state
- 불필요한 effect
- 추가 렌더
- 렌더 중 계산

## 한 줄 요약

props/state에서 바로 계산 가능한 값은 state로 복사하지 말고 렌더 중 계산한다.

## 관련 노트

- [[React - props로 초기화한 state]]
- [[React - useEffect 의존성 배열]]
