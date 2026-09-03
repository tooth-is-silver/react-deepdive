---
category: Lint
topic: flat-config
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/lint
  - status/ai-draft
---

# Lint - Flat config

## 질문

ESLint의 flat config(`eslint.config.js`)는 예전 `.eslintrc`와 무엇이 다른가요? 왜 바뀌었나요?

## 최적 답변

flat config는 ESLint v9부터 기본이 된 설정 방식입니다. 설정이 하나의 배열이고, 각 원소가 적용 대상(`files`)과 규칙·플러그인·언어 옵션을 담은 객체입니다. 배열 순서대로 병합되며 뒤 원소가 앞을 덮습니다.

가장 큰 차이는 명시성입니다. 예전 `.eslintrc`는 플러그인과 확장 설정을 문자열 이름으로 적으면 ESLint가 알아서 찾아 불러왔습니다. 이 암묵적 해석이 어디서 무엇이 켜졌는지 추적하기 어렵게 만들었습니다. flat config는 플러그인과 config를 자바스크립트로 직접 `import`해서 배열에 넣습니다. 무엇이 켜지는지가 코드에 그대로 보입니다. 또 `.eslintrc`는 디렉터리를 따라 위에서 아래로 설정이 cascade 되었는데, flat config는 이 자동 상속을 없애고 `files` 글롭으로 적용 범위를 명시합니다. 정리하면 flat config는 암묵적 이름 해석과 디렉터리 cascade를 없애고, import와 글롭으로 설정을 명시적으로 만든 방식입니다.

## 반드시 포함할 키워드

- 설정이 하나의 배열
- 순서대로 병합·뒤가 우선
- 플러그인·config를 직접 import
- 디렉터리 cascade 제거
- files 글롭으로 적용 범위 명시

## 자주 틀리는 표현

- flat config도 플러그인을 문자열 이름으로만 적으면 알아서 불러온다.
- flat config는 상위 디렉터리 설정을 자동으로 상속한다.

## 한 줄 요약

flat config는 설정을 하나의 배열로 두고 플러그인·config를 직접 import하며 files 글롭으로 범위를 명시해, .eslintrc의 암묵적 이름 해석과 디렉터리 cascade를 없앤 방식이다.

## 관련 노트

- [[Lint - plugin과 shareable config]]
