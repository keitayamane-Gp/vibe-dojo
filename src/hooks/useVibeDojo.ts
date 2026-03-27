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

function buildDeclarationText(topic: Topic): string {
  return `【バイブコーディング宣言🚀】
今日挑戦するお題はこれ！

🎯 ターゲット：${topic.target}
🏷️ テーマ：${topic.theme}
⚡ 制約：${topic.constraint}

さっそく作ってみます！
#バイブコーディング #VIBEDOJO`;
}

export function useVibeDojo() {
  const [currentTopic, setCurrentTopic] = useState<Topic>(() => generateTopic());
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<FavoriteTopic[]>('vibe-dojo:favorites', []);

  // モーダル関連
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [declarationText, setDeclarationText] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setIsAnimating(true);
    setCurrentTopic(generateTopic());
    setTimeout(() => setIsAnimating(false), 400);
  }, []);

  // お気に入りからお題を選ぶ（アニメーション付き）
  const selectTopic = useCallback((topic: Topic) => {
    setIsAnimating(true);
    setCurrentTopic(topic);
    setTimeout(() => setIsAnimating(false), 400);
    // ページトップへスクロール（モバイルでお気に入りが下にある場合）
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        if (exists) return prev.filter((f) => f.id !== id);
        return [...prev, { ...topic, id, savedAt: Date.now() }];
      });
    },
    [setFavorites],
  );

  // 「このお題で作る！」→ 宣言文モーダルを開く
  const challenge = useCallback((topic: Topic) => {
    setDeclarationText(buildDeclarationText(topic));
    setCopied(false);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCopied(false);
  }, []);

  const copyDeclaration = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(declarationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // フォールバック：テキストエリアのselect
    }
  }, [declarationText]);

  return {
    currentTopic,
    isAnimating,
    favorites,
    generate,
    selectTopic,
    isFavorited,
    toggleFavorite,
    challenge,
    isModalOpen,
    declarationText,
    setDeclarationText,
    copied,
    copyDeclaration,
    closeModal,
  };
}
