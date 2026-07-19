export type Grade = 'unknown' | 'vague' | 'known';

export interface Progress {
  box: number;
  reviewCount: number;
}

const MAX_BOX = 4;

export const initialProgress: Progress = { box: 0, reviewCount: 0 };

export function applyGrade(progress: Progress, grade: Grade): Progress {
  const reviewCount = progress.reviewCount + 1;

  if (grade === 'known') {
    return { box: Math.min(progress.box + 1, MAX_BOX), reviewCount };
  }

  if (grade === 'unknown') {
    return { box: 0, reviewCount };
  }

  return { box: progress.box, reviewCount };
}

// 덜 익힌 카드(낮은 box)부터, 같은 box면 복습 적은 순서로 학습한다.
export function compareByPriority(a: Progress, b: Progress): number {
  if (a.box !== b.box) {
    return a.box - b.box;
  }

  return a.reviewCount - b.reviewCount;
}
