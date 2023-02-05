/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class FoundryMnM3eActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    /* documents or derived data.
    const updates = {};
    this._prepareBaseAbilities(updates);
    this._prepareBaseSkills(updates);
    switch (this.type) {
      case "hero":
        return this._prepareCharacterData(updates);
      case "vehicle":
        return null;
      case "base":
        return null;
    }*/
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.boilerplate || {};


    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    //this._prepareNpcData(actorData);
  }

  _prepareBaseSkills (actorData){
    if (actorData.type !== "hero") return;

    const systemData = actorData.system;
    const skills = {};

    systemData.skills = skills;
  }

  _prepareBaseAbilities (actorData){
    if (actorData.type !== "hero") return;

    const systemData = actorData.system;

    const abilities = {};
    for (const key of Object.keys(CONFIG.MNM3E.abilities)){
      abilities[key] = systemData.abilities[key];
    }
    systemData.abilities = abilities;

    const defenses = {};
    for (const key of Object.keys(CONFIG.MNM3E.defenses)){
      defenses[key] = systemData.defenses[key];
    }
    systemData.defenses = defenses;

    const skills = {};
    for (const key of Object.keys(CONFIG.MNM3E.skills)){
      skills[key] = systemData.skills[key];
    }
    systemData.skills = skills;
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== "hero") return;

    const systemData = actorData.system;
    systemData.generic.pp = Math.max(systemData.generic.pl * 15, 15) + systemData.generic.extrapp;

    for (let [key, ability] of Object.entries(systemData.abilities)) {
      ability.total = ability.purchased + ability.misc + ability.auto;
    }

    for (let [key, defense] of Object.entries(systemData.defenses)) {
      defense.default = systemData.abilities[defense.ability].total;
      defense.total = defense.purchased + defense.misc + defense.auto + defense.default;
      defense.ac = 10 + parseFloat(defense.total);
    }

    for (let [key, skill] of Object.entries(systemData.skills)) {
      skill.default = systemData.abilities[skill.ability].total;
      skill.total = skill.default + skill.purchased + skill.misc + skill.auto;
      var sadg = "unt" + game.i18n.localize(CONFIG.MNM3E.skills[key]) ?? key;
      console.log(sadg);
      // document.getElementById(sadg).checked = skill.untrained;
    }

  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareVehicleData(actorData) {

  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
   _getCharacterRollData(data) {
    if (this.type !== 'hero') return;
    }
}