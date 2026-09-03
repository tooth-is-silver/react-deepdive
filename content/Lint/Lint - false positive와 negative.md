---
category: Lint
topic: false-positive-negative
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - false positive와 negative

## 질문

린트에서 false positive와 false negative는 무엇이고, 린터가 완벽할 수 없는 이유는 무엇인가요?

## 최적 답변

false positive는 문제가 없는 코드를 문제라고 잘못 잡는 것이고, false negative는 진짜 문제를 놓치는 것입니다. 린터를 엄격하게 만들면 false negative는 줄지만 false positive가 늘어 사람이 disable을 남발하게 되고, 느슨하게 만들면 그 반대가 됩니다. 둘 사이의 균형을 잡는 게 규칙 설계입니다.

완벽할 수 없는 근본 이유는, 코드가 실행 시 실제로 어떻게 동작할지를 실행 없이 일반적으로 정확히 판단하는 것이 이론적으로 불가능하기 때문입니다(정지 문제와 같은 결정 불가능성). 그래서 정적 분석은 반드시 근사합니다. 안전한 쪽으로 보수적으로 판단하면 멀쩡한 코드도 걸러(false positive) 내고, 실용성을 위해 느슨하게 잡으면 일부를 놓칩니다(false negative). 린트를 통과했다고 버그가 없는 게 아니고, 린트가 잡았다고 반드시 버그인 것도 아닌 이유입니다. 그래서 린트는 테스트·타입 검사·리뷰와 함께 겹겹이 씁니다.

## 반드시 포함할 키워드

- false positive는 오탐
- false negative는 미탐
- 엄격↔느슨 트레이드오프
- 결정 불가능성으로 근사
- 다른 검사와 병행

## 자주 틀리는 표현

- 좋은 린터는 false positive와 false negative가 둘 다 0이 될 수 있다.
- 린트를 통과하면 그 코드에는 버그가 없다.

## 한 줄 요약

false positive는 오탐, false negative는 미탐이며, 정적 분석은 실행 결과를 일반적으로 판정할 수 없어 근사하므로 둘 사이 트레이드오프가 있고 다른 검사와 병행한다.

## 관련 노트

- [[Lint - 정적 분석과 동적 분석]]
- [[Lint - eslint-disable]]
