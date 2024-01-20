import BaseConfigSheet from "./base-config.mjs";

export default class ExtrasFlawsSheet extends BaseConfigSheet {
  constructor(...args) {
    super(...args);

    /**
     * Cloned copy of the item for previewing changes.
     * @type {FoundryMnM3eItemSheet}
     */
    this.clone = this.document.clone();
    this.selected = "";
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["add-descriptor", "foundrymnm3e"],
      template: "systems/foundrymnm3e/templates/window-overlay/add-descriptor-sheet.hbs",
      width: 600,
      height: 690,
      sheetConfig: false
    });
  }

  get title() {
    return "Add Descriptors";
  }

  getData(options = {}) {
    const context = super.getData(options);

    return foundry.utils.mergeObject(context, {
      responseList: mods.GetAllExtrasFlaws(this.options.power_effect)
    })
  }

}