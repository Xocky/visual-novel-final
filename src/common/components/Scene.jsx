import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { scenes } from '../data/scenes';
import { checkSkillRequirement } from '../contexts/GameContext';
import CharacterDisplay from './CharacterDisplay';
import EnemyDisplay from './EnemyDisplay';
import ChoiceButton from './ChoiceButton';
import { motion } from 'framer-motion';
import { characters } from '../data/characters';

export default function Scene() {
  const { state, dispatch } = useGame();
  const scene = scenes[state.currentSceneId];
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [choiceResult, setChoiceResult] = useState(null);

  if (!scene) return null;

  const handleChoice = (choice) => {
    setSelectedChoice(choice.id);
    const hasSkill = state.party.some(char => 
      char.skills[choice.requiredSkill] >= choice.requiredLevel
    );
    if (hasSkill || !choice.requiredSkill) {
      setChoiceResult('success');
      setTimeout(() => {
        setChoiceResult(null);
        dispatch({ type: 'START_SCENE', payload: choice.nextScene });
      }, 1500);
    } else {
      setChoiceResult('failure');
      setTimeout(() => {
        setChoiceResult(null);
        dispatch({ type: 'RESET_TO_CAMPFIRE' });
      }, 2000);
    }
  };

  const getBackgroundPath = (bg) => {
    if (window?.process?.type) {
      // Electron
      return `images/backgrounds/${bg}`;
    }
    // Web
    return `${process.env.PUBLIC_URL}/images/backgrounds/${bg}`;
  };

  return (
    <motion.div
      className="scene-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={scene.background ? { backgroundImage: `url(${getBackgroundPath(scene.background)})` } : {}}
    >
      <div className="scene-description">
        <p>{scene.description}</p>
      </div>
      <div className="characters-layout">
        <div className="party-side">
          {state.party.map(character => (
            <CharacterDisplay
              key={character.id}
              character={character}
              isActive={selectedChoice && choiceResult === 'success' && character.skills[scenes[state.currentSceneId].choices.find(c => c.id === selectedChoice)?.requiredSkill]}
              position="left"
            />
          ))}
          {scene.characters?.map(char => {
            const charData = characters.find(c => c.id === char.id);
            return charData && (
              <CharacterDisplay
                key={char.id}
                character={charData}
                position={char.position || 'left'}
              />
            );
          })}
        </div>
        <div className="enemies-side">
          {scene.enemies?.map(enemy => (
            <EnemyDisplay
              key={enemy.id}
              enemy={enemy}
              isActive={selectedChoice && choiceResult === 'success' && selectedChoice === 'fight'}
              position="right"
            />
          ))}
        </div>
      </div>
      <div className="choices-container">
        {scene.choices && scene.choices.map(choice => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            onSelect={() => handleChoice(choice)}
            disabled={selectedChoice !== null}
            result={choiceResult}
          />
        ))}
      </div>
    </motion.div>
  );
} 