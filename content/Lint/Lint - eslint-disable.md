---
category: Lint
topic: eslint-disable
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - eslint-disable

## 질문

`eslint-disable`은 언제 쓰고 무엇을 주의해야 하나요?

## 최적 답변

`eslint-disable`은 특정 위치에서 규칙을 끄는 주석입니다. 규칙이 실제로는 안전한 코드를 잘못 잡을 때(거짓 양성)나, 규칙을 어길 수밖에 없는 예외적 상황에 씁니다.

주의할 점은 범위와 대상을 최대한 좁히는 것입니다. 파일 맨 위에 `/* eslint-disable */`를 걸면 그 파일 전체에서 모든 규칙이 꺼져, 이후에 생긴 진짜 문제까지 통째로 가려집니다. 그래서 한 줄만 끄는 `eslint-disable-next-line`을 쓰고, 반드시 어떤 규칙인지 이름을 명시해 그 규칙만 끕니다. 그리고 왜 껐는지 이유를 함께 적어, 나중에 이 예외가 여전히 유효한지 판단할 수 있게 합니다. 남용하면 린트가 있으나 마나 한 상태가 되므로, disable은 규칙을 고치거나 코드를 바꾸는 게 정답이 아닐 때의 마지막 수단입니다. 쓰지도 않는 disable 주석은 `reportUnusedDisableDirectives`로 찾아 정리합니다.

## 반드시 포함할 키워드

- 거짓 양성·불가피한 예외에만
- 파일 전체 disable은 위험
- eslint-disable-next-line으로 한 줄만
- 규칙 이름 명시로 그 룰만
- 이유를 함께 기록

## 자주 틀리는 표현

- 규칙이 거슬리면 파일 상단에서 통째로 꺼도 된다.
- eslint-disable은 규칙 이름 없이 쓰는 게 편하다.

## 한 줄 요약

eslint-disable은 거짓 양성·불가피한 예외의 마지막 수단으로, next-line으로 한 줄만·규칙 이름을 명시해 그 룰만 끄고 이유를 함께 남긴다.

## 관련 노트

- [[Lint - false positive와 negative]]
- [[Lint - 규칙 심각도]]
