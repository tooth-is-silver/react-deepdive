---
category: Lint
topic: rule-mechanics
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - 린트 규칙 동작 원리

## 질문

ESLint 규칙 하나는 내부적으로 어떻게 동작하나요? 문제를 어떻게 찾고 자동 수정은 어떻게 이뤄지나요?

## 최적 답변

ESLint는 코드를 문자열로 보지 않고 파서를 통해 AST로 바꾼 뒤 검사합니다. 기본 파서는 espree이고, 타입스크립트는 `@typescript-eslint/parser`가 맡습니다.

규칙은 `create` 함수 하나로 이뤄집니다. 이 함수가 `Identifier`나 `CallExpression`처럼 노드 타입을 키로 갖는 객체를 반환하면, ESLint가 AST를 순회하다 그 타입의 노드를 만날 때마다 해당 함수를 불러줍니다. 노드 이름 뒤에 `:exit`를 붙이면 그 노드를 빠져나올 때 불립니다. 문제를 찾으면 `context.report`로 노드와 메시지를 넘깁니다. 여기에 `fix`를 같이 넘기면 그 자리의 코드 범위를 어떻게 바꿀지 지정할 수 있고, 이게 `--fix`로 자동 수정되는 부분입니다. 정리하면 규칙은 "특정 노드를 만나면 검사하고, 문제면 report하고, 필요하면 fix로 고칠 범위를 돌려주는" 방문자입니다.

## 예시 코드

```js
export default {
  create(context) {
    return {
      // console.* 호출 노드를 만날 때마다 검사
      'CallExpression[callee.object.name="console"]'(node) {
        context.report({
          node,
          message: 'console 사용을 지양하세요.',
          fix: fixer => fixer.remove(node),
        });
      },
    };
  },
};
```

## 반드시 포함할 키워드

- 소스를 AST로 파싱
- create가 노드 방문자 반환
- 노드 타입 키로 순회 중 호출
- context.report로 문제 보고
- fix로 자동 수정 범위 지정

## 자주 틀리는 표현

- 린트 규칙은 소스 문자열을 정규식으로 검사한다.
- context.report만 하면 --fix로 자동 수정된다.

## 한 줄 요약

규칙은 소스를 AST로 바꾼 뒤 노드 타입별 방문자로 순회하며, 문제를 만나면 context.report로 보고하고 fix를 넘긴 경우에만 --fix로 자동 수정된다.

## 관련 노트

- [[Tooling - 파서와 AST]]
- [[Lint - fixable와 suggestion]]
