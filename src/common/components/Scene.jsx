import React from 'react';
import { useGame } from '../contexts/GameContext';
import { scenes } from '../data/scenes';

export default function Scene({ sceneId }) {
  const { state, dispatch } = useGame();
  const scene = scenes[sceneId];
  
  // Проверяем, существует ли сцена
  if (!scene) {
    console.error(`Сцена с ID "${sceneId}" не найдена`);
    return (
      <div className="scene-container">
        <h2>Ошибка</h2>
        <p>Сцена не найдена. Возвращаемся к костру...</p>
        <button onClick={() => dispatch({ type: 'RESET_TO_CAMPFIRE' })}>
          Вернуться к костру
        </button>
      </div>
    );
  }

  const handleChoice = (choice) => {
    if (!choice.requiredSkill) {
      // Вариант без требований
      if (choice.nextScene) {
        dispatch({ type: 'START_SCENE', payload: choice.nextScene });
      } else {
        // Конец игры
        dispatch({ type: 'COMPLETE_GAME' });
      }
      return;
    }
    
    // Проверяем наличие подходящего персонажа
    const suitableCharacter = state.party.find(char => 
      char.skills[choice.requiredSkill.type] >= choice.requiredSkill.level
    );
    
    if (suitableCharacter) {
      if (choice.nextScene) {
        dispatch({ 
          type: 'COMPLETE_CHOICE', 
          payload: { 
            choice, 
            characterId: suitableCharacter.id 
          } 
        });
      } else {
        // Конец игры
        dispatch({ type: 'COMPLETE_GAME' });
      }
    } else {
      // Неудача - возврат к костру
      dispatch({ type: 'RESET_TO_CAMPFIRE' });
    }
  };

  return (
    <div className="scene-container">
      <h2>{scene.title}</h2>
      <p>{scene.description}</p>
      
      <div className="choices">
        {scene.choices.map((choice) => (
          <button 
            key={choice.id} 
            onClick={() => handleChoice(choice)}
            className="choice-button"
          >
            {choice.text}
          </button>
        ))}
      </div>
      
      <div className="party-status">
        <h3>Ваша команда:</h3>
        <div className="party-members">
          {state.party.map(char => (
            <div key={char.id} className="party-member">
              <h4>{char.name}</h4>
              <div className="skills">
                {Object.entries(char.skills).map(([skill, value]) => (
                  <div key={skill}>
                    {skill}: {value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 