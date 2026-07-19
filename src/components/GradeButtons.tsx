import type { Grade } from '@/domain/srs';

interface Props {
  onGrade: (grade: Grade) => void;
}

const grades: { grade: Grade; label: string; shortcut: string }[] = [
  { grade: 'unknown', label: '몰랐음', shortcut: '1' },
  { grade: 'vague', label: '애매', shortcut: '2' },
  { grade: 'known', label: '알았음', shortcut: '3' },
];

export function GradeButtons({ onGrade }: Props) {
  return (
    <div className="grade-buttons" role="group" aria-label="회상 결과 채점">
      {grades.map(({ grade, label, shortcut }) => (
        <button
          key={grade}
          type="button"
          className={`grade-buttons__button grade-buttons__button--${grade}`}
          onClick={() => onGrade(grade)}
        >
          <span className="grade-buttons__label">{label}</span>
          <span className="grade-buttons__shortcut" aria-hidden="true">
            {shortcut}
          </span>
        </button>
      ))}
    </div>
  );
}
