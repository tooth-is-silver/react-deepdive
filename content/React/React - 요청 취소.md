---
category: React
topic: request-cancellation
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react
  - status/ai-draft
---

# React - 요청 취소

## 질문

API 요청 도중에 UI가 바뀌어 컴포넌트가 언마운트되면 요청은 유지되나요? 어떻게 처리하나요?

## 최적 답변

요청 자체는 유지됩니다. `fetch`는 컴포넌트와 무관하게 브라우저가 진행하는 일이라 컴포넌트가 사라져도 계속 갑니다.

문제는 응답이 돌아온 뒤입니다. 이미 언마운트된 컴포넌트에 상태를 넣으려 하면 아무 의미 없는 갱신이 되고, 남아 있는 클로저 때문에 메모리가 붙잡히기도 합니다.

간단한 방법은 이펙트의 클린업에서 취소 여부를 표시해두고 응답이 왔을 때 그 표시를 확인해 상태를 갱신할지 정하는 것입니다. 요청 자체를 끊으려면 `AbortController`를 만들어 `fetch`에 `signal`로 넘기고 클린업에서 중단시킵니다. 페이지를 빠르게 옮겨 다닐 때 쌓이는 요청까지 없애려면 이쪽이 낫습니다.

## 예시 코드

```tsx
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/users', { signal: controller.signal });
      setUsers(await response.json());
    } catch (error) {
      if ((error as Error).name !== 'AbortError') throw error;
    }
  };

  fetchData();
  return () => controller.abort();
}, []);
```

## 반드시 포함할 키워드

- fetch는 언마운트와 무관하게 진행
- 언마운트 후 setState는 무의미
- 클린업 취소 플래그
- AbortController·signal
- 클린업에서 abort

## 자주 틀리는 표현

- 컴포넌트가 언마운트되면 진행 중인 fetch도 자동으로 취소된다.
- 언마운트 뒤 setState는 문제없이 반영된다.

## 한 줄 요약

fetch는 언마운트와 무관하게 계속 가므로, 클린업의 취소 플래그로 갱신을 막거나 AbortController의 signal을 넘겨 클린업에서 abort로 요청 자체를 끊는다.

## 관련 노트

- [[React - useEffect 클린업 함수]]
- [[React - useEffect async 함수]]
