---
category: Network
topic: http-method-idempotency
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/network
  - status/ai-draft
---

# Network - HTTP 메서드와 멱등성

## 질문

주요 HTTP 메서드는 각각 어떤 용도이고, safe와 멱등성(idempotent)은 무엇인가요? PUT/PATCH/DELETE 중 멱등하지 않은 것은 무엇인가요?

## 최적 답변

`GET`은 조회, `POST`는 생성이나 처리, `PUT`은 리소스 전체 교체, `PATCH`는 부분 수정, `DELETE`는 삭제에 씁니다. 여기서 safe는 서버 상태를 바꾸지 않는 성질로 `GET`·`HEAD`·`OPTIONS`가 해당하고, 멱등성은 같은 요청을 여러 번 보내도 서버의 최종 상태가 한 번 보낸 것과 같은 성질입니다. safe한 메서드는 모두 멱등하며, `PUT`(같은 값으로 교체를 반복해도 결과 동일)과 `DELETE`(이미 지워진 걸 또 지워도 최종 상태는 없음으로 동일)도 멱등합니다. 반면 `POST`는 보낼 때마다 리소스가 새로 생겨 멱등하지 않고, `PATCH`는 구현에 따라 다르지만 일반적으로 멱등성이 보장되지 않습니다.

멱등성이 중요한 이유는 네트워크 재시도 때문입니다. 응답이 유실돼 요청을 재전송할 때, 멱등한 메서드는 중복 실행돼도 안전하지만 `POST`는 재시도하면 결제나 주문이 중복 생성될 수 있습니다. 그래서 결제처럼 중복이 치명적인 요청에는 같은 키의 요청을 한 번만 처리하도록 idempotency key를 서버에 함께 보내는 방식을 씁니다. 멱등성은 "응답 코드가 매번 같다"가 아니라 "서버 상태 결과가 같다"로 판단하는 점에 주의합니다.

## 반드시 포함할 키워드

- GET·POST·PUT·PATCH·DELETE
- safe(서버 상태 불변)
- 멱등성(idempotent)
- PUT·DELETE 멱등
- POST 비멱등
- idempotency key

## 자주 틀리는 표현

- DELETE는 두 번째 요청이 404라서 멱등하지 않다.
- 멱등성은 응답 상태 코드가 항상 같다는 뜻이다.

## 한 줄 요약

safe는 서버 상태를 안 바꾸는 성질, 멱등은 여러 번 보내도 최종 상태가 같은 성질로 GET·PUT·DELETE는 멱등이고 POST·PATCH는 아니라 재시도 시 주의한다.

## 관련 노트

- [[Network - HTTP status code]]
- [[Network - Cache-Control ETag 304]]
