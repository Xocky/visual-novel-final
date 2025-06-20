import React from 'react';
import { motion } from 'framer-motion';

export default function CharacterDisplay({ character, isActive, position = 'left' }) {
  return (
    <motion.div
      className={`character-display ${position}`}
      initial={{ x: position === 'left' ? -100 : 100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        scale: isActive ? 1.1 : 1
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="character-image">
        <img
          src={`${process.env.PUBLIC_URL}/images/characters/${character.image}`}
          alt={character.name}
          style={{ transform: position === 'right' ? 'scaleX(-1)' : 'none' }}
        />
      </div>
      <div className="character-info">
        <h4>{character.name}</h4>
        <div className="skills">
          {Object.entries(character.skills).map(([skill, value]) => (
            <span key={skill} className="skill-badge">
              {skill}: {value}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 