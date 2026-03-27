import type { FavoriteTopic, Topic } from '../types';

interface FavoritesListProps {
  favorites: FavoriteTopic[];
  onSelect: (topic: Topic) => void;
  onRemove: (id: string) => void;
}

export function FavoritesList({ favorites, onSelect, onRemove }: FavoritesListProps) {
  return (
    <div className="favorites-panel">
      <details>
        <summary className="favorites-summary">❤️ 保存したお題 ({favorites.length}件)</summary>
        {favorites.length === 0 ? (
          <p className="favorites-empty">まだ保存したお題はありません</p>
        ) : (
          <ul className="favorites-list">
            {favorites.map((fav) => (
              <li className="favorite-item" key={fav.id}>
                <span className="favorite-item__text">
                  🎯 {fav.target} × 🏷️ {fav.theme} × ⚡ {fav.constraint}
                </span>
                <div className="favorite-item__actions">
                  <button
                    className="favorite-item__select"
                    onClick={() => onSelect(fav)}
                    aria-label={`${fav.target}のお題を使う`}
                  >
                    このお題にする
                  </button>
                  <button
                    className="favorite-item__remove"
                    onClick={() => onRemove(fav.id)}
                    aria-label={`${fav.target}のお題を削除`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </details>
    </div>
  );
}
