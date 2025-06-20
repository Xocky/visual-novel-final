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
  const [activeChoice, setActiveChoice] = useState(null);
  const [resultMessage, setResultMessage] = useState('');

  if (!scene) return null;

  const handleChoice = (choice) => {
    setActiveChoice(choice.id);
    if (choice.requiredSkill) {
      const hasSkill = checkSkillRequirement(
        state.party,
        choice.requiredSkill,
        choice.requiredLevel
      );
      if (hasSkill) {
        setResultMessage(choice.successText);
        setTimeout(() => {
          dispatch({
            type: 'COMPLETE_CHOICE',
            payload: choice
          });
          setActiveChoice(null);
          setResultMessage('');
        }, 2000);
      } else {
        setResultMessage('Недостаточно навыков! Возвращаемся к костру...');
        setTimeout(() => {
          dispatch({ type: 'RESET_TO_CAMPFIRE' });
          setActiveChoice(null);
          setResultMessage('');
        }, 3000);
      }
    } else {
      dispatch({
        type: 'COMPLETE_CHOICE',
        payload: choice
      });
    }
  };

  return (
    <motion.div
      className="scene-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={scene.background ? { backgroundImage: `url(/images/backgrounds/${scene.background})` } : {}}
    >
      <div className="scene-description">
        <p>{scene.description}</p>
        {resultMessage && (
          <div className="result-message">
            {resultMessage}
          </div>
        )}
      </div>
      <div className="characters-layout">
        <div className="party-side">
          {state.party.map(character => (
            <CharacterDisplay
              key={character.id}
              character={character}
              isActive={activeChoice && character.skills[scenes[state.currentSceneId].choices.find(c => c.id === activeChoice)?.requiredSkill]}
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
              isActive={activeChoice === 'fight'}
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
            disabled={activeChoice !== null}
          />
        ))}
      </div>
    </motion.div>
  );
} 