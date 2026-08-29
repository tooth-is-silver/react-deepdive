---
category: JavaScript
topic: generator-async
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/javascript
  - status/ai-draft
---

# JavaScript - 제너레이터

## 질문

제너레이터와 async/await는 각각 어떻게 동작하나요? redux-saga가 제너레이터를 쓰는 이유는 무엇인가요?

## 최적 답변

제너레이터는 `function*`으로 정의하고 `yield`에서 실행을 멈춘 뒤 값을 밖으로 내보냅니다. 멈춘 지점을 밖에서 `next()`로 다시 진행시킬 수 있어서, 실행 흐름의 제어권이 함수 안이 아니라 밖에 있습니다.

redux-saga가 이걸 쓰는 이유가 여기 있습니다. `yield call(api)`는 API를 부르는 게 아니라 이걸 불러달라는 지시 객체를 내놓을 뿐이고, 실제 호출은 사가 미들웨어가 합니다. 그래서 테스트할 때 진짜 요청을 보내지 않고 내놓은 지시만 비교하면 되고, 진행 중인 작업을 중간에 취소할 수도 있습니다.

async/await는 프로미스 기반이라 `await`에서 프로미스가 끝날 때까지 기다립니다. 동기 코드처럼 읽혀서 간단하지만 한 번 시작하면 중간에 끊기 어렵고, 테스트하려면 실제 호출을 가로채야 합니다. 정리하면 취소와 테스트, 복잡한 흐름 제어가 필요하면 제너레이터가 유리하고 단순한 비동기 처리는 async/await가 낫습니다.

## 반드시 포함할 키워드

- yield로 실행 중단
- next()로 제어
- call effect는 지시 객체
- 취소·테스트 용이
- async/await는 Promise 기반

## 자주 틀리는 표현

- yield call(api)가 실제로 API를 호출한다.
- 제너레이터는 async/await의 옛날 문법일 뿐 기능이 같다.

## 한 줄 요약

제너레이터는 yield에서 멈추고 밖에서 next로 제어해 실행권이 함수 밖에 있어, 사가는 이를 이용해 지시 객체만 내놓고 취소·테스트를 쉽게 만든다.

## 관련 노트

- [[React Query - Redux Saga 마이그레이션]]
