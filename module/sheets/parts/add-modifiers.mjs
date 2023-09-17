import BaseConfigSheet from "./base-config.mjs";
import * as mods from "../../helpers/dataholders/ModifiersData.mjs";

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


  /** @inheritdoc */
  static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: ["add-extra", "foundrymnm3e"],
        template: "systems/foundrymnm3e/templates/window-overlay/add-modifiers.hbs",
        width: 600,
        height: 690,
        sheetConfig: false
      });
  }

  get title() {
    return "Add Extras and Flaws";
  }

  getData(options={})
  {
    const context = super.getData(options);
    
    return foundry.utils.mergeObject(context, {
      responseList: mods.GetAllExtrasFlaws(this.options.power_effect)
    })
  }
  
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".modifier").click(this.showDescription.bind(this));
    html.find(".add").click(this.addModifiersToParent.bind(this));
  }

  async addModifiersToParent(event)
  {
    event.preventDefault();
    this.document.addExFl(mods.getSpecificModifier(this.selected));
  }

  async showDescription(event)
  {
    event.preventDefault();
    const a = event.currentTarget;
    const value = a.getAttribute('data-part');
    this.selected = value;

    const list = a.parentNode.parentNode;
    const previouslyHighlighted = list.querySelector('.highlighted');
    if (previouslyHighlighted) {
      previouslyHighlighted.classList.remove('highlighted');
    }

    a.parentNode.classList.add('highlighted');
    
    var description = `<h3 style="text-align: center;"><b>${CONFIG.MNM3E.ExtrasFlawsAll[value]}</b></h3>`;
    description += CONFIG.MNM3E.ExtrasFlawsAllDesc[value] ?? "";

    const b = a.parentNode.parentNode.parentNode.childNodes[2].nextSibling.childNodes[1];
    b.innerHTML = description;
  }
}