interface ChallengeCounterProps {
  count: number;
}

export function ChallengeCounter({ count }: ChallengeCounterProps) {
  if (count === 0) {
    return null;
  }

  return (
    <div className="challenge-counter">
      <span className="challenge-counter__number">{count}</span>
      <span className="challenge-counter__label">個のお題に挑戦中！</span>
    </div>
  );
}
