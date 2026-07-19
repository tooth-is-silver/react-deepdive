---
category: Network
topic: http-cache
difficulty: junior-3
status: review
score: 75
last_reviewed: 2026-07-12
next_review: 2026-07-15
tags:
  - interview/network
  - status/review
---

# Network - Cache-Control ETag 304

## 질문

아래 HTTP 캐시 흐름을 설명하세요.

```txt
첫 번째 요청:
GET /main.js

응답:
200 OK
Cache-Control: max-age=60
ETag: "abc123"

두 번째 요청이 30초 뒤에 발생:
GET /main.js

세 번째 요청이 70초 뒤에 발생:
GET /main.js
If-None-Match: "abc123"
```

## 최적 답변

첫 번째 요청에서 브라우저는 `Cache-Control: max-age=60`과 `ETag: "abc123"`가 포함된 `/main.js` 응답을 캐시에 저장합니다. 두 번째 요청은 30초 뒤에 발생하므로 max-age 60초 안에 있고, 이 캐시는 fresh cache입니다. 따라서 브라우저는 서버에 재검증하지 않고 로컬 캐시를 바로 사용할 수 있습니다.

세 번째 요청은 70초 뒤라 max-age가 지났기 때문에 캐시는 stale 상태입니다. 이때 브라우저는 저장해둔 ETag 값을 `If-None-Match: "abc123"` 헤더에 담아 서버에 재검증 요청을 보냅니다. 서버가 `304 Not Modified`를 반환하면 리소스가 변경되지 않았다는 뜻이므로, 브라우저는 새 본문을 받지 않고 기존 로컬 캐시의 `/main.js`를 사용합니다.

## 반드시 포함할 키워드

- fresh cache
- stale cache
- max-age
- ETag
- If-None-Match
- 304 Not Modified
- 재검증

## 자주 틀리는 표현

- ETag는 캐시의 이름이다.
- If-None-Match는 해당 캐시가 없으니 새로 달라는 뜻이다.
- stale cache는 바로 버려야 한다.

## 한 줄 요약

max-age 안에서는 fresh cache를 바로 쓰고, 만료 후에는 ETag로 재검증해서 304면 기존 캐시 본문을 재사용한다.

## 관련 노트

- [[Network - HTTP status code]]
- [[Network - CORS preflight]]
