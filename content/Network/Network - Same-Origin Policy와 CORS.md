---
category: Network
topic: same-origin-cors
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/network
  - status/ai-draft
---

# Network - Same-Origin Policy와 CORS

## 질문

동일 출처 정책은 왜 필요하고, CORS 에러는 언제 발생하나요? 실무에서는 어떻게 해결하나요?

## 최적 답변

출처(origin)는 scheme·host·port 세 가지로 정의되고, 셋이 모두 같아야 동일 출처입니다. 동일 출처 정책(SOP)은 다른 출처의 스크립트가 내 출처의 응답 데이터·DOM·쿠키를 읽지 못하게 막는 브라우저 보안 모델입니다. 이게 필요한 이유는 쿠키 기반 인증 때문입니다. 사용자가 은행 사이트에 로그인해 인증 쿠키를 가진 상태에서 악성 사이트를 방문하면, 그 사이트의 스크립트가 은행에 요청을 보낼 때 브라우저가 쿠키를 자동으로 실어 보냅니다. SOP가 없으면 악성 사이트가 그 응답(계좌 정보)을 읽어갈 수 있으므로, 브라우저는 교차 출처 응답을 스크립트가 읽는 것을 차단합니다.

CORS 에러는 `fetch`/`XHR`로 다른 출처의 리소스를 요청하고 그 응답을 자바스크립트로 읽으려 할 때, 서버가 허용 헤더를 주지 않아 브라우저가 응답을 막을 때 발생합니다. 반면 `img`·`link`·`script` 태그로 교차 출처 리소스를 불러오는 것은 SOP 대상이 아니라 그대로 동작합니다. 정식 해결책은 서버가 `Access-Control-Allow-Origin`으로 허용 출처를 명시하는 것입니다. 서버를 고칠 수 없으면 개발 서버 프록시나 백엔드(BFF)를 두어 브라우저 입장에서 동일 출처로 만들 수 있는데, 이는 서버 간 통신에는 SOP가 적용되지 않기 때문입니다. 여기서 핵심은 CORS가 브라우저의 규칙이라는 점이라, 서버-서버 요청이나 모바일 앱에는 애초에 CORS 문제가 없습니다.

## 반드시 포함할 키워드

- 출처(scheme·host·port)
- 동일 출처 정책(SOP)
- 쿠키 자동 첨부
- 응답 읽기 차단
- Access-Control-Allow-Origin
- 프록시/BFF 우회

## 자주 틀리는 표현

- CORS 에러가 나면 요청이 서버에 도달하지 못한 것이다.
- script·img 태그로 다른 출처를 불러오면 CORS 에러가 난다.

## 한 줄 요약

SOP는 다른 출처가 내 인증된 응답을 읽는 것을 막는 브라우저 보안이라, 교차 출처 fetch는 서버의 Allow-Origin 허용이나 프록시로 해결한다.

## 관련 노트

- [[Network - CORS preflight]]
- [[Network - 쿠키 세션 토큰]]
