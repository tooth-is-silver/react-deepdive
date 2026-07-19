---
category: CSS
topic: stacking-context
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/css
  - status/ai-draft
---

# CSS - stacking context

## 질문

`z-index: 9999`를 줬는데도 요소가 다른 요소 위로 올라오지 않는 경우가 있습니다. stacking context 관점에서 이유를 설명하세요.

## 최적 답변

`z-index`는 전역에서 비교되는 값이 아니라, 자신이 속한 stacking context 안에서만 형제끼리 비교됩니다. stacking context는 하나의 독립된 쌓임 단위이고, 부모가 별도의 stacking context를 만들면 그 자식의 `z-index`는 아무리 커도 부모 context의 바깥 요소를 넘어설 수 없습니다.

stacking context는 여러 조건에서 생성됩니다. 대표적으로 `position`이 static이 아니면서 `z-index`가 `auto`가 아닌 경우, `opacity`가 1 미만인 경우, `transform`·`filter`·`will-change` 등이 지정된 경우, 그리고 루트 요소입니다. 그래서 부모에 `opacity: 0.9`나 `transform`이 걸려 있으면 그 부모가 새 stacking context가 되고, 자식의 높은 `z-index`는 그 안에 갇힙니다. 문제를 풀려면 어떤 조상이 stacking context를 만들었는지 찾아서, 비교하려는 두 요소가 같은 context 안에 있도록 구조나 스타일을 조정해야 합니다.

## 반드시 포함할 키워드

- stacking context
- context 내부 비교
- z-index는 형제끼리
- opacity/transform이 context 생성
- 부모 context에 갇힘

## 한 줄 요약

z-index는 같은 stacking context 안 형제끼리만 비교되므로, 부모가 만든 context에 갇히면 값이 아무리 커도 바깥 요소를 못 넘는다.

## 관련 노트

- [[CSS - position]]
