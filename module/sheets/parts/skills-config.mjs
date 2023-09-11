import BaseConfigSheet from "./base-config.mjs";

/**
 * Interface for managing a character's skills data.
 */
export default class SkillsConfig extends BaseConfigSheet {
    constructor(...args) {
      super(...args);
  
      /**
       * Cloned copy of the actor for previewing changes.
       * @type {FoundryMnM3eActor}
       */
      this.clone = this.document.clone();
    }

    /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["foundrymnm3e", "skills-config"],
      template: "systems/foundrymnm3e/templates/actor/parts/skills-config.hbs",
      width: 320,
      height: "auto",
      sheetConfig: false
    });
  }

    /** @inheritdoc */
    get title() {
      const skl = this.object.system.skills[this.options.key];
      const label = skl.subtype != null ? skl.subtype : CONFIG.MNM3E.skills[this.options.key];
      return `${game.i18n.format("MNM3E.SkillConfig", {skill: label})}: ${this.document.name}`;
    }

    get isSubtypeType() {
      if (this.options.key.startsWith("clc")) {
        return "CC";
      } else if (this.options.key.startsWith("exp")) {
        return "EX";
      } else if (this.options.key.startsWith("rng")) {
        return "RC";
      }
    }

    // FIXME: Rewrite if- here if I will be adding more skills or better skill system overall
    getData(options={}){
      const subtypeBool = this.document.system.skills[this.options.key].hasOwnProperty("subtype");
      var type = "";
      if(subtypeBool)
      {
        type = this.isSubtypeType();
      }
      return{
        abilities: CONFIG.MNM3E.abilities,
        key: this.options.key,
        entry: this.document.system.skills[this.options.key],
        edSubtype: subtypeBool,
        edName: type
      }
    }
}