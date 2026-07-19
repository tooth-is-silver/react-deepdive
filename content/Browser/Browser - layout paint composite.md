---
category: Browser
topic: rendering-pipeline
difficulty: junior-3
status: review
score: 75
last_reviewed: 2026-07-12
next_review: 2026-07-15
tags:
  - interview/browser
  - status/review
---

# Browser - layout paint composite

## 질문

`width`, `height`, `transform`, `opacity` 변경은 각각 브라우저 렌더링 단계에 어떤 영향을 줄까요?

## 최적 답변

`width`와 `height`는 요소의 박스 크기를 변경하기 때문에 layout/reflow를 유발할 수 있고, 그 결과 paint와 composite까지 이어질 수 있습니다.

반면 `transform`과 `opacity`는 문서 흐름상의 크기나 위치를 바꾸지 않기 때문에 일반적으로 layout을 다시 계산하지 않고 composite 단계에서 처리될 수 있어 애니메이션 성능에 유리합니다. 다만 브라우저나 레이어 상태에 따라 paint가 발생할 수는 있습니다.

## Composite 설명

Composite는 이미 paint된 결과를 여러 레이어로 나눈 뒤 GPU를 통해 최종 화면에 합성하는 단계입니다. layout은 요소의 크기와 위치를 계산하고, paint는 실제 픽셀을 그리는 단계라면, composite는 이미 그려진 레이어들을 순서와 투명도, transform 값에 맞게 조합하는 단계입니다.

## 반드시 포함할 키워드

- layout / reflow
- paint
- composite
- transform
- opacity
- 레이어
- GPU 합성

## 자주 틀리는 표현

- transform은 layout을 가장 많이 일으킨다.
- opacity는 항상 repaint만 일으킨다.
- transform과 opacity는 무조건 composite만 일어난다.

## 한 줄 요약

width/height는 layout을 흔들고, transform/opacity는 보통 composite로 처리될 수 있다.

## 관련 노트

- [[Browser - forced synchronous layout]]
