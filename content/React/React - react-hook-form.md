---
category: React
topic: react-hook-form
difficulty: junior-3
status: draft
score:
last_reviewed:
next_review:
tags:
  - interview/react
  - status/ai-draft
---

# React - react-hook-form

## 질문

react-hook-form은 어떤 방식으로 리렌더링을 최적화하나요?

## 최적 답변

제어 컴포넌트로 폼을 만들면 입력할 때마다 상태가 바뀌고 그때마다 컴포넌트가 다시 그려집니다. 필드가 열 개면 한 글자 칠 때마다 폼 전체가 다시 그려지는 셈입니다.

react-hook-form은 비제어 방식을 씁니다. `register`가 입력 요소에 ref를 붙여 값을 DOM이 들고 있게 하고, 필요할 때만 읽어갑니다. 타이핑하는 동안에는 리액트 상태가 바뀌지 않으니 리렌더링도 없습니다.

값을 화면에 보여줘야 할 때만 `watch`로 그 필드를 구독합니다. 구독한 곳만 다시 그려지고 나머지는 그대로입니다. `formState`의 `errors`나 `isDirty`도 실제로 꺼내 쓴 것만 구독됩니다. 검증 시점도 `mode`로 조절합니다. 기본은 제출할 때 검사하고 `onBlur`로 두면 포커스가 빠질 때만 검사합니다. 매 글자마다 검사하지 않으니 그만큼 렌더링이 줍니다.

## 예시 코드

```tsx
const { register, watch, handleSubmit, formState: { errors } } = useForm({
  mode: 'onBlur',
});

<input {...register('email')} />  // 비제어, 타이핑에 리렌더 없음
const email = watch('email');     // 이 필드를 구독한 곳만 리렌더
```

## 반드시 포함할 키워드

- 제어는 매 입력 리렌더
- 비제어 방식
- register가 ref 부착
- watch로 필요한 필드만 구독
- mode로 검증 시점 조절

## 자주 틀리는 표현

- react-hook-form도 결국 매 입력마다 폼 전체를 리렌더한다.
- watch를 쓰면 폼 전체가 다시 그려진다.

## 한 줄 요약

react-hook-form은 register로 값을 DOM(ref)에 맡기는 비제어 방식이라 타이핑에 리렌더가 없고, watch로 구독한 필드만 다시 그리며 mode로 검증 시점을 조절해 렌더를 줄인다.

## 관련 노트

- [[React - 불변성]]
