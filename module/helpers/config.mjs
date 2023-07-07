import { preLocalize } from "./utils.mjs";

export const MNM3E = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */
 MNM3E.abilities = {
  str: "MNM3E.AbilityStr",
  sta: "MNM3E.AbilitySta",
  agl: "MNM3E.AbilityAgl",
  dex: "MNM3E.AbilityDex",
  fgt: "MNM3E.AbilityFgt",
  int: "MNM3E.AbilityInt",
  awe: "MNM3E.AbilityAwe",
  pre: "MNM3E.AbilityPre"
};
preLocalize("abilities");

MNM3E.abilityAbbreviations = {
  str: "MNM3E.AbilityStrAbbr",
  sta: "MNM3E.AbilityStaAbbr",
  agl: "MNM3E.AbilityAglAbbr",
  dex: "MNM3E.AbilityDexAbbr",
  fgt: "MNM3E.AbilityFgtAbbr",
  int: "MNM3E.AbilityIntAbbr",
  awe: "MNM3E.AbilityAweAbbr",
  pre: "MNM3E.AbilityPreAbbr"
};
preLocalize("abilityAbbreviations");

MNM3E.skills = {
	acr: "MNM3E.SkillAcr",
	ath: "MNM3E.SkillAth",
	clc1: "MNM3E.SkillClc",
	clc2: "MNM3E.SkillClc",
	dec: "MNM3E.SkillDec",
	exp1: "MNM3E.SkillExp",
	exp2: "MNM3E.SkillExp",
	exp3: "MNM3E.SkillExp",
	exp4: "MNM3E.SkillExp",
	exp5: "MNM3E.SkillExp",
	ins: "MNM3E.SkillIns",
	inm: "MNM3E.SkillInm",
	inv: "MNM3E.SkillInv",
	prc: "MNM3E.SkillPrc",
	prs: "MNM3E.SkillPrs",
	rng1: "MNM3E.SkillRng",
	rng2: "MNM3E.SkillRng",
	soh: "MNM3E.SkillSoh", 
	ste: "MNM3E.SkillSte", 
	tec: "MNM3E.SkillTec", 
	tre: "MNM3E.SkillTre", 
	veh: "MNM3E.SkillVeh"
};
preLocalize("skills");

 MNM3E.defenses = {
	dodge: "MNM3E.Dodge",
	parry: "MNM3E.Parry",
	toughness: "MNM3E.Toughness",
	fortitude: "MNM3E.Fortitude",
	will: "MNM3E.Will"
 };
 preLocalize("defenses");

 MNM3E.movementTypes = {
	walk: "MNM3E.Walk",
	burrow: "MNM3E.Burrowing",
	flight: "MNM3E.Flight",
	leaping: "MNM3E.Leaping",
	swimming: "MNM3E.Swimming",
	teleport: "MNM3E.Teleport"
 };
 preLocalize("movementTypes");

  MNM3E.powerTypeEnum = {
	attack: "MNM3E.PowerTypeAttack",
	control: "MNM3E.PowerTypeControl",
	defense: "MNM3E.PowerTypeDefense",
	general: "MNM3E.PowerTypeGeneral",
	movement: "MNM3E.PowerTypeMovement",
	sensory: "MNM3E.PowerTypeSensory"
   };
   preLocalize("powerTypeEnum");

  MNM3E.powerActivationEnum = {
	standard: "MNM3E.ActionStandard",
	move: "MNM3E.ActionMove",
	reaction: "MNM3E.ActionReaction",
	free: "MNM3E.ActionFree",
	none: "MNM3E.ActionNone"
  };
  preLocalize("powerActivationEnum");

   MNM3E.powerRangeEnum = {
	personal: "MNM3E.RangePersonal",
	close: "MNM3E.RangeClose",
	ranged: "MNM3E.RangeRanged",
	perception: "MNM3E.RangePerception",
	rank: "MNM3E.RangeRank"
   };
   preLocalize("powerRangeEnum");

   MNM3E.powerDurationEnum = {
	instant: "MNM3E.DurationInstant",
	concentration: "MNM3E.DurationConcentration",
	sustained: "MNM3E.DurationSustained",
	continuous: "MNM3E.DurationContinuous",
	permanent: "MNM3E.DurationPermanent"
   };
   preLocalize("powerDurationEnum");

   MNM3E.arrayTypes = {
	normal: "MNM3E.ArrayNormal",
	alternative: "MNM3E.ArrayAlternative",
	dynamic: "MNM3E.ArrayDynamic"
   };
   preLocalize("arrayTypes");
   
   MNM3E.defaultPowerEffects = {
	affliction: "MNM3E.pAffliction",
	burrowing: "MNM3E.pBurrowing",
	communication: "MNM3E.pCommunication",
	comprehend: "MNM3E.pComprehend",
	concealment: "MNM3E.pConcealment",
	create: "MNM3E.pCreate",
	deflect: "MNM3E.pDeflect",
	elongation: "MNM3E.pElongation",
	enhanced: "MNM3E.pEnhancedTrait",
	environment: "MNM3E.pEnvironment",
	limbs: "MNM3E.pExtraLimbs",
	feature: "MNM3E.pFeature",
	flight: "MNM3E.pFlight",
	growth: "MNM3E.pGrowth",
	healing: "MNM3E.pHealing",
	illusion: "MNM3E.pIllusion",
	immortality: "MNM3E.pImmortality",
	immunity: "MNM3E.pImmunity",
	insubstantial: "MNM3E.pInsubstantial",
	leaping: "MNM3E.pLeaping",
	luckcontrol: "MNM3E.pLuckControl",
	mindreading: "MNM3E.pMindReading",
	morph: "MNM3E.pMorph",
	moveobject: "MNM3E.pMoveObject",
	movement: "MNM3E.pMovement",
	nullify: "MNM3E.pNullify",
	protection: "MNM3E.pProtection",
	quickness: "MNM3E.pQuickness",
	regeneration: "MNM3E.pRegeneration",
	remotesense: "MNM3E.pRemoteSensing",
	senses: "MNM3E.pSenses",
	shrinking: "MNM3E.pShrinking",
	speed: "MNM3E.pSpeed",
	summon: "MNM3E.pSummon",
	swimming: "MNM3E.pSwimming",
	teleport: "MNM3E.pTeleport",
	transform: "MNM3E.pTransform",
	variable: "MNM3E.pVariable",
	weaken: "MNM3E.pWeaken",
	impdodge: "MNM3E.pImperviousDodge",
	impparry: "MNM3E.pImperviousParry",
	imptoughness: "MNM3E.pImperviousToughness",
	impfortitude: "MNM3E.pImperviousFortitude",
	impwill: "MNM3E.pImperviousWill",
   };
   preLocalize("defaultPowerEffects");

   MNM3E.ExtrasGeneral = {
	accurate: "MNM3E.exAccurate",
	affcorporeasl: "MNM3E.exAffectsCorporeal",
	affinsubstantial: "MNM3E.exAffectsInsubstantial",
	affobjects: "MNM3E.exAffectsObjects",
	affothers: "MNM3E.exAffectsOthers",
	altresist: "MNM3E.exAlternativeResistance",
	area: "MNM3E.exArea",
	attack: "MNM3E.exAttack",
	contagious: "MNM3E.exContagious",
	dimensional: "MNM3E.exDimensional",
	extendedrange: "MNM3E.exExtendedRange",
	feature: "MNM3E.exFeature",
	homing: "MNM3E.exHoming",
	incrduration: "MNM3E.exIncreasedDuration",
	incrmass: "MNM3E.exIncreasedMass",
	incrrange: "MNM3E.exIncreasedRange",
	incurable: "MNM3E.exIncurable",
	indirect: "MNM3E.exIndirect",
	innate: "MNM3E.exInnate",
	insidious: "MNM3E.exInsidious",
	linked: "MNM3E.exLinked",
	multiattack: "MNM3E.exMultiattack",
	penetrating: "MNM3E.exPenetrating",
	precise: "MNM3E.exPrecise",
	reach: "MNM3E.exReach",
	reaction: "MNM3E.exReaction",
	reversible: "MNM3E.exReversible",
	ricochet: "MNM3E.exRicochet",
	secondeffect: "MNM3E.exSecondaryEffect",
	selective: "MNM3E.exSelective",
	sleep: "MNM3E.exSleep",
	split: "MNM3E.exSplit",
	subtle: "MNM3E.exSubtle",
	sustained: "MNM3E.exSustained",
	triggered: "MNM3E.exTriggered",
	vardescriptor: "MNM3E.exVariableDescriptor"
   };
   preLocalize("ExtrasGeneral");

   MNM3E.ExtrasAffliction = {
	cumulative: "MNM3E.exPCumulative"
   };

   MNM3E.AdvantageEnum = {
	accurateatt: "MNM3E.advAccurateAttack",
	allaoutatt: "MNM3E.advAllOutAttack",
	chokehold: "MNM3E.advChokehold",
	closeatt: "MNM3E.advCloseAttack",
	defenseatt: "MNM3E.advDefensiveAttack",
	defenseroll: "MNM3E.advDefensiveRoll",
	evasion: "MNM3E.advEvasion",
	fastgrab: "MNM3E.advFastGrab",
	favenvironment: "MNM3E.advFavoredEnvironment",
	grabfinesse: "MNM3E.advGrabbingFinesse",
	impaim: "MNM3E.advImprovedAim",
	impcrit: "MNM3E.advImprovedCritical",
	impdefense: "MNM3E.advImprovedDefense",
	impdisarm: "MNM3E.advImprovedDisarm",
	impgrab: "MNM3E.advImprovedGrab",
	imphold: "MNM3E.advImprovedHold",
	impinit: "MNM3E.advImprovedInitiative",
	impsmash: "MNM3E.advImprovedSmash",
	imptrip: "MNM3E.advImprovedTrip",
	impweapon: "MNM3E.advImprovisedWeapon",
	movebyact: "MNM3E.advMoveByAction",
	poweratt: "MNM3E.advPowerAttack",
	preciseatt: "MNM3E.advPreciseAttack",
	pronefight: "MNM3E.advProneFighting",
	quickdraw: "MNM3E.advQuickDraw",
	rangedatt: "MNM3E.advRangedAttack",
	redirect: "MNM3E.advRedirect",
	setup: "MNM3E.advSetUp",
	takedown: "MNM3E.advTakedown",
	throwmast: "MNM3E.advThrowingMastery",
	uncandodge: "MNM3E.advUncannyDodge",
	weaponbind: "MNM3E.advWeaponBind",
	weaponbreak: "MNM3E.advWeaponBreak",
	beginluck: "MNM3E.advBeginnersLuck",
	inspire: "MNM3E.advInspire",
	leadership: "MNM3E.advLeadership",
	luck: "MNM3E.advLuck",
	seizeinit: "MNM3E.advSeizeInitiative",
	ulteffort: "MNM3E.advUltimateEffort",
	assessment: "MNM3E.advAssessment",
	benefit: "MNM3E.advBenefit",
	diehard: "MNM3E.advDiehard",
	eideticmemory: "MNM3E.advEideticMemory",
	equipment: "MNM3E.advEquipment",
	extraordeffort: "MNM3E.advExtraordinaryEffort",
	fearless: "MNM3E.advFearless",
	greatendur: "MNM3E.advGreatEndurance",
	instantup: "MNM3E.advInstantUp",
	interpose: "MNM3E.advInterpose",
	minion: "MNM3E.advMinion",
	secondchance: "MNM3E.advSecondChance",
	sidekick: "MNM3E.advSidekick",
	teamwork: "MNM3E.advTeamwork",
	trance: "MNM3E.advTrance",
	agilefeint: "MNM3E.advAgileFeint",
	animalempathy: "MNM3E.advAnimalEmpathy",
	artificer: "MNM3E.advArtificer",
	attractive: "MNM3E.advAttractive",
	connected: "MNM3E.advConnected",
	contacts: "MNM3E.advContacts",
	daze: "MNM3E.advDaze",
	fascinate: "MNM3E.advFascinate",
	favoredfoe: "MNM3E.advFavoredFoe",
	hideinplainsight: "MNM3E.advHideInPlainSight",
	improvisedtools: "MNM3E.advImprovisedTools",
	inventor: "MNM3E.advInventor",
	jackofalltrades: "MNM3E.advJackOfAllTrades",
	languages: "MNM3E.advLanguages",
	ritualist: "MNM3E.advRitualist",
	skillmastery: "MNM3E.advSkillMastery",
	startle: "MNM3E.advStartle",
	taunt: "MNM3E.advTaunt",
	tracking: "MNM3E.advTracking",
	wellinformed: "MNM3E.advWellInformed"
   };
   preLocalize("AdvantageEnum");

