import React from 'react';
import { GameProvider } from './common/contexts/GameContext';
import Campfire from './common/components/Campfire';
import './App.css';
import { AnimatePresence, motion } from 'framer-motion';
import Scene from './common/components/Scene';
import { useGame } from './common/contexts/GameContext';

export default function App() {
  const { state } = useGame();
  return (
    <GameProvider>
      <div className="app-container">
        <AnimatePresence mode="wait">
          {state.currentSceneId ? (
            <motion.div
              key={state.currentSceneId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Scene />
            </motion.div>
          ) : (
            <motion.div
              key="campfire"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Campfire />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameProvider>
  );
} 