---
category: Network
topic: csrf-samesite
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/network
  - status/ai-draft
---

# Network - CSRF와 SameSite

## 질문

다른 도메인에서 우리 서버로 상태를 바꾸는 요청을 보낼 수 있는 상황은 구체적으로 무엇이고, 어떻게 막나요?

## 최적 답변

CSRF가 그런 상황입니다. 쿠키 기반 인증일 때 악성 사이트가 사용자가 로그인해 둔 도메인으로 상태 변경 요청을 유발하면, 브라우저가 쿠키를 자동으로 붙여 보내서 서버가 정상 요청처럼 처리합니다. 사용자가 이미 로그인해 둔 세션이 그대로 악용되는 것입니다.

이런 공격을 막는 장치가 여럿입니다. 동일 출처 정책과 CORS가 기본 경계이고, 쿠키에 `SameSite`를 지정하면 다른 사이트에서 시작된 요청에는 쿠키가 붙지 않게 할 수 있습니다. 서버가 발급한 CSRF 토큰을 요청마다 함께 검증하는 방법도 있습니다. 여기서 CORS는 "다른 도메인의 응답을 스크립트가 읽는 것"을 막는 규칙이지, 요청이 서버에 도달하는 것 자체를 막는 게 아니라는 점을 구분해야 합니다. 그래서 CORS만으로는 CSRF가 완전히 막히지 않아 `SameSite`와 CSRF 토큰이 함께 필요합니다.

## 반드시 포함할 키워드

- CSRF는 쿠키 자동 전송 악용
- 로그인 세션 악용
- SameSite 쿠키
- CSRF 토큰
- CORS는 응답 읽기 차단(요청 도달은 별개)

## 자주 틀리는 표현

- CORS가 있으면 CSRF는 자동으로 막힌다.
- CSRF는 토큰 기반 인증에서도 쿠키 없이 발생한다.

## 한 줄 요약

CSRF는 쿠키가 자동 전송되는 점을 악용해 로그인 세션으로 상태 변경 요청을 유발하는 공격이라, CORS만으로는 부족하고 SameSite 쿠키와 CSRF 토큰으로 함께 막는다.

## 관련 노트

- [[Network - Same-Origin Policy와 CORS]]
- [[Network - 쿠키 세션 토큰]]
