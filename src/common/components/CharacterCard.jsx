import React from 'react';

export default function CharacterCard({ character, isSelected, onSelect }) {
  return (
    <div 
      className={`character-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(character.id)}
    >
      <div className="character-image">
        {/* Заглушка для изображения */}
        <div className="image-placeholder" style={{ backgroundColor: '#ddd' }} />
      </div>
      <h3>{character.name}</h3>
      <p>{character.description}</p>
      <div className="skills">
        {Object.entries(character.skills).map(([skill, value]) => (
          <span key={skill}>{skill}: {value}</span>
        ))}
      </div>
    </div>
  );
} 