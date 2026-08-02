---
category: Tooling
topic: package-manager
difficulty: junior-2
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/tooling
  - status/ai-draft
---

# Tooling - 패키지 매니저

## 질문

패키지 매니저는 무엇이고, `package.json`과 lockfile은 각각 어떤 역할을 하나요?

## 최적 답변

패키지 매니저는 외부 라이브러리를 설치하고, 의존성 트리와 버전을 관리하는 도구입니다. `package.json`은 프로젝트가 필요로 하는 직접 의존성과 실행 스크립트를 선언하고, lockfile은 실제로 설치된 직접·간접 의존성의 정확한 버전을 고정합니다.

그래서 `package.json`만 있으면 버전 범위에 따라 설치 결과가 달라질 수 있지만, lockfile이 있으면 팀원과 CI가 같은 의존성 그래프를 재현할 수 있습니다. `dependencies`는 런타임에 필요한 패키지, `devDependencies`는 빌드·테스트·린트처럼 개발 과정에 필요한 패키지를 둡니다. 정리하면 패키지 매니저는 설치 도구가 아니라, 프로젝트의 의존성을 재현 가능하게 관리하는 도구입니다.

## 대표 도구/라이브러리

- npm: Node.js와 함께 가장 기본적으로 쓰이는 패키지 매니저입니다.
- pnpm: 전역 저장소와 심볼릭 링크를 활용해 설치 공간을 줄이고, 의존성 구조를 더 엄격하게 관리합니다.
- Yarn: workspaces, Plug'n'Play 같은 기능으로 모노레포와 의존성 관리를 지원합니다.
- Bun: JavaScript 런타임이면서 패키지 매니저 역할도 함께 제공합니다.

## 예시 코드

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build"
  },
  "dependencies": {
    "react": "^19.2.7"
  },
  "devDependencies": {
    "vite": "^8.1.1",
    "typescript": "~6.0.2"
  }
}
```

`react`는 앱 실행에 필요하므로 `dependencies`에 두고, `vite`와 `typescript`는 개발·빌드 과정에 필요하므로 `devDependencies`에 둡니다. lockfile은 여기서 실제로 설치된 하위 의존성의 정확한 버전까지 고정합니다.

## 반드시 포함할 키워드

- package.json
- dependencies
- devDependencies
- lockfile
- 의존성 트리
- npm/pnpm/yarn/Bun

## 한 줄 요약

패키지 매니저는 외부 패키지를 설치하고, `package.json`과 lockfile로 의존성 버전을 재현 가능하게 관리한다.

## 관련 노트

- [[Tooling - 번들러]]
- [[Tooling - 트랜스파일러]]
