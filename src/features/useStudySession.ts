import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Card } from '@/domain/card';
import {
  applyGrade,
  compareByPriority,
  initialProgress,
  type Grade,
  type Progress,
} from '@/domain/srs';

const STORAGE_KEY = 'fe-flashcards:progress';

type ProgressMap = Record<string, Progress>;

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: ProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }

  return result;
}

// 먼저 섞은 뒤 우선순위로 안정 정렬 → 같은 우선순위(같은 노트의 형제 카드)는 무작위로 흩어진다.
function buildQueue(list: Card[], progress: ProgressMap): string[] {
  return shuffle(list)
    .sort((a, b) =>
      compareByPriority(
        progress[a.id] ?? initialProgress,
        progress[b.id] ?? initialProgress,
      ),
    )
    .map((card) => card.id);
}

// 몰랐던 카드를 세션 앞쪽으로 되돌려 곧 다시 등장시키기 위한 간격.
const REAPPEAR_GAP = 3;

export function useStudySession(activeCards: Card[]) {
  const cardById = useMemo(
    () => new Map(activeCards.map((card) => [card.id, card])),
    [activeCards],
  );

  const [queue, setQueue] = useState<string[]>([]);
  const [completed, setCompleted] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const startSession = useCallback(() => {
    setQueue(buildQueue(activeCards, loadProgress()));
    setCompleted(0);
    setIsFlipped(false);
  }, [activeCards]);

  useEffect(() => {
    startSession();
  }, [startSession]);

  const currentCard = queue.length > 0 ? cardById.get(queue[0]) ?? null : null;

  const flip = useCallback(() => setIsFlipped(true), []);

  const grade = useCallback((selected: Grade) => {
    setQueue((previous) => {
      if (previous.length === 0) {
        return previous;
      }

      const [head, ...rest] = previous;

      const stored = loadProgress();
      saveProgress({
        ...stored,
        [head]: applyGrade(stored[head] ?? initialProgress, selected),
      });

      setIsFlipped(false);

      if (selected === 'known') {
        setCompleted((count) => count + 1);
        return rest;
      }

      if (selected === 'unknown') {
        const position = Math.min(REAPPEAR_GAP, rest.length);
        return [...rest.slice(0, position), head, ...rest.slice(position)];
      }

      return [...rest, head];
    });
  }, []);

  return {
    currentCard,
    isFlipped,
    completed,
    remaining: queue.length,
    total: completed + queue.length,
    flip,
    grade,
    restart: startSession,
  };
}
