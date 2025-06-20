export const scenes = {
  campfire_0: {
    id: 'campfire_0',
    type: 'campfire',
    description: "Вы у костра. Выберите 2 спутника для следующего отрезка пути."
  },
  goblin_encounter: {
    id: 'goblin_encounter',
    description: "На тропе внезапно появились гоблины! Они выглядят агрессивно.",
    background: 'forest-path.jpg',
    enemies: [
      { id: 'goblin1', name: "Гоблин-воин", image: 'goblin_warrior.png', position: 'right' },
      { id: 'goblin2', name: "Гоблин-лучник", image: 'goblin_archer.png', position: 'right' }
    ],
    characters: [
      { id: 'lancelot', position: 'left' }
    ],
    choices: [
      { 
        id: 'fight',
        text: "⚔️ Сражаться", 
        requiredSkill: "Бой", 
        requiredLevel: 2,
        nextScene: "goblin_victory",
        successText: "Ваши воины легко расправились с гоблинами!"
      },
      { 
        id: 'trick',
        text: "🎭 Обмануть", 
        requiredSkill: "Обман", 
        requiredLevel: 3,
        nextScene: "goblin_trick",
        successText: "Ваша хитрость заставила гоблинов усомниться в своих силах!"
      },
      { 
        id: 'escape',
        text: "🏃‍♂️ Убежать", 
        requiredSkill: "Ловкость", 
        requiredLevel: 3,
        nextScene: "goblin_escape",
        successText: "Вы успешно избежали столкновения!"
      }
    ]
  },
  goblin_victory: {
    id: 'goblin_victory',
    description: "Вы победили гоблинов! На земле вы замечаете блестящий предмет...",
    background: 'forest-clearing.jpg',
    choices: [
      { 
        id: 'loot',
        text: "🔍 Осмотреть предмет", 
        nextScene: "ancient_artifact",
        reward: 'lancelot'
      },
      { 
        id: 'continue',
        text: "➡️ Продолжить путь", 
        nextScene: "forest_path"
      }
    ]
  },
  ancient_artifact: {
    id: 'ancient_artifact',
    description: "Это древний артефакт! К вам подходит таинственный воин...",
    background: 'forest-ruins.jpg',
    characters: [
      { id: 'lancelot', position: 'left' }
    ],
    choices: [
      { 
        id: 'accept',
        text: "🤝 Принять помощь воина", 
        nextScene: "campfire_1"
      }
    ]
  },
  after_fight: {
    id: 'after_fight',
    title: 'После боя',
    description: 'Вы успешно победили гоблинов, но ваш отряд понес потери.',
    choices: [
      {
        id: 'continue',
        text: 'Продолжить путь',
        requiredSkill: null,
        nextScene: 'river_crossing'
      }
    ]
  },
  // Добавьте дополнительные сцены по аналогии
};

export const campfires = [
  {
    id: 'campfire1',
    nextScenes: ['goblin_encounter', 'forest_path']
  },
  {
    id: 'campfire2',
    nextScenes: ['cave_exploration', 'mountain_pass']
  }
]; 