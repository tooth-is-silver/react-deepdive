interface Props {
  completed: number;
  total: number;
}

export function SessionProgress({ completed, total }: Props) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="session-progress">
      <div
        className="session-progress__bar"
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`익힌 카드 ${completed} / ${total}`}
      >
        <div className="session-progress__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="session-progress__label">
        익힘 {completed} / {total}
      </span>
    </div>
  );
}
