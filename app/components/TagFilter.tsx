'use client';

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  onToggle: (tag: string) => void;
}

/** Client-side tag filter pills. */
export default function TagFilter({ tags, activeTags, onToggle }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const active = activeTags.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className="px-2.5 py-1 font-mono text-xs rounded-full transition-colors"
            style={{
              color: active ? 'var(--accent)' : 'var(--text-muted)',
              background: active ? 'var(--accent-muted)' : 'var(--bg-sunken)',
              border: `1px solid ${active ? 'var(--accent-border)' : 'var(--border)'}`,
            }}
            aria-pressed={active}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
