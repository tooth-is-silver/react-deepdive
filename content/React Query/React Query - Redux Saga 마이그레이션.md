---
category: React Query
topic: saga-to-react-query
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react-query
  - status/ai-draft
---

# React Query - Redux Saga 마이그레이션

## 질문

Redux Saga에서 React Query로 옮긴 이유는 무엇인가요? Saga가 하던 나머지 역할은 어떻게 처리하나요?

## 최적 답변

Redux와 Saga는 서버에서 온 데이터를 클라이언트 상태처럼 직접 관리하게 만듭니다. 캐싱, 로딩과 에러 상태, 중복 요청 제거, 리페치를 전부 손으로 짜야 합니다. Saga는 여기에 액션과 그 액션을 가로채는 코드까지 따로 필요해서, API 하나를 고치려면 API 코드와 캐치하는 코드와 액션 코드를 다 고쳐야 하는 보일러플레이트가 많습니다.

React Query는 서버 상태만 다루는 라이브러리라 이것들을 기본으로 줍니다. 같은 요청을 반복하지 않도록 캐싱하고, 가져오기와 다시 가져오기와 무효화를 선언적으로 처리하며, 로딩과 에러 상태를 훅이 직접 들고 있습니다. 그래서 보일러플레이트가 크게 줄어듭니다.

대신 React Query가 Saga의 모든 걸 대체하지는 못합니다. 역할로 나눕니다. 서버 상태는 React Query가 맡고, 서버 상태가 아닌 클라이언트 상태는 `useState`와 Context가 맡되 규모가 커지면 Zustand 같은 경량 상태 관리를 쓰고, 새로고침 뒤에도 남아야 하는 값만 브라우저 저장소에 둡니다.

## 반드시 포함할 키워드

- 서버 상태를 수동 관리하던 Redux·Saga
- 액션·캐치·API 보일러플레이트
- React Query는 서버 상태 전용
- 캐싱·리페치·무효화 기본 제공
- 클라이언트 상태는 별도 도구

## 자주 틀리는 표현

- React Query가 Redux를 완전히 대체하니 클라이언트 전역 상태도 필요 없다.
- Saga와 React Query는 같은 역할이라 취향 차이일 뿐이다.

## 한 줄 요약

Redux·Saga는 서버 상태를 수동 관리해 보일러플레이트가 많고, React Query는 서버 상태 전용으로 캐싱·리페치·무효화를 기본 제공하며 클라이언트 상태는 useState·Context·Zustand로 나눠 맡긴다.

## 관련 노트

- [[JavaScript - 제너레이터]]
- [[React Query - staleTime과 gcTime]]
