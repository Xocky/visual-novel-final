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
  after_trick: {
    id: 'after_trick',
    title: 'После обмана',
    description: 'Вам удалось обмануть гоблинов и пройти незамеченными.',
    choices: [
      {
        id: 'continue',
        text: 'Продолжить путь',
        requiredSkill: null,
        nextScene: 'river_crossing'
      }
    ]
  },
  after_run: {
    id: 'after_run',
    title: 'После побега',
    description: 'Вы успешно убежали от гоблинов, но потеряли время.',
    choices: [
      {
        id: 'continue',
        text: 'Продолжить путь',
        requiredSkill: null,
        nextScene: 'river_crossing'
      }
    ]
  },
  river_crossing: {
    id: 'river_crossing',
    title: 'Переправа через реку',
    description: 'Перед вами бурная река. Нужно найти способ переправиться.',
    choices: [
      {
        id: 'swim',
        text: 'Попытаться переплыть',
        requiredSkill: { type: 'Ловкость', level: 3 },
        nextScene: 'after_swim'
      },
      {
        id: 'build_raft',
        text: 'Построить плот',
        requiredSkill: { type: 'Ремесло', level: 2 },
        nextScene: 'after_raft'
      },
      {
        id: 'find_bridge',
        text: 'Найти мост',
        requiredSkill: { type: 'Восприятие', level: 2 },
        nextScene: 'after_bridge'
      }
    ]
  },
  after_swim: {
    id: 'after_swim',
    title: 'После переправы вплавь',
    description: 'Вы успешно переплыли реку, но промокли и устали.',
    choices: [
      {
        id: 'continue',
        text: 'Продолжить путь',
        requiredSkill: null,
        nextScene: null
      }
    ]
  },
  after_raft: {
    id: 'after_raft',
    title: 'После постройки плота',
    description: 'Вы построили плот и успешно переправились через реку.',
    choices: [
      {
        id: 'continue',
        text: 'Продолжить путь',
        requiredSkill: null,
        nextScene: null
      }
    ]
  },
  after_bridge: {
    id: 'after_bridge',
    title: 'После поиска моста',
    description: 'Вы нашли старый мост и безопасно переправились через реку.',
    choices: [
      {
        id: 'continue',
        text: 'Продолжить путь',
        requiredSkill: null,
        nextScene: null
      }
    ]
  },
  forest_path: {
    id: 'forest_path',
    title: 'Лесная тропа',
    description: 'Вы идете по узкой лесной тропе. Вокруг слышны звуки дикой природы.',
    choices: [
      {
        id: 'continue',
        text: 'Продолжить путь',
        requiredSkill: null,
        nextScene: 'river_crossing'
      }
    ]
  },
  cave_exploration: {
    id: 'cave_exploration',
    title: 'Исследование пещеры',
    description: 'Вы обнаружили темную пещеру. Внутри может быть что-то интересное.',
    choices: [
      {
        id: 'explore',
        text: 'Исследовать пещеру',
        requiredSkill: { type: 'Восприятие', level: 2 },
        nextScene: 'cave_treasure'
      },
      {
        id: 'skip',
        text: 'Пропустить пещеру',
        requiredSkill: null,
        nextScene: 'mountain_pass'
      }
    ]
  },
  cave_treasure: {
    id: 'cave_treasure',
    title: 'Сокровище пещеры',
    description: 'В пещере вы нашли древние сокровища!',
    choices: [
      {
        id: 'continue',
        text: 'Продолжить путь',
        requiredSkill: null,
        nextScene: 'mountain_pass'
      }
    ]
  },
  mountain_pass: {
    id: 'mountain_pass',
    title: 'Горный перевал',
    description: 'Вы поднимаетесь по крутому горному перевалу.',
    choices: [
      {
        id: 'continue',
        text: 'Продолжить путь',
        requiredSkill: null,
        nextScene: null
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