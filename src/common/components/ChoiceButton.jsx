import React from 'react';
import { motion } from 'framer-motion';

export default function ChoiceButton({ choice, onSelect, disabled }) {
  return (
    <motion.button
      className={`choice-button ${choice.requiredSkill ? 'skill-required' : ''}`}
      onClick={onSelect}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {choice.text}
      {choice.requiredSkill && (
        <span className="skill-requirement">
          {choice.requiredSkill} {choice.requiredLevel}+
        </span>
      )}
    </motion.button>
  );
} 