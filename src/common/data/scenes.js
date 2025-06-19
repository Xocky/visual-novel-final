export const scenes = {
  goblin_encounter: {
    id: 'goblin_encounter',
    title: 'Встреча с гоблинами',
    description: 'Вы наткнулись на группу гоблинов, блокирующих дорогу. Они выглядят агрессивно.',
    image: 'goblins.jpg',
    choices: [
      {
        id: 'fight',
        text: 'Сразиться с гоблинами',
        requiredSkill: { type: 'Бой', level: 2 },
        nextScene: 'after_fight'
      },
      {
        id: 'trick',
        text: 'Обмануть гоблинов',
        requiredSkill: { type: 'Обман', level: 3 },
        nextScene: 'after_trick'
      },
      {
        id: 'run',
        text: 'Попытаться убежать',
        requiredSkill: { type: 'Ловкость', level: 2 },
        nextScene: 'after_run'
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