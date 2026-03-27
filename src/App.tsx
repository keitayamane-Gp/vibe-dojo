import './App.css';
import { useVibeDojo } from './hooks/useVibeDojo';
import GeneratorCard from './components/GeneratorCard';
import { FavoritesList } from './components/FavoritesList';
import { DeclarationModal } from './components/DeclarationModal';

function App() {
  const {
    currentTopic,
    isAnimating,
    favorites,
    generate,
    isFavorited,
    toggleFavorite,
    challenge,
    isModalOpen,
    declarationText,
    setDeclarationText,
    copied,
    copyDeclaration,
    closeModal,
  } = useVibeDojo();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">VIBE DOJO</h1>
        <p className="app-tagline">バイブコーディングのお題、即出しします。</p>
      </header>

      <main className="app-main">
        <GeneratorCard
          topic={currentTopic}
          isAnimating={isAnimating}
          isFavorited={isFavorited(currentTopic)}
          onGenerate={generate}
          onToggleFavorite={() => toggleFavorite(currentTopic)}
          onChallenge={() => challenge(currentTopic)}
        />
      </main>

      <aside className="app-aside">
        <FavoritesList
          favorites={favorites}
          onChallenge={challenge}
          onRemove={(id) => {
            const topic = favorites.find((f) => f.id === id);
            if (topic) toggleFavorite(topic);
          }}
        />
      </aside>

      <footer className="app-footer">
        <p>Made with Claude Code × Goodpatch</p>
      </footer>

      {isModalOpen && (
        <DeclarationModal
          text={declarationText}
          onTextChange={setDeclarationText}
          onCopy={copyDeclaration}
          onClose={closeModal}
          copied={copied}
        />
      )}
    </div>
  );
}

export default App;
