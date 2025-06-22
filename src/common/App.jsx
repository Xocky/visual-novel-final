import React from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import Scene from './components/Scene';
import Campfire from './components/Campfire';
import ProgressBar from './components/ProgressBar';

// Внутренний компонент, который имеет доступ к контексту
const GameView = () => {
  const { state, saveGame, loadGame } = useGame();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Последний Рубеж</h1>
        <div className="save-load-buttons">
            <button onClick={saveGame}>Сохранить</button>
            <button onClick={loadGame}>Загрузить</button>
        </div>
      </header>
      <main>
        <ProgressBar campfires={3} current={state.campfireIndex} />
        {state.isCampfire ? <Campfire /> : <Scene />}
      </main>
    </div>
  );
}

// Главный компонент App, который оборачивает всё в провайдер
function App() {
  return (
    <GameProvider>
      <GameView />
    </GameProvider>
  );
}

export default App; 