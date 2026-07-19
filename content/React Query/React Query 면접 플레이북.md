# React Query 면접 플레이북

## 서버 상태

- [[React Query - 서버 상태와 클라이언트 상태]]
- [[React Query - queryKey 설계]]

## Mutation

- [[React Query - mutation 후 invalidate]]
- [[React Query - optimistic update]]

## 핵심 문장

서버 상태는 원본이 서버에 있고, 클라이언트는 그 스냅샷을 캐시해서 보는 상태다. 따라서 loading, error, data뿐 아니라 캐싱, stale 여부, refetch, 중복 요청 제거, retry, race condition까지 함께 고려해야 한다.
