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
    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags.foundrymnm3e || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    //this._prepareCharacterData(actorData);
    //this._prepareNpcData(actorData);
  }

  _prepareBaseSkills (actorData){
    if (actorData.type !== "hero") return;

    const systemData = actorData.system;
    const skills = {};
    for (const [key, skill] of Object.entries(CONFIG.MNM3E.skillsEnum)) {
      skills[key] = systemData.skillsEnum[key];
    }
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
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== "hero") return;

    const systemData = actorData.system;
    systemData.generic.pl = 0;
    systemData.generic.pp = Math.max(systemData.generic.pl * 15, 15) + systemData.generic.extrapp;
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