interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export const ALL_CATEGORIES = 'all';

export function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <nav className="category-filter" aria-label="카테고리 선택">
      <button
        type="button"
        className="category-filter__chip"
        aria-pressed={selected === ALL_CATEGORIES}
        onClick={() => onSelect(ALL_CATEGORIES)}
      >
        전체
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="category-filter__chip"
          aria-pressed={selected === category}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}
