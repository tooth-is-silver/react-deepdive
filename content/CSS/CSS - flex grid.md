---
category: CSS
topic: flex-grid
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/css
  - status/ai-draft
---

# CSS - flex grid

## 질문

Flexbox와 Grid는 어떤 기준으로 나눠 쓰나요? 각각 어떤 레이아웃에 적합한가요?

## 최적 답변

Flexbox는 1차원 레이아웃 도구입니다. 한 방향(행 또는 열)으로 아이템을 배치하고, `justify-content`로 주축(main axis), `align-items`로 교차축(cross axis)을 정렬합니다. 그래서 내비게이션 바, 버튼 그룹, 콘텐츠 양에 따라 늘어나고 줄어드는 한 줄 배치처럼 콘텐츠 흐름 중심의 레이아웃에 적합합니다.

Grid는 2차원 레이아웃 도구입니다. 행과 열을 동시에 정의(`grid-template-columns`, `grid-template-rows`)해서 격자에 아이템을 배치하므로, 페이지 전체 골격이나 카드 갤러리처럼 행과 열을 함께 통제해야 하는 레이아웃에 적합합니다. 실무에서는 큰 골격은 Grid로 잡고, 그 안의 개별 요소 정렬은 Flexbox로 처리하는 식으로 함께 씁니다. 한 축만 다루면 Flexbox, 두 축을 함께 다루면 Grid가 기준입니다.

## 반드시 포함할 키워드

- 1차원 레이아웃(Flexbox)
- 2차원 레이아웃(Grid)
- 주축과 교차축
- 콘텐츠 기준 vs 레이아웃 기준
- grid-template

## 한 줄 요약

한 방향 흐름 배치는 1차원 도구인 Flexbox, 행과 열을 함께 통제하는 격자는 2차원 도구인 Grid로 잡는다.

## 관련 노트

- [[CSS - responsive]]
