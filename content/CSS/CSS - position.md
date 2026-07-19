---
category: CSS
topic: position
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/css
  - status/ai-draft
---

# CSS - position

## 질문

`position`의 `static`, `relative`, `absolute`, `fixed`, `sticky`는 각각 어떻게 배치되고, `absolute`는 무엇을 기준으로 위치가 정해지나요?

## 최적 답변

`static`은 기본값으로, 문서의 일반 흐름(normal flow)에 따라 배치되고 `top`/`left` 같은 offset이 적용되지 않습니다. `relative`는 원래 있던 자리를 그대로 차지한 채, 그 자리를 기준으로 offset만큼 시각적으로 이동합니다.

`absolute`는 일반 흐름에서 빠지고, 가장 가까운 `position`이 `static`이 아닌 조상(relative/absolute/fixed/sticky)을 기준(containing block)으로 배치됩니다. 그런 조상이 없으면 초기 컨테이닝 블록, 즉 뷰포트를 기준으로 합니다. 그래서 부모에 `position: relative`를 주고 자식을 `absolute`로 두는 패턴을 자주 씁니다. `fixed`는 일반 흐름에서 빠지고 뷰포트를 기준으로 고정되어 스크롤해도 위치가 유지됩니다. `sticky`는 평소에는 `relative`처럼 흐름에 있다가, 스크롤이 지정한 임계값에 도달하면 `fixed`처럼 컨테이너 안에서 달라붙습니다.

## 반드시 포함할 키워드

- normal flow
- containing block
- relative 기준 이동
- absolute 조상 기준
- fixed 뷰포트 고정
- sticky 임계값

## 한 줄 요약

absolute는 가장 가까운 non-static 조상을 기준으로 배치되고, fixed는 뷰포트, sticky는 relative와 fixed를 임계값에서 전환한다.

## 관련 노트

- [[CSS - stacking context]]
