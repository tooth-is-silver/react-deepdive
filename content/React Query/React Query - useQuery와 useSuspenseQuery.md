---
category: React Query
topic: usequery-vs-suspense
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react-query
  - status/ai-draft
---

# React Query - useQuery와 useSuspenseQuery

## 질문

`useQuery`와 `useSuspenseQuery`는 어떻게 구분해서 쓰나요?

## 최적 답변

`useQuery`는 `isLoading`과 `isError`를 컴포넌트가 직접 분기합니다. `data`가 `undefined`일 수 있어서 로딩 처리를 컴포넌트가 떠안습니다.

`useSuspenseQuery`는 Suspense와 통합됩니다. 로딩 중에는 컴포넌트를 suspend해서 가장 가까운 `Suspense`의 fallback이 뜨고, 에러는 Error Boundary로 넘어갑니다. 데이터가 항상 정의되어 있어서 로딩과 에러 분기가 컴포넌트에서 사라집니다. 로딩·에러라는 서버 상태의 관심사를 컴포넌트 안이 아니라 상위 경계로 위임하는 방식입니다.

## 예시 코드

```tsx
// useQuery: 컴포넌트가 직접 분기, data는 undefined 가능
const { data, isLoading, isError } = useQuery({ queryKey, queryFn });
if (isLoading) return <Spinner />;
if (isError) return <Error />;

// useSuspenseQuery: 상위 Suspense/ErrorBoundary가 처리, data 항상 정의
const { data } = useSuspenseQuery({ queryKey, queryFn });
```

## 반드시 포함할 키워드

- useQuery는 isLoading·isError 직접 분기
- data가 undefined 가능
- useSuspenseQuery는 Suspense 통합
- 에러는 Error Boundary로
- data 항상 정의

## 자주 틀리는 표현

- useSuspenseQuery도 isLoading으로 로딩을 분기해야 한다.
- useMutation과 useSuspenseQuery는 같은 용도다.

## 한 줄 요약

useQuery는 로딩·에러를 컴포넌트가 직접 분기하고 data가 undefined일 수 있는 반면, useSuspenseQuery는 로딩·에러를 상위 Suspense·ErrorBoundary로 위임하고 data가 항상 정의된다.

## 관련 노트

- [[React Query - staleTime과 gcTime]]
