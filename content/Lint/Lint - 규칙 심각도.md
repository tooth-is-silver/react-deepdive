---
category: Lint
topic: rule-severity
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - 규칙 심각도

## 질문

ESLint 규칙 심각도 off, warn, error는 각각 무엇이고, warn을 남발하면 왜 문제가 되나요?

## 최적 답변

심각도는 세 단계입니다. `off`(0)는 규칙을 끕니다. `warn`(1)은 경고를 보여주지만 종료 코드에 영향을 주지 않습니다. `error`(2)는 위반 시 실패로 처리되어, CI에서 린트를 막는 기준이 됩니다.

warn을 남발하면 실질적으로 무시됩니다. warn은 CI를 통과시키기 때문에, 경고가 수백 개 쌓여도 빌드는 초록불입니다. 그러면 사람들은 경고를 배경 소음으로 여기고, 정작 새로 생긴 중요한 경고도 그 속에 묻힙니다. 그래서 규칙은 "지켜야 하는 것"은 error로 두어 실제로 막고, warn은 점진적으로 도입 중이거나 곧 error로 올릴 한시적 상태에만 씁니다. warn을 계속 두려면 `--max-warnings 0`처럼 경고 수를 CI 실패 기준으로 걸어 소음이 쌓이지 않게 합니다.

## 반드시 포함할 키워드

- off·warn·error (0·1·2)
- warn은 종료 코드에 영향 없음
- error만 CI를 막음
- warn 남발은 무시로 이어짐
- --max-warnings로 상한

## 자주 틀리는 표현

- warn도 CI를 실패시킨다.
- 애매한 규칙은 전부 warn으로 두면 안전하다.

## 한 줄 요약

off·warn·error 중 error만 CI를 막고 warn은 종료 코드에 영향이 없어, warn을 남발하면 경고가 소음으로 묻히므로 지킬 규칙은 error로 두거나 --max-warnings로 상한을 건다.

## 관련 노트

- [[Lint - 린트 실행 시점]]
