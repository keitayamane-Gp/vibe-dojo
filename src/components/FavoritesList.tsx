import type { FavoriteTopic } from '../types';

interface FavoritesListProps {
  favorites: FavoriteTopic[];
  onRemove: (id: string) => void;
}

export function FavoritesList({ favorites, onRemove }: FavoritesListProps) {
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
                <button
                  className="favorite-item__remove"
                  onClick={() => onRemove(fav.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </details>
    </div>
  );
}
