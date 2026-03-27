import React from 'react';
import type { Topic } from '../types';

interface GeneratorCardProps {
  topic: Topic;
  isAnimating: boolean;
  isFavorited: boolean;
  onGenerate: () => void;
  onToggleFavorite: () => void;
  onChallenge: () => void;
}

const GeneratorCard: React.FC<GeneratorCardProps> = ({
  topic,
  isAnimating,
  isFavorited,
  onGenerate,
  onToggleFavorite,
  onChallenge,
}) => {
  const cardClass = `generator-card${isAnimating ? ' generator-card--animating' : ''}`;
  const favoriteClass = `btn btn--ghost btn--favorite${isFavorited ? ' btn--favorited' : ''}`;

  return (
    <div className={cardClass}>
      <div className="topic-list">
        <div className="topic-item topic-item--target">
          <span className="topic-item__emoji">🎯</span>
          <div className="topic-item__content">
            <span className="topic-item__label">ターゲット</span>
            <span className="topic-item__value">{topic.target}</span>
          </div>
        </div>

        <div className="topic-item topic-item--theme">
          <span className="topic-item__emoji">🏷️</span>
          <div className="topic-item__content">
            <span className="topic-item__label">テーマ</span>
            <span className="topic-item__value">{topic.theme}</span>
          </div>
        </div>

        <div className="topic-item topic-item--constraint">
          <span className="topic-item__emoji">⚡</span>
          <div className="topic-item__content">
            <span className="topic-item__label">制約</span>
            <span className="topic-item__value">{topic.constraint}</span>
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn btn--primary btn--shuffle" onClick={onGenerate}>
          🎲 シャッフル
        </button>

        <button className={favoriteClass} onClick={onToggleFavorite}>
          {isFavorited ? '❤️ 保存済み' : '🤍 保存する'}
        </button>

        <button className="btn btn--accent btn--challenge" onClick={onChallenge}>
          🚀 このお題で作る！
        </button>
      </div>
    </div>
  );
};

export default GeneratorCard;
