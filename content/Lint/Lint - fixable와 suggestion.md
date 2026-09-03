---
category: Lint
topic: fixable-vs-suggestion
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - fixable와 suggestion

## 질문

ESLint 규칙의 자동 수정에서 `fix`(fixable)와 `suggestion`은 어떻게 다른가요? 왜 나눠져 있나요?

## 최적 답변

`fix`는 `--fix`를 돌리면 자동으로 적용되는 수정입니다. 규칙의 `meta.fixable`을 지정하고 `fix` 함수를 넘기면, ESLint가 사람 확인 없이 그 범위를 고쳐 씁니다. 그래서 의미를 바꾸지 않는 안전한 수정에만 씁니다. 세미콜론 추가, 따옴표 통일 같은 것입니다.

`suggestion`은 자동으로 적용되지 않고 에디터에서 사람이 골라야 적용되는 수정입니다. 고칠 방법이 여러 개거나, 고치면 코드의 의미가 달라질 수 있어서 기계가 임의로 적용하면 위험한 경우에 씁니다. 규칙은 `meta.hasSuggestions`를 켜고 `suggest` 배열로 후보를 제공합니다. 정리하면 안전하고 답이 하나면 `fix`로 자동 적용하고, 의미가 바뀔 수 있거나 선택지가 여럿이면 `suggestion`으로 사람에게 맡깁니다.

## 반드시 포함할 키워드

- fix는 --fix로 자동 적용
- 안전·유일한 수정에만 fix
- suggestion은 에디터에서 수동 선택
- 의미 변경·다중 후보는 suggestion
- meta.fixable / meta.hasSuggestions

## 자주 틀리는 표현

- suggestion도 --fix를 돌리면 자동으로 적용된다.
- 모든 규칙 위반은 --fix로 고칠 수 있다.

## 한 줄 요약

fix는 의미를 안 바꾸는 유일한 수정을 --fix로 자동 적용하고, suggestion은 의미가 바뀔 수 있거나 후보가 여럿이라 에디터에서 사람이 골라야 적용된다.

## 관련 노트

- [[Lint - 린트 규칙 동작 원리]]
- [[Lint - 코드모드와 autofix]]
