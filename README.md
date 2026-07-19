# fe-flashcards

프론트엔드 CS 면접 대비용 **키워드 플래시카드** 앱.

카드 앞면은 키워드 하나만 보여주고, 뒤집으면(클릭/Space) 한 줄 요약과 `더보기`(원문 상세)가 나온다. 답을 타이핑하는 게 아니라 소리 내어 말하거나 떠올려 보며 친숙해지는 게 목표다. 진행 상황은 localStorage에 Leitner 방식으로 저장된다.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드
```

`dev`/`build` 전에 `scripts/build-cards.mjs`가 자동 실행되어 `content/`의 노트를 파싱해 `src/data/cards.json`을 생성한다.

## 콘텐츠 구조

원본 노트는 레포 안 `content/`에 카테고리별로 있다(옵시디언 노트 형식). 각 노트의 `## 반드시 포함할 키워드` 목록이 카드 앞면들이 되고, 같은 노트의 `## 한 줄 요약`과 상세(질문·최적 답변 등)를 뒷면으로 공유한다. 그래서 한 노트가 여러 장의 카드로 펼쳐진다.

노트를 추가·수정하면 파서가 다시 돌아 카드에 반영된다. 앱과 배포는 생성된 `cards.json`만 사용하므로 `content/` 없이도 빌드된다.

## 구조

```
content/            원본 노트(카테고리별 .md)
scripts/            content → cards.json 파서
src/
  domain/           card.ts, srs.ts (순수 로직)
  features/         useStudySession.ts (세션 조립)
  components/       카드·채점·진행 프레젠터
  data/cards.json   생성된 카드 데이터
```
