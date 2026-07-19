---
category: Browser
topic: forced-sync-layout
difficulty: junior-3
status: review
score: 80
last_reviewed: 2026-07-12
next_review: 2026-07-16
tags:
  - interview/browser
  - status/review
---

# Browser - forced synchronous layout

## 질문

스타일 변경 직후 `getBoundingClientRect()`를 호출하면 왜 성능상 주의해야 할까요?

## 최적 답변

브라우저는 성능을 위해 style/layout 계산을 즉시 매번 하지 않고 나중에 한 번에 처리하려고 미뤄둘 수 있습니다. 그런데 스타일을 변경한 직후 `getBoundingClientRect()`를 호출하면 현재 요소의 정확한 크기와 위치를 반환해야 하므로, 브라우저는 미뤄둔 스타일 변경을 반영해 최신 layout 정보를 즉시 계산해야 할 수 있습니다.

이처럼 JavaScript 실행 중 브라우저가 강제로 layout을 수행하는 것을 forced synchronous layout이라고 합니다. 특히 DOM write와 layout read가 반복되면 layout thrashing으로 성능 문제가 생길 수 있습니다.

## 안 좋은 예시

```ts
items.forEach(item => {
  item.style.width = '300px';
  const rect = item.getBoundingClientRect();
  item.style.height = `${rect.width}px`;
});
```

## 개선 방향

DOM read와 write를 분리합니다.

```ts
const rects = items.map(item => item.getBoundingClientRect());

items.forEach((item, index) => {
  item.style.height = `${rects[index].width}px`;
});
```

## 반드시 포함할 키워드

- DOM write
- layout read
- getBoundingClientRect
- forced synchronous layout
- layout thrashing

## 한 줄 요약

스타일 변경 직후 layout 값을 읽으면 브라우저가 최신 값을 맞추기 위해 layout을 강제로 수행할 수 있다.

## 관련 노트

- [[Browser - layout paint composite]]
