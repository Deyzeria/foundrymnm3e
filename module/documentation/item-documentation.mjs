/**
 * @typedef {Object} itemData
 * @prop {String} img
 * @prop {String} name
 * @prop {String} type
 * @prop {String} type
 * @prop {Object} labels
 * @prop {systemItem} system
 */

/** 
 * @typedef {Object} systemItem
 * @prop {Boolean} active
 * @prop {Boolean} locked
 * 
 * @prop {String} combineddescription
 * @prop {String} description
 * @prop {String} duration
 * @prop {String} power_effect
 * @prop {String} type
 * 
 * @prop {Array} descriptor
 * 
 * @prop {ActionType} action
 * @prop {AreaType} area
 * @prop {SaveType} save
 * @prop {SaveType} damage
 * @prop {AttackType} attack
 * @prop {ExtrasFlawsType} extrasflaws
 * 
 * @prop {PowerCostType} power_cost
 * 
 * @prop {VariableItemTypes} unique
 * @prop {VariableItemTypes} values
 */

/** Action Type
 * @typedef {Object} ActionType
 * @prop {String} type
 * @prop {Number} length
 */

/** Area Type
 * @typedef {Object} AreaType
 * @prop {Number} range Rank of first range
 * @prop {Number} range2 Rank of Second range(For when areas have second increase-able range)
 * @prop {String} type
 * @prop {SaveType} save
 */

/** Save Type
 * @typedef {Object} SaveType
 * @prop {String} resistance
 * @prop {Number} effect Rank of an effect
 */

/** Attack Type
 * @typedef {Object} AttackType
 * @prop {String} skill
 * @prop {String} type
 * @prop {Number} auto
 * @prop {Number} total
 */

/** Extras Flaws Type
 * @typedef {Object} ExtrasFlawsType
 * @prop {Array} parts
 */

/** Power Cost Type
 * @typedef {Object} PowerCostType
 * @prop {Number} active_cost Cost for the currently activated powers (For dynamic effects)
 * @prop {Number} active_rank Currently active ranks (For dynamic effects, weakened effects and so on)
 * @prop {Number} base_cost Base cost of the power itself
 * @prop {Number} extras Combined of all extras applied to the power
 * @prop {Number} flaws Combined of all flaws applied to the power
 * @prop {Number} flat Combined of all flats applied to the power
 * @prop {Number} final_cost Final cost of the power
 * @prop {Number} rank Total purchased ranks
 * @prop {Number} max_ranks Max purchaseable ranks for the power
 * @prop {Boolean} manual_purchase Can power have manually purchased ranks 
 */

/** Ranges Types
 * @typedef {Object} RangesTypes
 * @prop {Number} close
 * @prop {Number} medium
 * @prop {Number} far
 * @prop {String} range
 * @prop {number} rangeincrease
 */

/**
 * @typedef {Object} VariableItemTypes
 * @prop {String | Number | Object} value_one
 * @prop {String | Number | Object} value_two
 * @prop {String | Number | Object} value_three
 * @prop {String | Number | Object} value_four
 * @prop {String | Number | Object} value_five
 */