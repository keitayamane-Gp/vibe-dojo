import { useState, useCallback } from 'react';
import { targets, themes, constraints, pickRandom } from '../data/topics';
import { useLocalStorage } from './useLocalStorage';
import type { Topic, FavoriteTopic } from '../types';

function generateId(topic: Topic): string {
  return `${topic.target}__${topic.theme}__${topic.constraint}`;
}

function generateTopic(): Topic {
  return {
    target: pickRandom(targets),
    theme: pickRandom(themes),
    constraint: pickRandom(constraints),
  };
}

export function useVibeDojo() {
  const [currentTopic, setCurrentTopic] = useState<Topic>(() => generateTopic());
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<FavoriteTopic[]>('vibe-dojo:favorites', []);
  const [challengeCount, setChallengeCount] = useLocalStorage<number>('vibe-dojo:challenge-count', 0);

  const generate = useCallback(() => {
    setIsAnimating(true);
    setCurrentTopic(generateTopic());
    setTimeout(() => setIsAnimating(false), 400);
  }, []);

  const isFavorited = useCallback(
    (topic: Topic) => favorites.some((f) => f.id === generateId(topic)),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (topic: Topic) => {
      const id = generateId(topic);
      setFavorites((prev) => {
        const exists = prev.some((f) => f.id === id);
        if (exists) {
          return prev.filter((f) => f.id !== id);
        }
        return [...prev, { ...topic, id, savedAt: Date.now() }];
      });
    },
    [setFavorites],
  );

  const challenge = useCallback(() => {
    setChallengeCount((prev) => prev + 1);
  }, [setChallengeCount]);

  return {
    currentTopic,
    isAnimating,
    favorites,
    challengeCount,
    generate,
    isFavorited,
    toggleFavorite,
    challenge,
  };
}
