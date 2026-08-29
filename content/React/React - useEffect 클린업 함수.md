---
category: React
topic: useeffect-cleanup
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react
  - status/ai-draft
---

# React - useEffect 클린업 함수

## 질문

`useEffect`의 클린업 함수는 무엇이고 언제 호출되나요? 어떤 값을 기준으로 실행되나요?

## 최적 답변

`useEffect`에서 반환한 함수가 클린업 함수입니다. 이펙트가 만든 부수효과를 되돌리는 자리라, 이벤트 리스너 제거나 타이머 해제, 구독 취소, 요청 취소를 여기서 합니다.

두 시점에 불립니다. 컴포넌트가 언마운트될 때 한 번, 그리고 의존성이 바뀌어 이펙트가 다시 실행되기 직전에 한 번입니다. 두 번째가 중요한데, 다시 실행되기 전에 이전 실행이 남긴 것을 치워야 구독이 겹치거나 타이머가 쌓이지 않습니다.

클린업은 이전 렌더의 props와 state를 보고 돕니다. 자기가 만든 것을 자기가 치우기 때문입니다.

## 예시 코드

```tsx
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer); // 언마운트 시 + 재실행 직전
}, [tick]);
```

## 반드시 포함할 키워드

- 반환 함수가 클린업
- 언마운트 시 호출
- 재실행 직전 호출
- 이전 렌더의 props·state 캡처
- 리스너·타이머·구독 해제

## 자주 틀리는 표현

- 클린업은 언마운트될 때만 호출된다.
- 클린업은 최신 렌더의 state를 보고 실행된다.

## 한 줄 요약

반환한 함수가 클린업으로, 언마운트 때와 의존성 변경으로 재실행되기 직전에 이전 렌더의 값을 기준으로 돌며 리스너·타이머·구독·요청을 정리한다.

## 관련 노트

- [[React - useEffect 의존성 배열]]
- [[React - 요청 취소]]
