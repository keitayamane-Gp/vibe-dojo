export interface Topic {
  target: string;
  theme: string;
  constraint: string;
}

export interface FavoriteTopic extends Topic {
  id: string;       // `${target}__${theme}__${constraint}` 形式
  savedAt: number;  // Date.now() timestamp
}
