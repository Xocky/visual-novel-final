import React, { createContext, useReducer, useContext } from 'react';

// Начальное состояние игры
const initialState = {
  campfireIndex: 0, // индекс текущего костра
  currentSceneId: null, // id текущей сцены
  party: [], // выбранные персонажи
  sceneHistory: [] // история пройденных сцен
};

// Типы действий
const ACTIONS = {
  SET_PARTY: 'SET_PARTY', // Выбор команды у костра
  START_SCENE: 'START_SCENE', // Начало новой сцены
  COMPLETE_CHOICE: 'COMPLETE_CHOICE', // Завершение выбора
  RESET_TO_CAMPFIRE: 'RESET_TO_CAMPFIRE', // Возврат к костру
  ADVANCE_CAMPFIRE: 'ADVANCE_CAMPFIRE' // Переход к следующему костру
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
      // Обновляем навыки персонажа
      const updatedParty = state.party.map(char => {
        if (char.id === action.payload.characterId) {
          const skillType = action.payload.choice.requiredSkill.type;
          return {
            ...char,
            skills: {
              ...char.skills,
              [skillType]: char.skills[skillType] - 1
            }
          };
        }
        return char;
      });
      return {
        ...state,
        party: updatedParty,
        currentSceneId: action.payload.choice.nextScene
      };
    case ACTIONS.RESET_TO_CAMPFIRE:
      return {
        ...initialState,
        campfireIndex: state.campfireIndex
      };
    case ACTIONS.ADVANCE_CAMPFIRE:
      return {
        ...initialState,
        campfireIndex: state.campfireIndex + 1
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