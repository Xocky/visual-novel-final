import React, { createContext, useReducer, useContext } from 'react';
import { scenes } from '../data/scenes';
import { characters } from '../data/characters';

// Начальное состояние игры
const initialState = {
  campfireIndex: 0, // индекс текущего костра
  currentSceneId: null, // id текущей сцены
  party: [], // выбранные персонажи
  sceneHistory: [], // история пройденных сцен
  availableCharacters: [...characters]
};

// Типы действий
const ACTIONS = {
  SET_PARTY: 'SET_PARTY', // Выбор команды у костра
  START_SCENE: 'START_SCENE', // Начало новой сцены
  COMPLETE_CHOICE: 'COMPLETE_CHOICE',
  RESET_TO_CAMPFIRE: 'RESET_TO_CAMPFIRE', // Возврат к костру
  UNLOCK_CHARACTER: 'UNLOCK_CHARACTER'
};

// Редуктор для управления состоянием
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_PARTY:
      return {
        ...state,
        party: action.payload,
        currentSceneId: 'goblin_encounter' // Начинаем с первой сцены
      };
    case ACTIONS.START_SCENE:
      return {
        ...state,
        currentSceneId: action.payload,
        sceneHistory: [...state.sceneHistory, action.payload]
      };
    case ACTIONS.COMPLETE_CHOICE:
      if (action.payload.reward) {
        return {
          ...state,
          currentSceneId: action.payload.nextScene,
          availableCharacters: [
            ...state.availableCharacters,
            characters.find(c => c.id === action.payload.reward)
          ].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
        };
      }
      return {
        ...state,
        currentSceneId: action.payload.nextScene
      };
    case ACTIONS.RESET_TO_CAMPFIRE:
      return {
        ...initialState,
        campfireIndex: state.campfireIndex,
        availableCharacters: state.availableCharacters
      };
    case ACTIONS.UNLOCK_CHARACTER:
      return {
        ...state,
        availableCharacters: [
          ...state.availableCharacters,
          characters.find(c => c.id === action.payload)
        ]
      };
    default:
      return state;
  }
}

// Создание контекста
const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// Хук для использования контекста
export function useGame() {
  return useContext(GameContext);
}

export function checkSkillRequirement(party, requiredSkill, requiredLevel) {
  return party.some(character => 
    character.skills[requiredSkill] >= requiredLevel
  );
} 