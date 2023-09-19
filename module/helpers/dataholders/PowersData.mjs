const PowerEffects =
{
  affliction: {
    cost: 1,
    type: 'attack',
    action: 'standard',
    range: 'close',
    duration: 'instant',
    savingthrow: 'fortitude',
    data:
    {
      rank1: ['dazed', 'fatigued', 'hindered', 'impaired', 'vulnerable', 'entranced'],
      rank2: ['compelled', 'defenseless', 'disabled', 'immobile', 'stunned', 'exhausted', 'prone'],
      rank3: ['controlled', 'transformed', 'unaware', 'asleep', 'incapacitated', 'paralyzed'],
      resistance: ['fortitude', 'will']
    }
  },
  burrowing: {
    cost: 1,
    type: 'movement',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  communication: {
    cost: 4,
    type: 'sensory',
    action: 'free',
    range: 'rank',
    duration: 'sustained',
    savingthrow: 'none',
    max_ranks: 5,
    data:
    {
      sensetype: ['visual', 'auditory', 'olfactory', 'tactile', 'radio', 'mental', 'other']
    }
  },
  comprehend: {
    cost: 2,
    type: 'sensory',
    action: 'none',
    range: 'personal',
    duration: 'permanent',
    savingthrow: 'none',
    data: true
  },
  concealment: {
    cost: 2,
    type: 'sensory',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    manual_purchase: false,
    data: true
  },
  create: {
    cost: 2,
    type: 'control',
    action: 'standard',
    range: 'ranged',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  damage: {
    cost: 1,
    type: 'attack',
    action: 'standard',
    range: 'close',
    duration: 'instant',
    savingthrow: 'none',
    damage: 'toughness',
    data: true
  },
  deflect: {
    cost: 1,
    type: 'defence',
    action: 'standard',
    range: 'ranged',
    duration: 'instant',
    savingthrow: 'none',
    data: false
  },
  elongation: {
    cost: 1,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  enhancedability: {
    cost: 2,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    manual_purchase: false,
    data: ['str', 'agl', 'dex', 'fgt', 'int', 'awe', 'pre']
  },
  enhancedextra: {
    cost: 1,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    manual_purchase: false,
    data: true
  },
  enhancedadvantage: {
    cost: 1,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    manual_purchase: false,
    data: true
  },
  enhancedtrait: {
    cost: 1,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    manual_purchase: false,
    data: true
  },
  environment: {
    cost: 0,
    type: 'control',
    action: 'standard',
    range: 'rank',
    duration: 'sustained',
    savingthrow: 'none',
    data: true
  },
  limbs: {
    cost: 1,
    type: 'general',
    action: 'none',
    range: 'personal',
    duration: 'permanent',
    savingthrow: 'none',
    data: false
  },
  feature: {
    cost: 1,
    type: 'general',
    action: 'none',
    range: 'personal',
    duration: 'permanent',
    savingthrow: 'none',
    data: true
  },
  flight: {
    cost: 2,
    type: 'movement',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  growth: {
    cost: 2,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  healing: {
    cost: 2,
    type: 'general',
    action: 'standard',
    range: 'close',
    duration: 'instant',
    savingthrow: 'none',
    data: false
  },
  illusion: {
    cost: 0,
    type: 'control',
    action: 'standard',
    range: 'perception',
    duration: 'sustained',
    savingthrow: 'none',
    manual_purchase: false,
    data: true
  },
  immortality: {
    cost: 2,
    type: 'defence',
    action: 'none',
    range: 'personal',
    duration: 'permanent',
    savingthrow: 'none',
    data: false
  },
  immunity: {
    cost: 1,
    type: 'defence',
    action: 'none',
    range: 'personal',
    duration: 'permanent',
    savingthrow: 'none',
    data: true
  },
  impervious: {
    cost: 1,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'continuous',
    savingthrow: 'none',
    data: true
  },
  insubstantial: {
    cost: 5,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    max_ranks: 4,
    data: true
  },
  leaping: {
    cost: 1,
    type: 'movement',
    action: 'free',
    range: 'personal',
    duration: 'instant',
    savingthrow: 'none',
    data: false
  },
  luckcontrol: {
    cost: 3,
    type: 'control',
    action: 'reaction',
    range: 'perception',
    duration: 'instant',
    savingthrow: 'none',
    data: true
  },
  mindreading: {
    cost: 2,
    type: 'sensory',
    action: 'standard',
    range: 'perception',
    duration: 'sustained',
    savingthrow: 'will',
    data: false
  },
  morph: {
    cost: 5,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  moveobject: {
    cost: 2,
    type: 'control',
    action: 'standard',
    range: 'ranged',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  movement: {
    cost: 2,
    type: 'movement',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: true
  },
  nullify: {
    cost: 1,
    type: 'attack',
    action: 'standard',
    range: 'ranged',
    duration: 'instant',
    savingthrow: 'will',
    data: true
  }, // Here it's Will/Rank
  protection: {
    cost: 1,
    type: 'defense',
    action: 'none',
    range: 'personal',
    duration: 'permanent',
    savingthrow: 'none',
    data: false
  },
  quickness: {
    cost: 1,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  regeneration: {
    cost: 1,
    type: 'defense',
    action: 'none',
    range: 'personal',
    duration: 'permanent',
    savingthrow: 'none',
    data: false
  },
  remotesense: {
    cost: 0,
    type: 'sensory',
    action: 'free',
    range: 'rank',
    duration: 'sustained',
    savingthrow: 'none',
    data: true
  },
  senses: {
    cost: 1,
    type: 'sensory',
    action: 'none',
    range: 'personal',
    duration: 'permanent',
    savingthrow: 'none',
    data: true
  },
  shrinking: {
    cost: 2,
    type: 'general',
    action: 'free',
    range: 'personal',
    duration: 'permanent',
    savingthrow: 'none',
    data: false
  },
  speed: {
    cost: 1,
    type: 'movement',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  summon: {
    cost: 1,
    type: 'control',
    action: 'standard',
    range: 'close',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  swimming: {
    cost: 1,
    type: 'movement',
    action: 'free',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  teleport: {
    cost: 2,
    type: 'movement',
    action: 'move',
    range: 'rank',
    duration: 'instant',
    savingthrow: 'none',
    data: false
  },
  transform: {
    cost: 0,
    type: 'control',
    action: 'standard',
    range: 'close',
    duration: 'sustained',
    savingthrow: 'none',
    data: true
  },
  variable: {
    cost: 7,
    type: 'general',
    action: 'standard',
    range: 'personal',
    duration: 'sustained',
    savingthrow: 'none',
    data: false
  },
  weaken: {
    cost: 1,
    type: 'attack',
    action: 'standard',
    range: 'close',
    duration: 'instant',
    savingthrow: 'fortitude',
    data: true
  }
};

export default function GetPowerData(request) {
  return PowerEffects[request];
}