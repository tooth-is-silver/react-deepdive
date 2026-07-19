---
category: React
topic: stale-closure
difficulty: junior-3
status: review
score: 90
last_reviewed: 2026-07-12
next_review: 2026-07-16
tags:
  - interview/react
  - status/review
---

# React - stale closure

## 질문

아래 코드에서 버튼을 여러 번 눌러도 콘솔에는 어떤 값이 찍힐까요? 왜 그런지 useEffect 의존성 배열과 stale closure 관점에서 설명하세요.

```tsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <button onClick={() => setCount(count + 1)}>+</button>;
}
```

## 최적 답변

콘솔에는 계속 `0`이 찍힙니다. `useEffect`의 의존성 배열이 빈 배열이기 때문에 effect는 컴포넌트가 마운트될 때 한 번만 실행됩니다. 이때 effect 내부의 interval callback은 첫 렌더 시점의 `count` 값인 `0`을 클로저로 캡처합니다.

이후 버튼을 눌러 state가 변경되고 컴포넌트가 다시 렌더링되더라도, 기존 interval callback은 다시 만들어지지 않기 때문에 계속 오래된 값인 `0`을 참조합니다. 이를 stale closure라고 볼 수 있습니다. 최신 `count`를 출력하고 싶다면 의존성 배열에 `count`를 추가해서 count가 변경될 때마다 effect를 재실행하고, cleanup으로 이전 interval을 정리해야 합니다.

## 개선 코드

```tsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);
}, [count]);
```

## 반드시 포함할 키워드

- useEffect 의존성 배열
- 첫 렌더 값 캡처
- closure
- stale closure
- cleanup

## 한 줄 요약

빈 의존성 배열의 effect 안 콜백은 첫 렌더의 값을 계속 참조할 수 있다.

## 관련 노트

- [[React - cleanup이 필요한 Effect]]
- [[JavaScript - closure]]
