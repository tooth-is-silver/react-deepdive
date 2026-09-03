---
category: Lint
topic: architecture-boundaries
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - 아키텍처 경계 강제

## 질문

레이어 단방향 의존이나 import 방향 같은 아키텍처 규칙을 정적 분석으로 강제하려면 어떻게 하나요?

## 최적 답변

문서에 "도메인은 유즈케이스를 import하지 않는다" 같은 규칙을 적어두면, 사람이 지키다 결국 새어 나갑니다. 그래서 이런 경계는 린트로 강제합니다.

방법은 둘입니다. 간단한 금지는 `no-restricted-imports`나 `eslint-plugin-import`의 `no-restricted-paths`로 경로 기반으로 막습니다. 레이어가 여럿이고 관계가 복잡하면 `eslint-plugin-boundaries` 같은 도구로 각 폴더를 레이어 타입으로 지정하고, 어떤 레이어가 어떤 레이어를 의존해도 되는지 규칙으로 선언합니다. 그러면 FSD의 단방향 의존처럼 하위 레이어가 상위를 import 하는 위반을 빌드나 커밋 단계에서 잡습니다. Public API만 노출하는 규칙도 슬라이스마다 `index.ts`를 두고 내부 파일 직접 import를 금지해 강제합니다. 핵심은 문서와 정적 분석을 동기화하는 것입니다. 문서에 경계를 적었는데 린트에 그 레이어가 빠져 있으면, 코드는 통과되지만 컨벤션은 안 지켜지는 사각지대가 생깁니다.

## 반드시 포함할 키워드

- 문서만으로는 경계가 샘
- no-restricted-imports·no-restricted-paths
- eslint-plugin-boundaries로 레이어 선언
- 단방향 의존 위반 차단
- Public API(index.ts) 강제
- 문서와 정적 분석 동기화

## 자주 틀리는 표현

- 아키텍처 규칙은 코드 리뷰로만 지키면 충분하다.
- 문서에 경계를 적어두면 자동으로 강제된다.

## 한 줄 요약

레이어 단방향 의존·import 방향은 no-restricted-imports나 eslint-plugin-boundaries로 선언해 위반을 자동 차단하고, 문서와 린트 설정을 동기화해 사각지대를 없앤다.

## 관련 노트

- [[Lint - no-restricted-syntax]]
- [[Lint - 커스텀 규칙]]
