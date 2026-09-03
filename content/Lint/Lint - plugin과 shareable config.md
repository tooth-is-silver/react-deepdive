---
category: Lint
topic: plugin-vs-config
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - plugin과 shareable config

## 질문

ESLint의 plugin과 shareable config는 무엇이 다른가요?

## 최적 답변

plugin은 규칙과 프로세서 같은 재료를 제공하는 패키지입니다. `eslint-plugin-react`나 `@typescript-eslint`가 여러 룰과 파서를 담아 제공하지만, 그 자체로는 어떤 룰을 어떤 심각도로 켤지 정하지 않습니다. 재료만 있는 상태입니다.

shareable config는 그 재료를 어떻게 쓸지 정해둔 설정 묶음입니다. 어떤 룰을 켜고 끌지, 심각도를 무엇으로 둘지 정한 것을 패키지로 공유합니다. 보통 plugin이 자신의 권장 config(`recommended`)를 함께 제공하고, 팀은 그 위에 자기 규칙을 얹은 config를 만들어 여러 저장소에서 공유합니다. 정리하면 plugin은 룰이라는 재료, config는 그 룰을 켜고 끄는 설정이며, 하나의 plugin을 서로 다른 config가 다르게 구성해 쓸 수 있습니다.

## 반드시 포함할 키워드

- plugin은 룰·파서 재료 제공
- plugin만으로는 룰이 켜지지 않음
- config는 룰 on/off·심각도 묶음
- recommended config
- 팀 config로 여러 저장소 공유

## 자주 틀리는 표현

- 플러그인을 설치하면 그 룰들이 자동으로 켜진다.
- shareable config가 직접 새 룰을 구현한다.

## 한 줄 요약

plugin은 룰·파서 같은 재료를 제공하고 shareable config는 그 룰을 어떤 심각도로 켤지 정한 설정 묶음이라, 같은 plugin을 config마다 다르게 구성해 공유한다.

## 관련 노트

- [[Lint - Flat config]]
- [[Lint - 커스텀 규칙]]
