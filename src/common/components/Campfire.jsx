import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { characters } from '../data/characters';
import CharacterCard from './CharacterCard';

export default function Campfire() {
  const { dispatch } = useGame();
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleSelect = (charId) => {
    if (selectedCharacters.includes(charId)) {
      // Отмена выбора
      setSelectedCharacters(selectedCharacters.filter(id => id !== charId));
    } else if (selectedCharacters.length < 2) {
      // Выбор (не больше двух)
      setSelectedCharacters([...selectedCharacters, charId]);
    }
  };

  const confirmSelection = () => {
    // Формируем команду из выбранных персонажей
    const party = characters.filter(char => selectedCharacters.includes(char.id));
    dispatch({ type: 'SET_PARTY', payload: party });
  };

  return (
    <div className="campfire-screen">
      <h2>У костра</h2>
      <p>Выберите двух спутников для следующего этапа пути:</p>

      <div className="characters-grid">
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedCharacters.includes(character.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <button
        onClick={confirmSelection}
        disabled={selectedCharacters.length !== 2}
      >
        Отправиться в путь
      </button>
    </div>
  );
} 