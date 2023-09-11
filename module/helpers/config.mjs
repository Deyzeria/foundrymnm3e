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

   MNM3E.attackType = {
	...MNM3E.powerRangeEnum,
	areaburst: "MNM3E.AreaBurst",
	areacloud: "MNM3E.AreaCloud",
	areacone: "MNM3E.AreaCone",
	areacylinder: "MNM3E.AreaCylinder",
	arealine: "MNM3E.AreaLine",
	areaperception: "MNM3E.AreaPerception",
	areashapeable: "MNM3E.AreaShapeable"
   }
   preLocalize("attackType");

   MNM3E.movementUnits = {
	ft: "MNM3E.DistFt",
	mi: "MNM3E.DistMi",
	m: "MNM3E.DistM",
	km: "MNM3E.DistKm"
  };
  preLocalize("movementUnits");

  MNM3E.movementUnitsAbbr = {
	ftAb: "MNM3E.DistFtAbbr",
	miAb: "MNM3E.DistMiAbbr",
	mAb: "MNM3E.DistMAbbr",
	kmAb: "MNM3E.DistKmAbbr"
  }
  preLocalize("movementUnitsAbbr");

   
   MNM3E.distanceUnits = {
	...MNM3E.powerRangeEnum,
	...MNM3E.movementUnitsAbbr,
	...MNM3E.movementUnits
   }
   preLocalize("distanceUnits");

   MNM3E.powerDurationEnum = {
	instant: "MNM3E.DurationInstant",
	concentration: "MNM3E.DurationConcentration",
	sustained: "MNM3E.DurationSustained",
	continuous: "MNM3E.DurationContinuous",
	permanent: "MNM3E.DurationPermanent"
   };
   preLocalize("powerDurationEnum");

   // Add Alternate form somewhere here
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
	damage: "MNM3E.pDamage",
	deflect: "MNM3E.pDeflect",
	elongation: "MNM3E.pElongation",
	enhancedability: "MNM3E.pEnhancedAbility",
	enhancedextra: "MNM3E.pEnhancedExtra",
	enhancedtrait: "MNM3E.pEnhancedTrait",
	environment: "MNM3E.pEnvironment",
	limbs: "MNM3E.pExtraLimbs",
	feature: "MNM3E.pFeature",
	flight: "MNM3E.pFlight",
	growth: "MNM3E.pGrowth",
	healing: "MNM3E.pHealing",
	illusion: "MNM3E.pIllusion",
	immortality: "MNM3E.pImmortality",
	immunity: "MNM3E.pImmunity",
	impervious: "MNM3E.pImpreviousDefense",
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
   };
   preLocalize("defaultPowerEffects");

   MNM3E.ExtrasFlawsTypes = {
	extra: "MNM3E.Extra",
	extraflat: "MNM3E.ExtraF",
	flaws: "MNM3E.Flaw",
	flawsflat: "MNM3E.FlawF",
   }
   preLocalize("ExtrasFlawsTypes");

   MNM3E.ExtrasGeneral = {
	accurate: "MNM3E.exAccurate",
	affcorporeals: "MNM3E.exAffectsCorporeal",
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

   MNM3E.ExtrasUnique = {
	cumulative: "MNM3E.exPCumulative",
	extraCondition: "MNM3E.exPExtraCondition",
	rapid: "MNM3E.exPRapid",
	movable: "MNM3E.exPMovable",
	stationary: "MNM3E.exPStationary",
	tether: "MNM3E.exPTether",
	reflect: "MNM3E.exPReflect",
	redirect: "MNM3E.exPRedirect",
	projection: "MNM3E.exPProjection",
	aquatic: "MNM3E.exPAquatic",
	action: "MNM3E.exPAction",
	energizing: "MNM3E.exPEnergizing",
	persistent: "MNM3E.exPPersistent",
	restorative: "MNM3E.exPRestorative",
	resurrection: "MNM3E.exPResurrection",
	stabilize: "MNM3E.exPStabilize",
	independent: "MNM3E.exPIndependent",
	progressive: "MNM3E.exPProgressive",
	effortless: "MNM3E.exPEffortless",
	sensoryLink: "MNM3E.exPSensoryLink",
	metamorph: "MNM3E.exPMetamorph",
	damaging: "MNM3E.exPDamaging",
	broad: "MNM3E.exPBroad",
	randomize: "MNM3E.exPRandomize",
	noconduit: "MNM3E.exPNoconduit",
	simultaneous: "MNM3E.exPSimultaneous",
	atomic: "MNM3E.exPAtomic",
	normalstrength: "MNM3E.exPNormalStrength",
	active: "MNM3E.exPActive",
	controlled: "MNM3E.exPControlled",
	heroic: "MNM3E.exPHeroic",
	horde: "MNM3E.exPHorde",
	multipleminions: "MNM3E.exPMultipleMinions",
	mentalLink: "MNM3E.exPMentalLink",
	sacrifice: "MNM3E.exPSacrifice",
	variabletype: "MNM3E.exPVariableType",
	changedirection: "MNM3E.exPChangeDirection",
	changevelocity: "MNM3E.exPChangeVelocity",
	easy: "MNM3E.exPEasy",
	extended: "MNM3E.exPExtended",
	increasedmass: "MNM3E.exPIncreasedMass",
	portal: "MNM3E.exPPortal",
	turnabout: "MNM3E.exPTurnabout"
   };
   preLocalize("ExtrasUnique");

   MNM3E.ExtrasAll = {
	...MNM3E.ExtrasGeneral,
	...MNM3E.ExtrasUnique
   }
   preLocalize("ExtrasAll");

   MNM3E.FlawsGeneral = {
	activation: "MNM3E.flActivation",
	checkrequired: "MNM3E.flCheckRequired",
	concentration: "MNM3E.flConcentration",
	diminishedrange: "MNM3E.flDiminishedRange",
	distracting: "MNM3E.flDistracting",
	fades: "MNM3E.flFades",
	feedback: "MNM3E.flFeedback",
	grabbased: "MNM3E.flGrabBased",
	increasedaction: "MNM3E.flIncreasedAction",
	limited: "MNM3E.flLimited",
	noticeable: "MNM3E.flNoticeable",
	permanent: "MNM3E.flPermanent",
	quirk: "MNM3E.flQuirk",
	reducedrange: "MNM3E.flReducedRange",
	removable: "MNM3E.flRemovable",
	easilyremovable: "MNM3E.flEasilyRemovable",
	resistible: "MNM3E.flResistible",
	sensedependent: "MNM3E.flSenseDependent",
	sideeffect: "MNM3E.flSideEffect",
	tiring: "MNM3E.flTiring",
	uncontrolled: "MNM3E.flUncontrolled",
	unreliable: "MNM3E.flUnreliable"
   }
   preLocalize("FlawsGeneral");

   MNM3E.FlawsUnique = {
	instantrecovery: "MNM3E.flPInstantRecovery",
	blending: "MNM3E.flPBlending",
	partial: "MNM3E.flPPartial",
	passive: "MNM3E.flPPassive",
	proportional: "MNM3E.flPProportional",
	reducedtrait: "MNM3E.flPReducedTrait",
	gliding: "MNM3E.flPGliding",
	levitation: "MNM3E.flPLevitation",
	platform: "MNM3E.flPPlatform",
	wings: "MNM3E.flPWings",
	empathic: "MNM3E.flPEmpathic",
	temporary: "MNM3E.flPTemporary",
	limitedtoonesubject: "MNM3E.flPLimitedToOneSubject",
	limitedtohalfeffect: "MNM3E.flPLimitedToHalfEffect",
	absentstrength: "MNM3E.flPAbsentStrength",
	fullpower: "MNM3E.flPFullPower",
	limiteddirection: "MNM3E.flPLimitedDirection",
	limitedmaterial: "MNM3E.flPLimitedMaterial",
	limitedtoonetype: "MNM3E.flPLimitedToOneType",
	limitedtoonetask: "MNM3E.flPLimitedToOneTask",
	source: "MNM3E.flPSource",
	medium: "MNM3E.flPMedium",
	attitude: "MNM3E.flPAttitude",
	limitedtoextended: "MNM3E.flPLimitedToExtended",
	slow: "MNM3E.flPSlow"
   }
   preLocalize("FlawsUnique");

   MNM3E.FlawsAll = {
	...MNM3E.FlawsGeneral,
	...MNM3E.FlawsUnique
   }
   preLocalize("FlawsAll");

   MNM3E.AdvantageEnum = {
	custom: "MNM3E.advCustom",
	accurateatt: "MNM3E.advAccurateAttack",
	agilefeint: "MNM3E.advAgileFeint",
	alloutatt: "MNM3E.advAllOutAttack",
	animalempathy: "MNM3E.advAnimalEmpathy",
	artificer: "MNM3E.advArtificer",
	assessment: "MNM3E.advAssessment",
	attractive: "MNM3E.advAttractive",
	beginluck: "MNM3E.advBeginnersLuck",
	benefit: "MNM3E.advBenefit",
	chokehold: "MNM3E.advChokehold",
	closeatt: "MNM3E.advCloseAttack",
	connected: "MNM3E.advConnected",
	contacts: "MNM3E.advContacts",
	daze: "MNM3E.advDaze",
	defenseatt: "MNM3E.advDefensiveAttack",
	defenseroll: "MNM3E.advDefensiveRoll",
	diehard: "MNM3E.advDiehard",
	eideticmemory: "MNM3E.advEideticMemory",
	equipment: "MNM3E.advEquipment",
	evasion: "MNM3E.advEvasion",
	extraordeffort: "MNM3E.advExtraordinaryEffort",
	fascinate: "MNM3E.advFascinate",
	fastgrab: "MNM3E.advFastGrab",
	favenvironment: "MNM3E.advFavoredEnvironment",
	favoredfoe: "MNM3E.advFavoredFoe",
	fearless: "MNM3E.advFearless",
	grabfinesse: "MNM3E.advGrabbingFinesse",
	greatendur: "MNM3E.advGreatEndurance",
	hideinplainsight: "MNM3E.advHideInPlainSight",
	impaim: "MNM3E.advImprovedAim",
	impcrit: "MNM3E.advImprovedCritical",
	impdefense: "MNM3E.advImprovedDefense",
	impdisarm: "MNM3E.advImprovedDisarm",
	impgrab: "MNM3E.advImprovedGrab",
	imphold: "MNM3E.advImprovedHold",
	impinit: "MNM3E.advImprovedInitiative",
	improvisedtools: "MNM3E.advImprovisedTools",
	impsmash: "MNM3E.advImprovedSmash",
	imptrip: "MNM3E.advImprovedTrip",
	impweapon: "MNM3E.advImprovisedWeapon",
	inspire: "MNM3E.advInspire",
	instantup: "MNM3E.advInstantUp",
	interpose: "MNM3E.advInterpose",
	inventor: "MNM3E.advInventor",
	jackofalltrades: "MNM3E.advJackOfAllTrades",
	languages: "MNM3E.advLanguages",
	leadership: "MNM3E.advLeadership",
	luck: "MNM3E.advLuck",
	minion: "MNM3E.advMinion",
	movebyact: "MNM3E.advMoveByAction",
	poweratt: "MNM3E.advPowerAttack",
	preciseatt: "MNM3E.advPreciseAttack",
	pronefight: "MNM3E.advProneFighting",
	quickdraw: "MNM3E.advQuickDraw",
	rangedatt: "MNM3E.advRangedAttack",
	redirect: "MNM3E.advRedirect",
	ritualist: "MNM3E.advRitualist",
	secondchance: "MNM3E.advSecondChance",
	seizeinit: "MNM3E.advSeizeInitiative",
	setup: "MNM3E.advSetUp",
	sidekick: "MNM3E.advSidekick",
	skillmastery: "MNM3E.advSkillMastery",
	startle: "MNM3E.advStartle",
	takedown: "MNM3E.advTakedown",
	taunt: "MNM3E.advTaunt",
	teamwork: "MNM3E.advTeamwork",
	throwmast: "MNM3E.advThrowingMastery",
	tracking: "MNM3E.advTracking",
	trance: "MNM3E.advTrance",
	ulteffort: "MNM3E.advUltimateEffort",
	uncandodge: "MNM3E.advUncannyDodge",
	weaponbind: "MNM3E.advWeaponBind",
	weaponbreak: "MNM3E.advWeaponBreak",
	wellinformed: "MNM3E.advWellInformed"
   };
   preLocalize("AdvantageEnum");

   MNM3E.advantageTypeEnum = {
	combat: "MNM3E.advTypeCombat",
	fortune: "MNM3E.advTypeFortune",
	general: "MNM3E.advTypeGeneral",
	skill: "MNM3E.advTypeSkill"
   };
   preLocalize("advantageTypeEnum");

   MNM3E.conditions = {
	compelled: "MNM3E.condCompelled",
	controlled: "MNM3E.condControlled",
	dazed: "MNM3E.condDazed",
	debilitated: "MNM3E.condDebilitated",
	defenseless: "MNM3E.condDefenseless",
	disabled: "MNM3E.condDisabled",
	fatigued: "MNM3E.condFatigued",
	hindered: "MNM3E.condHindered",
	immobile: "MNM3E.condImmobile",
	impaired: "MNM3E.condImpaired",
	normal: "MNM3E.condNormal",
	stunned: "MNM3E.condStunned",
	transformed: "MNM3E.condTransformed",
	unaware: "MNM3E.condUnaware",
	vulnerable: "MNM3E.condVulnerable",
	weakened: "MNM3E.condWeakened",
	asleep: "MNM3E.condAsleep",
	blind: "MNM3E.condBlind",
	bound: "MNM3E.condBound",
	deaf: "MNM3E.condDeaf",
	dying: "MNM3E.condDying",
	entranced: "MNM3E.condEntranced",
	exhausted: "MNM3E.condExhausted",
	incapacitated: "MNM3E.condIncapacitated",
	paralyzed: "MNM3E.condParalyzed",
	prone: "MNM3E.condProne",
	restrained: "MNM3E.condRestrained",
	staggered: "MNM3E.condStaggered",
	surprised: "MNM3E.condSurprised"	
   }
   preLocalize("conditions");

   MNM3E.SenseTypes = {
	visual: "MNM3E.senseVisual",
	auditory: "MNM3E.senseAuditory",
	olfactory: "MNM3E.senseOlfactory",
	tactile: "MNM3E.senseTactile",
	radio: "MNM3E.senseRadio",
	mental: "MNM3E.senseMental",
	other: "MNM3E.senseOther"
   }
   preLocalize("SenseTypes");
