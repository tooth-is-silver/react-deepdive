---
category: Network
topic: http-versions
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/network
  - status/ai-draft
---

# Network - HTTP 버전

## 질문

HTTP/1.1, HTTP/2, HTTP/3는 어떻게 다르고, 각 버전이 해결한 성능 문제는 무엇인가요?

## 최적 답변

HTTP/1.1은 텍스트 기반이고 하나의 커넥션에서 요청을 순차로 처리합니다. 앞 요청의 응답이 늦으면 뒤 요청이 전부 대기하는 head-of-line blocking이 생기고, 브라우저는 이를 완화하려고 도메인당 커넥션을 여러 개(보통 6개) 엽니다. HTTP/2는 바이너리 프레이밍을 도입해 하나의 TCP 커넥션 안에서 여러 스트림을 동시에 주고받는 멀티플렉싱을 지원합니다. 헤더 압축(HPACK)까지 더해 애플리케이션 레벨의 HOL blocking을 해결하지만, 여전히 TCP 위에서 동작하므로 패킷 손실이 나면 그 커넥션의 모든 스트림이 함께 지연되는 TCP 레벨 HOL blocking이 남습니다.

HTTP/3는 전송 계층을 TCP에서 UDP 기반 QUIC으로 바꿔 이 문제를 해결합니다. QUIC은 스트림을 독립적으로 다뤄 한 스트림의 패킷 손실이 다른 스트림을 막지 않고, 연결 수립과 TLS 핸드셰이크를 통합해 초기 지연을 줄이며, IP가 바뀌어도 연결을 유지하는 연결 마이그레이션을 지원합니다. 정리하면 1.1은 순차·다중 커넥션, 2는 한 커넥션 멀티플렉싱, 3은 UDP/QUIC으로 TCP HOL blocking까지 제거하는 흐름입니다.

## 반드시 포함할 키워드

- HTTP/1.1 순차 처리
- head-of-line blocking
- HTTP/2 멀티플렉싱
- 헤더 압축(HPACK)
- HTTP/3 QUIC
- TCP HOL blocking 제거

## 한 줄 요약

1.1은 순차·다중 커넥션, 2는 한 커넥션 멀티플렉싱으로 앱 레벨 HOL을 해결하고, 3은 UDP 기반 QUIC으로 TCP 레벨 HOL까지 없앤다.

## 관련 노트

- [[Network - HTTPS TLS handshake]]
- [[Network - Cache-Control ETag 304]]
