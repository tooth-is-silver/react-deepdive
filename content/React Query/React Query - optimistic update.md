---
category: React Query
topic: optimistic-update
difficulty: junior-3
status: weak
score: 75
last_reviewed: 2026-07-12
next_review: 2026-07-15
tags:
  - interview/react-query
  - status/weak
---

# React Query - optimistic update

## 질문

체크박스를 클릭했을 때 서버 응답을 기다리지 않고 UI를 먼저 바꾸려면 optimistic update를 어떤 흐름으로 적용할 수 있나요?

## 최적 답변

Optimistic update는 mutation 요청이 성공하기 전에 UI를 먼저 성공한 것처럼 업데이트하는 방식입니다. React Query에서는 `onMutate`에서 먼저 관련 query의 진행 중인 refetch를 `cancelQueries`로 취소해서 낙관적 업데이트가 오래된 응답에 의해 덮어써지지 않도록 합니다.

그 다음 `getQueryData`로 이전 캐시 값을 snapshot으로 저장하고, `setQueryData`로 todo의 done 값을 미리 변경해 UI를 즉시 업데이트합니다. `onMutate`에서 반환한 snapshot은 `onError`의 context로 전달되므로, mutation이 실패하면 이전 캐시로 rollback할 수 있습니다. 마지막으로 성공이든 실패든 `onSettled`에서 `invalidateQueries`를 호출해 서버와 최종 상태를 다시 동기화합니다.

## 예시 코드

```tsx
const mutation = useMutation({
  mutationFn: toggleTodo,

  onMutate: async (todoId) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });

    const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

    queryClient.setQueryData<Todo[]>(['todos'], oldTodos => {
      if (!oldTodos) return oldTodos;

      return oldTodos.map(todo =>
        todo.id === todoId
          ? { ...todo, done: !todo.done }
          : todo
      );
    });

    return { previousTodos };
  },

  onError: (_error, _todoId, context) => {
    if (context?.previousTodos) {
      queryClient.setQueryData(['todos'], context.previousTodos);
    }
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

## 반드시 포함할 키워드

- optimistic update
- onMutate
- cancelQueries
- snapshot
- setQueryData
- rollback
- onError
- onSettled
- invalidateQueries

## 자주 틀리는 표현

- cancelQueries를 onSettled에서 한다.
- mutation이 성공하면 query cache가 자동으로 최신화된다.

## 한 줄 요약

onMutate에서 cancel → snapshot → optimistic cache update, onError에서 rollback, onSettled에서 invalidate로 최종 동기화한다.

## 관련 노트

- [[React Query - mutation 후 invalidate]]
- [[React Query - queryKey 설계]]
