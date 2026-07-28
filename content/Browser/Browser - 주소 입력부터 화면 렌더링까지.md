---
category: Browser
topic: url-to-render
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/browser
  - status/ai-draft
---

# Browser - 주소 입력부터 화면 렌더링까지

## 질문

주소창에 URL을 입력하고 Enter를 누르면 화면이 그려지기까지 어떤 과정이 일어나나요?

## 최적 답변

먼저 네트워크 단계입니다. 브라우저는 DNS 조회로 도메인을 IP 주소로 변환하고, 그 서버와 TCP 3-way handshake로 연결을 맺습니다. HTTPS면 이어서 TLS 핸드셰이크로 암호화 채널을 세웁니다. 그 위에서 HTTP 요청을 보내고 응답으로 HTML 문서를 받습니다.

다음은 렌더링 단계입니다. 브라우저는 HTML을 파싱해 DOM 트리를, CSS를 파싱해 CSSOM을 만들고, 둘을 결합해 화면에 그려질 요소만 담은 렌더 트리를 구성합니다. 이어서 각 요소의 위치와 크기를 계산하는 layout(reflow), 색·텍스트 등 픽셀을 채우는 paint, 여러 레이어를 합쳐 최종 화면을 만드는 composite 순으로 진행합니다. 이 과정에서 `script` 태그를 만나면 파서가 멈추고 스크립트를 실행하므로(파서 블로킹), `async`나 `defer`로 이를 완화합니다. 정리하면 DNS·TCP·TLS·HTTP로 문서를 받아오는 네트워크 과정과, DOM·CSSOM·렌더 트리·layout·paint·composite로 픽셀을 만드는 렌더링 과정으로 나눌 수 있습니다.

## 반드시 포함할 키워드

- DNS 조회
- TCP·TLS handshake
- DOM 트리
- CSSOM
- 렌더 트리
- layout·paint·composite
- 파서 블로킹(defer/async)

## 한 줄 요약

DNS·TCP·TLS·HTTP로 HTML을 받아오고, DOM·CSSOM을 렌더 트리로 합쳐 layout·paint·composite 순으로 화면을 그린다.

## 관련 노트

- [[Browser - layout paint composite]]
- [[Network - HTTPS TLS handshake]]
