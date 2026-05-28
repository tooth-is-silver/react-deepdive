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

## 활용 방향

처음에는 CLI로 시작합니다.

```bash
corepack pnpm --filter @react-deepdive/cli dev status
```

이후에는 검색, 인덱싱, 질문 답변 명령을 추가해서 공식 문서와 소스 기반으로 React 딥다이브를 진행할 예정입니다.
