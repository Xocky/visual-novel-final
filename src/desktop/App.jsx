import React from 'react';
import { GameProvider, useGame } from '../common/contexts/GameContext';
import Campfire from '../common/components/Campfire';
import Scene from '../common/components/Scene';
import { AnimatePresence } from 'framer-motion';
import '../web/App.css';

function AppContent() {
  const { state } = useGame();
  return (
    <AnimatePresence mode="wait">
      {state.currentSceneId === null || (typeof state.currentSceneId === 'string' && state.currentSceneId.startsWith('campfire')) ? (
        <Campfire key="campfire" />
      ) : (
        <Scene key={state.currentSceneId} />
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <GameProvider>
      <div className="app-container">
        <AppContent />
      </div>
    </GameProvider>
  );
}

export default App; 