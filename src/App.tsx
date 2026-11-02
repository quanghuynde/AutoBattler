import React from 'react';
import { Toaster } from 'sonner';
import { useGameStore } from './hooks/useGameStore';
import { useUiStore } from './hooks/useUiStore';
import { CollectionPage } from './pages/CollectionPage';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { ResultPage } from './pages/ResultPage';
import { ShopPage } from './pages/ShopPage';
import { StarterPage } from './pages/StarterPage';
import { VictoryPage } from './pages/VictoryPage';

export function App() {
  const view = useUiStore((s) => s.view);
  const active = useGameStore((s) => s.active);
  const phase = useGameStore((s) => s.phase);

  let content: React.ReactNode;
  if (view === 'collection') {
    content = <CollectionPage />;
  } else if (view === 'game' && active) {
    if (phase === 'starter') content = <StarterPage />;else
    if (phase === 'shop') content = <ShopPage />;else
    if (phase === 'result') content = <ResultPage />;else
    if (phase === 'victory') content = <VictoryPage />;else
    content = <GamePage />;
  } else {
    content = <HomePage />;
  }

  return (
    <div className="min-h-screen w-full bg-army-900 font-sans text-paper">
      {content}
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: { background: '#242A30', color: '#F0EBDD', border: '1px solid rgba(216,173,98,0.35)', fontFamily: '"Be Vietnam Pro", sans-serif' }
        }} />
      
    </div>);

}