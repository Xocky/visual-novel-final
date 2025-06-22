import { useGame } from '../contexts/GameContext';

export default function useSkills() {
  const { state } = useGame();
  
  const checkSkill = (skill, requiredLevel) => {
    // Проверяем, есть ли в команде персонаж с нужным навыком достаточного уровня
    return state.party?.some(character => 
      character.skills && character.skills[skill] >= requiredLevel
    ) ?? false;
  };

  return { checkSkill };
} 