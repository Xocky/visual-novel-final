import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { scenes } from '../data/scenes';
import CharacterDisplay from './CharacterDisplay';
import EnemyDisplay from './EnemyDisplay';
import ChoiceButton from './ChoiceButton';
import FeedbackBanner from './FeedbackBanner';
import useSkills from '../hooks/useSkills';
import { AnimatePresence, motion } from 'framer-motion';
import { getAssetPath } from '../../utils/getAssetPath';

export default function Scene() {
  const { state, dispatch } = useGame();
  const { checkSkill } = useSkills();
  const [feedback, setFeedback] = useState({ type: null, message: '' });

  const currentScene = scenes[state.sceneId];

  const handleChoice = (choice) => {
    // Если уже есть фидбэк, ничего не делаем
    if (feedback.type) return;

    // Проверка навыка
    if (choice.requiredSkill && !checkSkill(choice.requiredSkill, choice.requiredLevel)) {
      setFeedback({ type: 'failure', message: choice.failureText || 'Недостаточно навыков!' });
      setTimeout(() => {
        dispatch({ type: 'RESET_TO_CAMPFIRE' });
        setFeedback({ type: null, message: '' });
      }, 2000);
      return;
    }

    // Успешный выбор
    setFeedback({ type: 'success', message: choice.successText || 'Успех!' });
    setTimeout(() => {
      dispatch({ type: 'NEXT_SCENE', payload: choice.nextScene });
      setFeedback({ type: null, message: '' });
    }, 1500);
  };

  if (!currentScene) {
    return <div>Сцена не найдена!</div>;
  }

  const backgroundPath = currentScene.background ? getAssetPath(currentScene.background) : null;

  return (
    <motion.div 
      className="scene-container"
      key={state.sceneId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      style={backgroundPath ? { backgroundImage: `url(${backgroundPath})` } : {}}
    >
      <AnimatePresence>
        {feedback.type && <FeedbackBanner type={feedback.type} message={feedback.message} />}
      </AnimatePresence>

      <div className="scene-description">
        <p>{currentScene.description}</p>
      </div>

      <div className="characters-container">
        {state.party.map(character => (
          <CharacterDisplay key={character.id} character={character} />
        ))}
      </div>

      {currentScene.enemy && (
        <div className="enemies-container">
          <EnemyDisplay enemy={currentScene.enemy} />
        </div>
      )}

      <div className="choices-container">
        {currentScene.choices?.map((choice, index) => (
          <ChoiceButton 
            key={index}
            choice={choice}
            onSelect={() => handleChoice(choice)}
            disabled={feedback.type !== null}
          />
        ))}
      </div>
    </motion.div>
  );
} 