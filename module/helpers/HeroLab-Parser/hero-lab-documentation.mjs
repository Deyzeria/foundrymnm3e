/** document-> public
 * @typedef {Object} hlparsed
 * @prop {hldocument} document
 *
 * @typedef {Object} hldocument
 * @prop {hlpublic} public
 *
 * @typedef {Object} hlpublic
 * @prop {hlcharacter} character
 */

/**
 * @typedef {Object} hlcharacter
 * @prop {{attribute: {base: String}[]}} attributes
 * @prop {{defense: {base: String, impervious: String}[]}} defenses
 * @prop {{skill: {base: String, name: String}[]}} skills
 *
 * @prop {hlcomplications} complications
 * @prop {hllanguages} languages
 * @prop {hlpersonal} personal
 * @prop {{value: String}} powerlevel
 * @prop {{value: String}} powerpoints
 * @prop {String} role
 * @prop {String} relationship
 * @prop {String} name
 *
 * @prop {{advantage: hladvantage|hladvantage[]}} advantages
 * @prop {{item: hlgear|hlgear[]}} gear
 * @prop {{power: hlpower|hlpower[]}} powers
 *  *
 * @prop {hlminions} minions
 */

/**
 * @typedef {Object} hlcomplications
 * @prop {}
 */

/** Language
 * @typedef {Object} hllanguages
 * @prop {hlsinglanguage | hlsinglanguage[]} language
 *
 * @typedef {Object} hlsinglanguage
 * @prop {String} name
 */

/** Personal
 * @typedef {Object} hlpersonal
 * @prop {String} age
 * @prop {{text: String, value: String}} charheight
 * @prop {{text: String, value: String}} charweight
 * @prop {String} eyes
 * @prop {String} gender
 * @prop {String} hair
 */

//-----------------------------

/** Advantages
 * @typedef {Object} hladvantage
 * @prop {String} name
 * @prop {{value: String}} cost 
 */

/** Gear (Exclude Dropped to ground, grab, throw, unarmed)
 * @typedef {Object} hlgear
 * @prop {String} name
 * @prop {String} quantity
 * @prop {{value: String}} cost 
 */

/**
 * @typedef {Object} hlpower
 * @prop {{value: String}} cost 
 * @prop {String} name
 * @prop {String} ranks
 * @prop {String} summary "Easily Removable"|"Removable" + " (indestructible)" otherwise ignore
 * @prop {String} description "Easily Removable"|"Removable" + " (indestructible)" otherwise ignore
 * 
 * @prop {{descriptor: {name: String}|{name: String}[]}} descriptors
 * 
 * @prop {{power: hlpower|Array.hlpower}} alternatepowers This is for alt powers at the bottom
 * @prop {{chainedadvantage: {name: String}|{name: String}[]}} chainedadvantages
 * @prop {{power: hlpower|Array.hlpower}} otherpowers Here go the powers within an array
 * 
 * @prop {{element: {name: String,info: String}|{name: String,info: String}[]}} elements use info in this to get details, like active choices
 * 
 * @prop {{extra: {name: String}|{name: String}[]}} extras
 * @prop {{flaw: {name: String}|{name: String}[]}} flaws
 */

