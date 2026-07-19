---
category: React Query
topic: query-key
difficulty: junior-3
status: mastered
score: 90
last_reviewed: 2026-07-12
next_review: 2026-07-18
tags:
  - interview/react-query
  - status/mastered
---

# React Query - queryKey 설계

## 질문

아래 코드에서 `category`, `page`, `sort`가 바뀌어도 잘못된 상품 목록이 보일 수 있는 이유는 무엇인가요?

```tsx
useQuery({
  queryKey: ['products'],
  queryFn: () => fetchProducts({ category, page, sort }),
});
```

## 최적 답변

React Query에서 queryKey는 서버 상태를 식별하는 키입니다. 현재 `queryFn`은 `category`, `page`, `sort`를 사용해서 서로 다른 상품 목록을 가져오는데, queryKey는 `['products']`로 고정되어 있습니다.

그러면 카테고리, 페이지, 정렬 조건이 달라도 React Query는 같은 query cache로 취급할 수 있고, 잘못된 목록을 재사용하거나 기대한 refetch가 일어나지 않을 수 있습니다. 따라서 queryFn에서 사용하는 변수는 queryKey에도 포함해야 합니다.

## 개선 코드

```tsx
useQuery({
  queryKey: ['products', category, page, sort],
  queryFn: () => fetchProducts({ category, page, sort }),
});
```

또는:

```tsx
useQuery({
  queryKey: ['products', { category, page, sort }],
  queryFn: () => fetchProducts({ category, page, sort }),
});
```

## 반드시 포함할 키워드

- queryKey
- 서버 상태 식별자
- queryFn 의존 변수
- cache
- refetch

## 한 줄 요약

queryFn이 의존하는 변수는 queryKey에도 포함해야 캐시 식별과 refetch가 정확해진다.

## 관련 노트

- [[React Query - 서버 상태와 클라이언트 상태]]
- [[React Query - optimistic update]]
