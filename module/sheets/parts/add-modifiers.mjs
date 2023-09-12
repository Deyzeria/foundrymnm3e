import BaseConfigSheet from "./base-config.mjs";
import GetAllExtrasFlaws from "../../helpers/dataholders/ModifiersData.mjs";

export default class ExtrasFlawsSheet extends BaseConfigSheet {
  constructor(...args) {
      super(...args);
  
      /**
       * Cloned copy of the item for previewing changes.
       * @type {FoundryMnM3eItemSheet}
       */
      this.clone = this.document.clone();
    }


      /** @inheritdoc */
  static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: ["foundrymnm3e", "add-extra", "sheet"],
        template: "systems/foundrymnm3e/templates/window-overlay/add-modifiers.hbs",
        width: 600,
        height: 800,
        sheetConfig: false
      });
  }

  get title() {
    return "Add Extras and Flaws";
  }

  getData(options={})
  {
    var responseList = GetAllExtrasFlaws(this.options.power_effect);
    for (let i = 0; i < responseList.length; i++) {
      console.debug(responseList[i]); //FIXME: Fix this thing
    }
    console.debug(responseList);

    return {
      responseList: responseList
    }
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".modifier").click(this.showDescription.bind(this));
    html.find(".add").click(this.addModifiersToParent.bind(this));
  }

  async addModifiersToParent(event)
  {
    event.preventDefault();
    await this._onSubmit(event);  // Submit any unsaved changes
    const a = event.currentTarget;

    const li = a.closest(".modifiers-part");
    const value = li.getAttribute('data-part');
  }

  async showDescription(event)
  {
    event.preventDefault();
    await this._onSubmit(event);  // Submit any unsaved changes
    const a = event.currentTarget;

    const li = a.closest(".modifiers-part");
    const value = li.getAttribute('data-part');


  }
}