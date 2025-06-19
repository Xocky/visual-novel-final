import React from 'react';
import { GameProvider, useGame } from '../common/contexts/GameContext';
import Campfire from '../common/components/Campfire';
import Scene from '../common/components/Scene';
import { campfires } from '../common/data/scenes';
import './App.css';

function GameScreen() {
  const { state } = useGame();
  
  if (state.campfireIndex >= campfires.length) {
    return (
      <div className="end-screen">
        <h2>Поздравляем!</h2>
        <p>Вы успешно завершили путешествие!</p>
      </div>
    );
  }
  
  if (!state.currentSceneId) {
    return <Campfire />;
  }
  
  return <Scene sceneId={state.currentSceneId} />;
}

function App() {
  return (
    <GameProvider>
      <div className="app-container">
        <GameScreen />
      </div>
    </GameProvider>
  );
}

export default App; 