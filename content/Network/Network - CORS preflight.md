---
category: Network
topic: cors-preflight
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/network
  - status/ai-draft
---

# Network - CORS preflight

## 질문

CORS는 왜 필요하고, simple request와 preflight 요청은 어떻게 구분되나요? preflight는 어떤 흐름으로 동작하나요?

## 최적 답변

브라우저는 동일 출처 정책(Same-Origin Policy)으로 다른 출처의 리소스 접근을 기본 차단합니다. CORS는 서버가 응답에 `Access-Control-Allow-Origin` 같은 헤더를 실어 "이 출처의 요청은 허용한다"고 명시함으로써, 브라우저가 교차 출처 응답을 스크립트에 노출해도 되는지 판단하게 하는 규약입니다. 즉 CORS는 서버를 막는 보안이 아니라, 브라우저가 응답 노출 여부를 결정하는 장치입니다.

메서드가 `GET`/`POST`/`HEAD`이고 헤더가 기본 범위이며 `Content-Type`이 `application/x-www-form-urlencoded`·`multipart/form-data`·`text/plain` 중 하나면 simple request로, 예비 요청 없이 바로 전송됩니다. 이 조건을 벗어나면(예: `PUT`/`DELETE`, `application/json`, 커스텀 헤더) 브라우저가 실제 요청 전에 `OPTIONS` 메서드로 preflight를 먼저 보냅니다. 이때 `Access-Control-Request-Method`와 `Access-Control-Request-Headers`로 무엇을 보낼지 미리 묻고, 서버가 `Access-Control-Allow-Methods`·`Allow-Headers`·`Allow-Origin`으로 허용을 응답하면 그때 실제 요청을 보냅니다. 쿠키를 함께 보내려면 `Access-Control-Allow-Credentials: true`가 필요하고, 이 경우 `Allow-Origin`에 `*`를 쓸 수 없어 구체적인 출처를 지정해야 합니다.

## 반드시 포함할 키워드

- 동일 출처 정책(SOP)
- Access-Control-Allow-Origin
- simple request
- preflight(OPTIONS)
- Access-Control-Request-Method
- Access-Control-Allow-Credentials

## 자주 틀리는 표현

- CORS는 서버가 요청을 못 받게 막는 보안이다.
- 모든 교차 출처 요청은 preflight를 먼저 보낸다.

## 한 줄 요약

CORS는 브라우저가 교차 출처 응답 노출을 판단하는 규약으로, 조건을 벗어난 요청은 OPTIONS preflight로 서버 허용을 먼저 확인한 뒤 실제 요청을 보낸다.

## 관련 노트

- [[Network - HTTP status code]]
- [[Network - 쿠키 세션 토큰]]
