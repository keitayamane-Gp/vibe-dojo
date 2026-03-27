import './App.css';
import { useVibeDojo } from './hooks/useVibeDojo';
import GeneratorCard from './components/GeneratorCard';
import { FavoritesList } from './components/FavoritesList';
import { ChallengeCounter } from './components/ChallengeCounter';

function App() {
  const {
    currentTopic,
    isAnimating,
    favorites,
    challengeCount,
    generate,
    isFavorited,
    toggleFavorite,
    challenge,
  } = useVibeDojo();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">VIBE DOJO</h1>
        <p className="app-tagline">バイブコーディングのお題、即出しします。</p>
        <ChallengeCounter count={challengeCount} />
      </header>

      <main className="app-main">
        <GeneratorCard
          topic={currentTopic}
          isAnimating={isAnimating}
          isFavorited={isFavorited(currentTopic)}
          onGenerate={generate}
          onToggleFavorite={() => toggleFavorite(currentTopic)}
          onChallenge={challenge}
        />
      </main>

      <aside className="app-aside">
        <FavoritesList
          favorites={favorites}
          onRemove={(id) => {
            const topic = favorites.find((f) => f.id === id);
            if (topic) toggleFavorite(topic);
          }}
        />
      </aside>

      <footer className="app-footer">
        <p>Made with Claude Code × Goodpatch</p>
      </footer>
    </div>
  );
}

export default App;
