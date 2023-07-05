import BaseConfigSheet from "./base-config.mjs";

/**
 * Interface for managing a character's armor calculation.
 */
export default class SkillsConfig extends BaseConfigSheet {
    constructor(...args) {
      super(...args);
  
      /**
       * Cloned copy of the actor for previewing changes.
       * @type {Actor5e}
       */
      this.clone = this.document.clone();
    }

    /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mnm3e", "skills-config"],
      template: "systems/foundrymnm3e/templates/actor/parts/skills-config.hbs",
      width: 320,
      height: "auto",
      sheetConfig: false
    });
  }
}