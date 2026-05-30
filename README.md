# react-deepdive

React 공식 문서와 React 내부 소스코드를 기준으로 딥다이브 학습과 면접 준비를 하기 위한 로컬 CLI 프로젝트입니다.

## 목표

- React 공식 문서와 실제 소스코드를 함께 확인하며 학습합니다.
- AI 답변이 공식 문서와 소스 근거를 기반으로 나오도록 준비합니다.
- `useState`, `useEffect`, reconciler, scheduler 같은 React 내부 동작을 면접 답변 형태로 정리할 수 있게 합니다.

## sources 폴더

`sources/`는 외부 공식 리소스를 로컬에 받아두는 폴더입니다.

```txt
sources/
  react/      # facebook/react 공식 소스코드
  react.dev/  # reactjs/react.dev 공식 문서 소스
```

이 폴더는 `.gitignore`에 포함되어 있어서 레포지토리에 올리지 않습니다.  
원본 레포 전체를 커밋하지 않고, 필요한 버전 정보만 기록해서 다시 재현할 수 있게 합니다.

## source.json

`data/manifests/source.json`은 현재 학습 기준이 되는 공식 리소스의 출처와 버전을 기록합니다.

```json
{
  "react": {
    "repo": "https://github.com/facebook/react",
    "ref": "v19.2.6",
    "commit": "..."
  },
  "reactDev": {
    "repo": "https://github.com/reactjs/react.dev",
    "ref": "main",
    "commit": "..."
  }
}
```

- `repo`: 공식 리소스 출처
- `ref`: 사람이 읽기 쉬운 버전 또는 브랜치
- `commit`: 정확히 고정된 스냅샷

## 기술 스택

- TypeScript: CLI, 인덱서, 검색 로직을 타입 기반으로 안전하게 작성하기 위해 사용합니다.
- Node.js: 로컬 파일 시스템과 Git 기반 소스 분석을 다루기 쉽고, CLI 도구를 만들기 적합해서 사용합니다.
- pnpm workspace: CLI, 인덱서, 검색기, 공통 유틸을 나중에 패키지 단위로 분리하기 위해 사용합니다.
- 모노레포: 공식 리소스 관리, CLI, 인덱싱, 검색, 프롬프트 로직을 한 저장소에서 함께 관리하기 위해 사용합니다.
- Git 기반 sources 관리: React와 react.dev 원본을 수정하지 않고 특정 commit 기준으로 읽기 위해 사용합니다.

## 활용 방향

현재는 CLI로 공식 리소스 상태 확인, 인덱싱, 검색을 할 수 있습니다.

```bash
corepack pnpm --filter @react-deepdive/cli dev status
```

### status

현재 학습 기준이 되는 React 소스와 공식 문서의 repo, ref, commit을 확인합니다.

```bash
corepack pnpm --filter @react-deepdive/cli dev status
```

### index

`sources/`에 받아둔 React 소스와 공식 문서를 읽어서 검색용 인덱스를 생성합니다.

```bash
corepack pnpm --filter @react-deepdive/cli dev index
```

생성 결과는 `data/indexes/source-index.json`에 저장됩니다. 이 파일은 로컬 캐시라서 레포지토리에 올리지 않습니다.

### search

생성된 인덱스에서 키워드를 검색합니다. 결과는 공식 문서와 React 소스를 함께 보여줍니다.

```bash
corepack pnpm --filter @react-deepdive/cli dev search useState
corepack pnpm --filter @react-deepdive/cli dev search mountState
```

일부 대표 키워드는 관련 내부 심볼도 함께 검색합니다.

```txt
useState   -> mountState, updateState, dispatchSetState, basicStateReducer
useEffect  -> mountEffect, updateEffect, mountEffectImpl, updateEffectImpl, pushSimpleEffect
createRoot -> createContainer, updateContainer, ReactDOMRoot
```

검색 결과의 `matched` 값은 실제로 어떤 키워드나 관련 심볼에 매칭됐는지 보여줍니다.

이후에는 검색 결과를 근거로 자연어 답변을 생성하는 `ask` 명령을 추가할 예정입니다.
