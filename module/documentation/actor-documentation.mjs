/**
 * @typedef {Object} Token
 * @prop {actorData} actor
 */

/**
 * @typedef {Object} actorData
 * @prop {system} system
 * @prop {Object} flags
 * @prop {Object} labels
 * @prop {Object} effects
 */

/** System
 * @typedef {Object} system
 * @prop {abilitylist} abilities
 * @prop {defensesList} defenses
 * @prop {skillsList} skills
 * @prop {genericList} generic
 * @prop {speedList} speed
 * @prop {details} details
 * @prop {Array} arrays
 */

/** Ability List
 * @typedef {Object} abilitylist
 * @property {ability} str
 * @property {ability} sta
 * @property {ability} agl
 * @property {ability} dex
 * @property {ability} fgt
 * @property {ability} int
 * @property {ability} awe
 * @property {ability} pre
 */

/** Ability
 * @typedef {Object} ability
 * @property {number} purchased
 * @property {number} misc
 * @property {number} auto
 * @property {number} total
 */

/** Generic
 * @typedef {Object} genericList
 * @prop {number} pl
 * @prop {number} pp
 * @prop {number} extrapp
 * @prop {number} ep
 * @prop {number} hero_point
 * @prop {number} pp_ability
 * @prop {number} pp_defenses
 * @prop {number} pp_skills
 * @prop {number} pp_advantages
 * @prop {number} pp_powers
 * @prop {number} pp_spent
 * @prop {number} initiative
 * @prop {number} size
 * @prop {number} wounds
 */

/** Defense List
 * @typedef {Object} defensesList
 * @prop {defense} dodge
 * @prop {defense} parry
 * @prop {defense} fortitude
 * @prop {defense} toughness
 * @prop {defense} will
 */

/** Defense
 * @typedef {Object} defense
 * @prop {number} purchased
 * @prop {number} default
 * @prop {number} misc
 * @prop {number} auto
 * @prop {number} total
 * @prop {number} ac
 * @prop {number} impervious
 * @prop {boolean} immune
 * @prop {string} ability
 */

/** Skills List
 * @typedef {Object} skillsList
 * @prop {skill} acr Acrobatics
 * @prop {skill} ath Athletics
 * @prop {skill} clc1 Close Combat 1
 * @prop {skill} clc2 Close Combat 2
 * @prop {skill} dec Deception
 * @prop {skill} exp1 Expertise 1
 * @prop {skill} exp2 Expertise 2
 * @prop {skill} exp3 Expertise 3
 * @prop {skill} exp4 Expertise 4
 * @prop {skill} exp5 Expertise 5
 * @prop {skill} ins Insight
 * @prop {skill} inm Intimidation
 * @prop {skill} inv Investigation
 * @prop {skill} prc Perception
 * @prop {skill} prs Persuasion
 * @prop {skill} rng1 Ranged Combat 1
 * @prop {skill} rng2 Ranged Combat 1
 * @prop {skill} soh Sleight of Hand
 * @prop {skill} ste Stealth
 * @prop {skill} tec Technology
 * @prop {skill} tre Treatment
 * @prop {skill} veh Vehicles
 */

/** Skill
 * @typedef {Object} skill
 * @prop {number} default
 * @prop {number} purchased
 * @prop {number} misc
 * @prop {number} auto
 * @prop {number} total
 * @prop {boolean} untrained
 * @prop {boolean} mastery
 * @prop {string} ability
 */

/** Speed List
 * @typedef {Object} speedList
 * @prop {speedType} walk
 * @prop {speedType} burrowing
 * @prop {speedType} flight
 * @prop {speedType} leaping
 * @prop {speedType} swimming
 * @prop {speedType} teleport
 * 
 * @prop {Array} extratypes
 */

/** Speed
 * @typedef {Object} speedType
 * @prop {number} rank
 * @prop {number} distance
 * @prop {boolean} active
 */

/** Details
 * @typedef {Object} details
 * @prop {boolean} active_identity
 * @prop {boolean} has_secret_identity
 * @prop {boolean} secret_as_public
 * @prop {string} group_affiliation
 * @prop {string} base_of_operation
 * @prop {Array} languages
 * @prop {Array} complications
 * @prop {Identity} civilian_identity
 * @prop {Identity} hero_identity
 */

/** Separate Identity Page
 * @typedef {Object} Identity
 * @prop {string} image
 * @prop {string} name
 * @prop {string} gender
 * @prop {string} height
 * @prop {string} eyes
 * @prop {string} hair
 * @prop {string} description
 * @prop {number} age
 * @prop {number} weight
 */