---
category: Lint
topic: no-restricted-syntax
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - no-restricted-syntax

## 질문

커스텀 규칙을 직접 만들지 않고도 특정 문법이나 import를 금지하려면 어떻게 하나요?

## 최적 답변

ESLint 코어의 `no-restricted-syntax`와 `no-restricted-imports`가 이 역할을 합니다. `no-restricted-syntax`는 AST 셀렉터(esquery)로 금지할 패턴을 적으면, 그 패턴에 맞는 노드를 만날 때마다 지정한 메시지로 경고합니다. 커스텀 규칙을 패키지로 만들지 않고 설정만으로 금지할 수 있습니다. `no-restricted-imports`는 특정 모듈이나 경로에서의 import를 막을 때 씁니다. 예를 들어 상대경로 상위 이동(`../../`)을 막거나, 배럴 파일 직접 import를 막을 때 쓸 수 있습니다.

판단 순서는 이렇습니다. 금지하려는 게 셀렉터나 import 경로로 표현되면 이 코어 룰로 먼저 처리하고, 여기서 표현이 안 되는 복잡한 조건이나 자동 수정이 필요할 때만 커스텀 규칙을 만듭니다. 커스텀 규칙은 만들고 배포하고 유지하는 비용이 있으니, 설정으로 되는 1차 방어를 먼저 시도합니다.

## 예시 코드

```js
'no-restricted-syntax': ['error', {
  selector: 'CallExpression[callee.object.name="console"]',
  message: 'console 사용을 지양하세요.',
}],
'no-restricted-imports': ['error', {
  patterns: ['../../*'], // 상대경로 상위 이동 금지
}],
```

## 반드시 포함할 키워드

- no-restricted-syntax는 esquery 셀렉터
- no-restricted-imports는 경로 금지
- 설정만으로 커스텀 없이 금지
- 상대경로·배럴 import 차단
- 복잡·자동수정만 커스텀 룰

## 자주 틀리는 표현

- 특정 패턴을 금지하려면 반드시 커스텀 플러그인을 만들어야 한다.
- no-restricted-syntax는 자동 수정(fix)까지 해준다.

## 한 줄 요약

no-restricted-syntax(esquery 셀렉터)와 no-restricted-imports(경로)로 커스텀 룰 없이 설정만으로 패턴·import를 금지하고, 표현이 안 되거나 자동수정이 필요할 때만 커스텀 룰을 만든다.

## 관련 노트

- [[Lint - 커스텀 규칙]]
- [[Lint - 아키텍처 경계 강제]]
