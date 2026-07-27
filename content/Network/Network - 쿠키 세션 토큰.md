---
category: Network
topic: cookie-session-token
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/network
  - status/ai-draft
---

# Network - 쿠키 세션 토큰

## 질문

HTTP는 무상태인데 로그인 상태는 어떻게 유지하나요? 세션 방식과 토큰(JWT) 방식은 어떻게 다르고, 쿠키의 보안 속성에는 무엇이 있나요?

## 최적 답변

HTTP는 요청 간 상태를 기억하지 않으므로, 서버가 `Set-Cookie`로 식별자를 내려주면 브라우저가 이후 요청마다 자동으로 쿠키를 실어 보내 로그인 상태를 유지합니다. 세션 방식은 실제 상태를 서버 저장소에 두고 클라이언트에는 세션 ID만 쿠키로 보관합니다. 서버가 상태를 쥐고 있어 즉시 무효화가 쉽지만(stateful), 서버가 여러 대로 확장되면 공유 세션 저장소가 필요합니다. 토큰(JWT) 방식은 서명된 토큰 자체에 정보를 담아 클라이언트가 보관하고 주로 `Authorization: Bearer`로 보냅니다. 서버는 서명만 검증하면 되어 상태를 저장하지 않으므로(stateless) 확장에 유리하지만, 만료 전에 강제로 무효화하기 어렵다는 단점이 있어 보통 짧은 액세스 토큰과 refresh 토큰을 조합합니다.

쿠키에는 보안 속성이 있습니다. `HttpOnly`는 자바스크립트의 `document.cookie` 접근을 막아 XSS로 토큰이 탈취되는 위험을 줄이고, `Secure`는 HTTPS 연결에서만 쿠키를 전송하며, `SameSite`는 교차 사이트 요청에 쿠키를 함께 보낼지를 제어해 CSRF를 완화합니다. `SameSite`는 `Strict`, `Lax`, `None`이 있고 `None`은 반드시 `Secure`와 함께 써야 합니다.

## 반드시 포함할 키워드

- HTTP 무상태
- Set-Cookie 자동 전송
- 세션(서버 저장, stateful)
- 토큰/JWT(stateless)
- HttpOnly(XSS 완화)
- SameSite(CSRF 완화)

## 자주 틀리는 표현

- JWT는 암호화되어 있어 내용을 못 본다.
- HttpOnly 쿠키는 HTTPS에서만 전송된다.

## 한 줄 요약

세션은 서버가 상태를 쥐는 stateful, 토큰(JWT)은 서명 검증만 하는 stateless 방식이고, 쿠키는 HttpOnly로 XSS를, SameSite로 CSRF를 완화한다.

## 관련 노트

- [[Network - CORS preflight]]
- [[Network - HTTPS TLS handshake]]
