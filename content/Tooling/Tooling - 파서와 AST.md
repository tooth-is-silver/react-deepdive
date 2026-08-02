---
category: Tooling
topic: parser-ast
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/tooling
  - status/ai-draft
---

# Tooling - 파서와 AST

## 질문

파서와 AST는 무엇이고, 프론트엔드 도구들은 왜 AST를 사용하나요?

## 최적 답변

파서는 소스 코드 문자열을 읽어서 문법적으로 의미 있는 구조로 바꾸는 도구입니다. 이때 만들어지는 AST는 코드의 문법 구조를 트리 형태로 표현한 데이터입니다. 예를 들어 함수 선언, 변수 선언, JSX 요소 같은 문법 요소가 각각 노드로 표현됩니다.

도구가 코드를 단순 문자열로 다루면 안전하게 분석하거나 바꾸기 어렵습니다. AST를 사용하면 ESLint는 특정 문법 패턴을 검사할 수 있고, Babel·SWC·esbuild 같은 도구는 코드를 다른 문법으로 변환할 수 있습니다. 일반적인 흐름은 `parse → analyze/transform → generate`입니다. 정리하면 파서는 코드를 도구가 이해할 수 있는 AST로 바꾸고, AST는 린트·트랜스파일·코드 변환의 공통 기반이 됩니다.

## 반드시 포함할 키워드

- 파서
- AST
- token
- parse
- transform
- generate
- ESLint parser

## 한 줄 요약

파서는 소스 코드를 AST로 바꾸고, AST는 린트·트랜스파일·코드 변환 도구가 코드를 안전하게 이해하는 기반이다.

## 관련 노트

- [[Tooling - 트랜스파일러]]
- [[Tooling - 번들러]]
