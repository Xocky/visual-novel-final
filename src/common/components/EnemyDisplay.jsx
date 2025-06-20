import React from 'react';
import { motion } from 'framer-motion';

export default function EnemyDisplay({ enemy, isActive, position = 'right' }) {
  return (
    <motion.div
      className={`enemy-display ${position}`}
      initial={{ x: position === 'left' ? -100 : 100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        scale: isActive ? 1.1 : 1
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      exit={{ x: position === 'left' ? -100 : 100, opacity: 0 }}
    >
      <div className="enemy-image">
        <img
          src={`/images/enemies/${enemy.image}`}
          alt={enemy.name}
          style={{ transform: position === 'left' ? 'scaleX(-1)' : 'none' }}
        />
      </div>
      <div className="enemy-info">
        <h4>{enemy.name}</h4>
      </div>
    </motion.div>
  );
} 