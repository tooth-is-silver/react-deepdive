---
category: React Query
topic: staletime-gctime
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react-query
  - status/ai-draft
---

# React Query - staleTime과 gcTime

## 질문

React Query에서 캐싱을 관리하는 `staleTime`과 `gcTime`은 각각 무엇이고 어떻게 다른가요? 버튼을 연달아 눌러도 요청이 한 번만 나가는 건 캐시 때문인가요?

## 최적 답변

캐시의 단위는 `queryKey`입니다. 키가 같으면 같은 데이터로 보므로 검색어나 페이지처럼 결과를 바꾸는 값은 전부 키에 넣어야 합니다. 빠뜨리면 조건이 바뀌어도 옛 데이터를 계속 보여줍니다.

시간 옵션은 두 개인데 서로 다른 축입니다. `staleTime`은 가져온 데이터를 신선하다고 볼 시간입니다. 이 시간 안에는 다시 마운트되거나 창에 포커스가 돌아와도 요청을 보내지 않고 캐시를 씁니다. 기본값이 0이라 받자마자 오래된 상태가 되고, 그래서 기본 설정에서는 자주 다시 가져옵니다. `gcTime`은 그 쿼리를 쓰는 컴포넌트가 모두 사라진 뒤 캐시가 메모리에 남아 있을 시간이고 기본값은 5분입니다. 이 안에 같은 화면으로 돌아오면 예전 데이터를 먼저 보여주고 뒤에서 새로 받아옵니다. 정리하면 `staleTime`은 다시 요청할지를 정하고 `gcTime`은 언제 버릴지를 정합니다.

버튼을 연달아 눌러도 요청이 한 번만 나가는 것은 캐시 때문이 아니라 같은 키로 이미 진행 중인 요청이 있으면 하나로 합치기 때문입니다. 캐시가 재사용되는 것과 중복 요청이 합쳐지는 것은 다른 이야기입니다.

## 예시 코드

```ts
useQuery({
  queryKey: ['users', keyword, page], // 결과를 바꾸는 값은 전부 키에
  queryFn: fetchUsers,
  staleTime: 60_000, // 1분간은 신선 → 재마운트·포커스에도 재요청 안 함
  gcTime: 5 * 60_000, // 구독 0개가 된 뒤 5분간 캐시 보관
});
```

## 반드시 포함할 키워드

- queryKey가 캐시 단위
- staleTime은 재요청 판단
- gcTime은 폐기 시점
- staleTime 기본 0
- 진행 중 요청 dedup

## 자주 틀리는 표현

- staleTime과 gcTime은 같은 의미다.
- 버튼 연타에 요청이 한 번만 나가는 건 캐시가 재사용되기 때문이다.

## 한 줄 요약

queryKey가 캐시 단위이고 staleTime은 다시 요청할지, gcTime은 언제 버릴지를 정하며, 연타에 요청이 한 번인 건 캐시가 아니라 같은 키의 진행 중 요청이 합쳐지기 때문이다.

## 관련 노트

- [[React Query - queryKey 설계]]
- [[React Query - useQuery와 useSuspenseQuery]]
