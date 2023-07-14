import GetPowerData from "../helpers/PowersData.mjs"

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class FoundryMnM3eItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["item-sheet", "foundrymnm3e", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/foundrymnm3e/templates/item";
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = await super.getData();
    const item = context.item;
    const source = item.toObject();

    context.config = CONFIG.MNM3E;


    // Use a safe clone of the item data for further operations.
    const itemData = context.item;

    var powerData = {
      cost: 0,
      type: "",
      action: "",
      range: "",
      duration: "",
      savingthrow: ""
    }
    console.debug(this.item.system.power_effect == "");
    if(this.item.system.power_effect != "")
    {
      powerData = GetPowerData(this.item.system.power_effect);
    }
    console.debug(powerData);

    foundry.utils.mergeObject(context, {
      source: source.system,
      system: item.system,
      labels: item.labels,
      isEmbedded: item.isEmbedded,
      advancementEditable: (this.advancementConfigurationMode || !item.isEmbedded) && context.editable,
      rollData: this.item.getRollData(),

      itemType: game.i18n.localize(CONFIG.Item.typeLabels[this.item.type]),
      itemStatus: this._getItemStatus(),
      itemProperties: this._getItemProperties(),

      powers: context.config.defaultPowerEffects,
      type: context.config.powerTypeEnum,
      action: context.config.powerActivationEnum,
      range: context.config.powerRangeEnum,
      duration: context.config.powerDurationEnum,
      savingthrow: context.config.defenses,

      selected_powers: this.item.system.power_effect,
      selected_type: powerData.type,
      selected_action: powerData.action,
      selected_range: powerData.range,
      selected_duration: powerData.duration,
      selected_savingthrow: powerData.savingthrow,

      // effects: ActiveEffect5e.prepareActiveEffectCategories(item.effects)
    });
    return context;
  }

  /* -------------------------------------------- */

  /**
   * Get the Array of item properties which are used in the small sidebar of the description tab.
   * @returns {string[]}   List of property labels to be shown.
   * @private
   */
  _getItemProperties() {
    const props = [];
    const labels = this.item.labels;
    switch ( this.item.type ) {
      case "device":
      case "power":
        props.push(CONFIG.MNM3E.powerActivationEnum[this.item.system.action.type]);
        props.push(CONFIG.MNM3E.powerRangeEnum[this.item.system.ranges.range])
        props.push(CONFIG.MNM3E.powerDurationEnum[this.item.system.duration])
        props.push(CONFIG.MNM3E.abilities[this.item.system.save.resistance])
        break;
    }

    props.push(labels.activate, labels.range, labels.duration, labels.basepower);
    return props.filter(p => !!p);
  }

  _getItemStatus()
  {
    switch ( this.item.type ) {
      case "power":
        return CONFIG.MNM3E.powerTypeEnum[this.item.system.type]
      case "advantage":
        return CONFIG.MNM3E.advantageTypeEnum[this.item.system.type]
    }
    return null;
  }
  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.
  }
}
