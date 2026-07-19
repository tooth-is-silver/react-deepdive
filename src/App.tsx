import { useEffect, useMemo, useState } from 'react';
import { cards, categories } from '@/domain/card';
import { useStudySession } from '@/features/useStudySession';
import type { Grade } from '@/domain/srs';
import { Flashcard } from '@/components/Flashcard';
import { GradeButtons } from '@/components/GradeButtons';
import { SessionProgress } from '@/components/SessionProgress';
import { ALL_CATEGORIES, CategoryFilter } from '@/components/CategoryFilter';
import './App.css';

const shortcutToGrade: Record<string, Grade> = {
  '1': 'unknown',
  '2': 'vague',
  '3': 'known',
};

export default function App() {
  const [category, setCategory] = useState(ALL_CATEGORIES);

  const activeCards = useMemo(
    () =>
      category === ALL_CATEGORIES
        ? cards
        : cards.filter((card) => card.category === category),
    [category],
  );

  const { currentCard, isFlipped, completed, total, flip, grade, restart } =
    useStudySession(activeCards);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (!currentCard) {
        return;
      }

      if (!isFlipped && event.code === 'Space') {
        event.preventDefault();
        flip();
        return;
      }

      if (isFlipped && shortcutToGrade[event.key]) {
        grade(shortcutToGrade[event.key]);
      }
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [currentCard, isFlipped, flip, grade]);

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">FE 면접 플래시카드</h1>
        <p className="app__subtitle">키워드를 보고 소리내어 답한 뒤 뒤집어 확인하세요.</p>
      </header>

      <CategoryFilter
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <SessionProgress completed={completed} total={total} />

      {currentCard ? (
        <section className="app__stage">
          <Flashcard card={currentCard} isFlipped={isFlipped} onFlip={flip} />
          {isFlipped && <GradeButtons onGrade={grade} />}
        </section>
      ) : (
        <section className="app__done" aria-live="polite">
          <p className="app__done-title">이번 세션 카드를 모두 익혔어요 🎉</p>
          <button type="button" className="app__restart" onClick={restart}>
            다시 학습하기
          </button>
        </section>
      )}
    </main>
  );
}
