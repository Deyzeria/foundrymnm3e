import BaseConfigSheet from "./base-config.mjs";

export default class ExtrasFlawsSheet extends BaseConfigSheet {
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
        classes: ["foundrymnm3e", "add-extra", "sheet"],
        template: "systems/foundrymnm3e/templates/window-overlay/add-extras.hbs",
        width: 600,
        height: "auto",
        sheetConfig: false
      });
  }

  getData(options={})
  {
    console.debug(this);

    /*

      return {
        
      }
    */
  }

  getPowerExtrasFlaws(power_type)
  {
    
  }
}