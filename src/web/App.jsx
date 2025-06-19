import React from 'react';
import { GameProvider } from '../common/contexts/GameContext';
import Campfire from '../common/components/Campfire';
import './App.css';

function App() {
  return (
    <GameProvider>
      <div className="app-container">
        <Campfire />
      </div>
    </GameProvider>
  );
}

export default App; 