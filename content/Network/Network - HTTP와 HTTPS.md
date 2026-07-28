---
category: Network
topic: http-https
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/network
  - status/ai-draft
---

# Network - HTTP와 HTTPS

## 질문

HTTP와 HTTPS는 무엇이 다르고, 왜 요즘은 HTTPS가 사실상 필수인가요?

## 최적 답변

HTTP는 요청과 응답을 평문으로 주고받고 기본 포트는 80입니다. 중간 경로의 누군가가 통신 내용을 그대로 들여다보거나 변조할 수 있고, 접속한 서버가 진짜인지도 확인할 수 없습니다. HTTPS는 이 HTTP를 TLS 위에서 주고받는 방식으로 기본 포트는 443이며, 내용을 암호화하는 기밀성, 중간 변조를 탐지하는 무결성, 인증서로 서버 신원을 확인하는 서버 인증을 제공합니다.

HTTPS가 사실상 필수가 된 이유는 여러 가지입니다. 로그인·결제 같은 민감 정보가 평문으로 노출되면 안 되고, 공용 와이파이 등에서의 중간자 공격을 막아야 합니다. 또 브라우저가 HTTP 페이지를 "안전하지 않음"으로 표시하고, HTTP/2나 서비스 워커·geolocation 같은 여러 최신 기능이 보안 컨텍스트(HTTPS)를 요구하기 때문에 기능적으로도 HTTPS가 전제됩니다. 정리하면 HTTP는 평문·비인증, HTTPS는 TLS로 암호화·무결성·인증을 더한 것이고, 그 구체적인 절차는 TLS 핸드셰이크에서 이뤄집니다.

## 반드시 포함할 키워드

- HTTP 평문(포트 80)
- HTTPS over TLS(포트 443)
- 기밀성·무결성·서버 인증
- 중간자 공격 방지
- 보안 컨텍스트 요구 기능

## 자주 틀리는 표현

- HTTPS는 서버 속도를 빠르게 해준다.
- HTTP도 인증서만 있으면 암호화된다.

## 한 줄 요약

HTTP는 포트 80 평문·비인증이고, HTTPS는 포트 443에서 TLS로 기밀성·무결성·서버 인증을 더해 민감 정보와 최신 기능의 전제가 된다.

## 관련 노트

- [[Network - HTTPS TLS handshake]]
- [[Network - HTTP 버전]]
