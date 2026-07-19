import type { Card } from '@/domain/card';
import { MarkdownContent } from '@/components/MarkdownContent';

interface Props {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
}

export function Flashcard({ card, isFlipped, onFlip }: Props) {
  if (!isFlipped) {
    return (
      <button type="button" className="flashcard flashcard--front" onClick={onFlip}>
        <span className="flashcard__category">{card.category}</span>
        <span className="flashcard__keyword">{card.front}</span>
        <span className="flashcard__hint">머릿속으로 답한 뒤 눌러서 확인 · Space</span>
      </button>
    );
  }

  return (
    <article className="flashcard flashcard--back">
      <header className="flashcard__back-header">
        <span className="flashcard__category">{card.category}</span>
        <h2 className="flashcard__keyword-small">{card.front}</h2>
      </header>

      <p className="flashcard__core">{card.core}</p>

      {card.detail && (
        <details className="flashcard__detail">
          <summary>더보기 · 원문 상세</summary>
          <MarkdownContent>{card.detail}</MarkdownContent>
        </details>
      )}
    </article>
  );
}
