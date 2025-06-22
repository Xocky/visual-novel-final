import React, { createContext, useReducer, useContext } from 'react';
import { scenes } from '../data/scenes';
import { characters } from '../data/characters';

// Создание контекста
const GameContext = createContext();

// Начальное состояние игры
const initialState = {
  sceneId: 'introduction',
  party: [],
  unlockedCharacters: [characters[0]], // Начинаем с одним разблокированным персонажем
  isCampfire: true, // Флаг, является ли текущая сцена костром
  campfireIndex: 0, // Индекс текущего костра для прогресс-бара
};

// Редьюсер для управления состоянием игры
function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        party: action.payload,
        sceneId: 'goblin_encounter', // Первая сцена после выбора команды
        isCampfire: false,
      };
    case 'NEXT_SCENE':
      const nextScene = scenes[action.payload];
      const isNextCampfire = nextScene && nextScene.isCampfire;
      
      // Разблокировка персонажа, если есть награда
      let newUnlockedCharacters = state.unlockedCharacters;
      if (nextScene && nextScene.reward) {
        const newChar = characters.find(c => c.id === nextScene.reward);
        if (newChar && !newUnlockedCharacters.some(c => c.id === newChar.id)) {
            newUnlockedCharacters = [...newUnlockedCharacters, newChar];
        }
      }

      return {
        ...state,
        sceneId: action.payload,
        isCampfire: !!isNextCampfire,
        campfireIndex: isNextCampfire ? state.campfireIndex + 1 : state.campfireIndex,
        unlockedCharacters: newUnlockedCharacters,
      };
    case 'RESET_TO_CAMPFIRE':
      return {
        ...state,
        sceneId: 'campfire',
        isCampfire: true,
      };
    case 'LOAD_SAVE':
      // Загружаем состояние из сохранения
      return action.payload;
    default:
      return state;
  }
}

// Провайдер контекста
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // --- Система сохранений ---
  const saveGame = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vn_save', JSON.stringify(state));
      alert('Игра сохранена!');
    }
  };

  const loadGame = () => {
    if (typeof window !== 'undefined') {
      const savedGame = localStorage.getItem('vn_save');
      if (savedGame) {
        dispatch({ type: 'LOAD_SAVE', payload: JSON.parse(savedGame) });
        alert('Игра загружена!');
      } else {
        alert('Сохранение не найдено.');
      }
    }
  };

  return (
    <GameContext.Provider value={{ state, dispatch, saveGame, loadGame }}>
      {children}
    </GameContext.Provider>
  );
};

// Хук для легкого доступа к контексту
export const useGame = () => useContext(GameContext);

export function checkSkillRequirement(party, requiredSkill, requiredLevel) {
  return party.some(character => 
    character.skills[requiredSkill] >= requiredLevel
  );
} 