---
category: React
topic: declarative-batching
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react
  - status/ai-draft
---

# React - 선언형 UI와 배칭

## 질문

순수 자바스크립트로도 화면을 만들 수 있는데 왜 리액트를 쓰나요? 리액트의 reflow·repaint 관점에서 무엇이 다른가요?

## 최적 답변

순수 자바스크립트로 화면을 만들면 상태가 바뀔 때마다 어느 DOM을 어떻게 고칠지 직접 지정해야 합니다. 화면이 커질수록 상태와 DOM 조작이 여기저기 흩어져서 서로 어긋나기 시작합니다. 반복문 안에서 스타일을 열 번 바꾸면 리플로가 열 번 날 수도 있습니다.

리액트는 이걸 뒤집습니다. 무엇을 고칠지가 아니라 어떤 상태일 때 화면이 어떻게 생겼는지만 쓰면 되고, 어디를 고칠지는 리액트가 가상 DOM 비교로 알아냅니다. 상태가 바뀌면 메모리에서 새 트리를 만들어 이전 것과 비교하고, 실제로 달라진 부분만 한 번에 DOM에 반영합니다.

여기에 배칭이 붙습니다. 한 이벤트 안에서 상태를 여러 번 바꿔도 렌더링은 한 번이고 DOM 반영도 한 번입니다. 리액트 18부터는 `setTimeout`이나 프로미스 안처럼 리액트 바깥에서 일어난 변경에도 자동으로 적용됩니다. 리플로와 리페인트를 없애는 게 아니라 횟수를 줄이는 것입니다.

## 예시 코드

```tsx
// 한 이벤트 안의 상태 변경은 배칭 → 렌더 1회
function handleClick() {
  setCount(c => c + 1);
  setName('kim');
  setOpen(true);
}
```

## 반드시 포함할 키워드

- 명령형 vs 선언형
- 가상 DOM 비교
- 달라진 부분만 반영
- 배칭으로 렌더 1회
- React 18 자동 배칭

## 자주 틀리는 표현

- 리액트는 reflow·repaint를 아예 없앤다.
- setState를 세 번 부르면 항상 세 번 렌더링된다.

## 한 줄 요약

리액트는 상태로 화면을 선언하면 가상 DOM 비교로 달라진 부분만 반영하고, 한 이벤트의 여러 상태 변경을 배칭으로 묶어 reflow·repaint 횟수를 줄인다.

## 관련 노트

- [[React - render phase와 commit phase]]
- [[Browser - layout paint composite]]
