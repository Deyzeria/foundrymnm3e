import { d20Roll } from "../dice/dice.mjs";

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

    if (systemData.heroname == ""){
      systemData.heroname = actorData.name;
    } else if (systemData.heroname != actorData.name && systemData.heroname != "")
    {
      actorData.name = systemData.heroname;
    }
    

    systemData.generic.pp = Math.max(systemData.generic.pl * 15, 15) + systemData.generic.extrapp;

    for (let [key, ability] of Object.entries(systemData.abilities)) {
      if(ability.purchased >= -5)
      {
        ability.total = ability.purchased + ability.misc + ability.auto;
        systemData.generic.pp_ability += ability.purchased * 2;
      } 
      else
      {
        ability.total = -100;
        systemData.generic.pp_ability += -5 * 2;
      }
    }

    for (let [key, defense] of Object.entries(systemData.defenses)) {
      if(systemData.abilities[defense.ability].total > -6)
      {
        defense.default = systemData.abilities[defense.ability].total;
        defense.total = defense.purchased + defense.misc + defense.auto + defense.default;
        defense.ac = 10 + parseInt(defense.total);
      }
      else
      {
        defense.default = 0;
        if(key == 'toughness')
        {
          defense.total = defense.misc + defense.auto;
          defense.ac = 10 + parseInt(defense.total);
        } 
        else 
        {
          defense.total = -100;
        }
      }
      systemData.generic.pp_defenses += defense.purchased;
    }

    for (let [key, skill] of Object.entries(systemData.skills)) {
      skill.default = systemData.abilities[skill.ability].purchased > -6 ? systemData.abilities[skill.ability].total : 0;
      skill.total = skill.default + skill.purchased + skill.misc + skill.auto;
      systemData.generic.pp_skills += skill.purchased / 2;
    }

    systemData.generic.pp_spent = systemData.generic.pp_ability + systemData.generic.pp_defenses + systemData.generic.pp_skills + systemData.generic.pp_advantages + systemData.generic.pp_powers;
  }

  //to add later to powers
  calculatePowerCost(actorData) {
    const systemData = actorData.system;
    var combinedPerRank = 0

    combinedPerRank = BaseCost + Extras - Flaws;

    if(combinedPerRank < 1)
    {
      TotalCost = Math.ceil(Rank / (2 - combinedPerRank)) + Static;
    } 
    else 
    {
      TotalCost = combinedPerRank * Rank + Static;
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
    const data = {...super.getRollData()};

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

  /**
 * Roll a generic ability test or saving throw.
 * Prompt the user for input on which variety of roll they want to do.
 * @param {string} abilityId    The ability id (e.g. "str")
 * @param {object} options      Options which configure how ability tests or saving throws are rolled
 */  
// FIXME: Add Debilitated, Absent check and roll change
  async rollAbility(abilityId, options={}) {
    const label = CONFIG.MNM3E.abilities[abilityId] ?? "";
    const abl = this.system.abilities[abilityId];
    if (abl.purchased < -6)
    {
      console.debug("Absent");
    }
    else if (abl.auto < -6)
    {
      console.debug("Debilitated");
    }
    else {
      const parts = [];
      const data = this.getRollData();

      parts.push("@total");
      data.total = abl?.total ?? 0;

      // Roll and return
      const flavor = game.i18n.format("MNM3E.AbilityPromptTitle", {ability: label});
      const rollData = foundry.utils.mergeObject({
        data,
        title: `${flavor}: ${this.name}`,
        flavor,
        messageData: {
          speaker: options.speaker || ChatMessage.getSpeaker({actor: this}),
          "flags.foundrymnm3e.roll": {type: "ability", abilityId}
        }
        }, options);
        rollData.parts = parts.concat(options.parts ?? []);

      const roll = await d20Roll(rollData);
      return roll;
    }
  }

  // FIXME: Add Disabled check and roll change
  async rollDefense(defenseId, options={}) {
    const label = CONFIG.MNM3E.defenses[defenseId] ?? "";
    const def = this.system.defenses[defenseId];
    if (def?.immune)
    {
      console.debug("Immune");
    }
    else if (def.total < -6)
    {
      console.debug("Debilitated");
    }
    else
    {
      const parts = [];
      const data = this.getRollData();

      parts.push("@total");
      data.total = def?.total ?? 0;

      // Roll and return
      const flavor = game.i18n.format("MNM3E.DefensePromptTitle", {defense: label});
      const rollData = foundry.utils.mergeObject({
        data,
        title: `${flavor}: ${this.name}`,
        flavor,
        messageData: {
          speaker: options.speaker || ChatMessage.getSpeaker({actor: this}),
          "flags.foundrymnm3e.roll": {type: "defense", defenseId}
        }
        }, options);
        rollData.parts = parts.concat(options.parts ?? []);
      
      const roll = await d20Roll(rollData);
      return roll;
    }
  }

  // FIXME: Add Disabled check and roll change
  async rollSkill(skillId, options={}) {
    const skl = this.system.skills[skillId];
    const label = skl.subtype != null ? skl.subtype : CONFIG.MNM3E.skills[skillId];
    const parts = [];
    const data = this.getRollData();

    parts.push("@total");
    data.total = skl?.total ?? 0;

    // Roll and return
    const flavor = game.i18n.format("MNM3E.SkillPromptTitle", {skill: label});
    const rollData = foundry.utils.mergeObject({
      data,
      title: `${flavor}: ${this.name}`,
      flavor,
      messageData: {
        speaker: options.speaker || ChatMessage.getSpeaker({actor: this}),
        "flags.foundrymnm3e.roll": {type: "skill", skillId}
      }
      }, options);
      rollData.parts = parts.concat(options.parts ?? []);
    
    const roll = await d20Roll(rollData);
    return roll;
  }

}

Hooks.on("renderActorSheet", (app, html, data) => {
  if(data.system.generic.pp_spent > data.system.generic.pp){
    html.find(".attribute-value.multiple .spenttotal")[0].style.background = "red";
  }
  if(!Number.isInteger(data.system.generic.pp_skills)){
    html.find(".skillsspent")[0].style.background = "red";
  }
});