import ExtrasFlawsSheet from "./parts/add-modifiers.mjs";

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
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes" }]
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
    const systemData = item.system;
    switch (this.item.type) {
      case "power":
        foundry.utils.mergeObject(context, {
          source: source.system,
          system: item.system,
          labels: item.labels,
          isEmbedded: item.isEmbedded,
          rollData: this.item.getRollData(),

          itemType: game.i18n.localize(`ITEM.Item.${this.item.type}`),
          itemStatus: this._getItemStatus(),
          itemProperties: this._getItemProperties(),

          // Selectables
          powers: context.config.defaultPowerEffects,

          selected_powers: systemData.power_effect,
          selected_type: systemData.type,
          selected_action: systemData.action.type,
          selected_range: systemData.ranges.range,
          selected_duration: systemData.duration,
          selected_savingthrow: systemData.save.resistance,
          selected_damage: systemData.damage.resistance,
          saveDamage: systemData.damage.resistance != "",

          setvalueone: systemData.values.value_one,
          setvaluetwo: systemData.values.value_two,
          setvaluethree: systemData.values.value_three,
          setvaluefour: systemData.values.value_four,
          setvaluefive: systemData.values.value_five,

          value_one: systemData.unique.value_one ?? '',
          value_two: systemData.unique.value_two ?? '',
          value_three: systemData.unique.value_three ?? '',
          value_four: systemData.unique.value_four ?? '',
          value_five: systemData.unique.value_five ?? '',

          resistancearray: systemData.unique.resistancecheck ?? {},

          max_ranks: systemData.power_cost.max_ranks,
          purchase: this._canBePurchased(),
          active: systemData.active,
          activestate: this._getActiveIcon(systemData.locked),
          locked: systemData.locked,
          lock: this._getCheckmarkIcon(systemData.locked)
        });
      break;
      case "advantage":
        const syst = this.item.system;
        foundry.utils.mergeObject(context, {
          source: source.system,
          system: item.system,
          labels: this.item.labels,
          isEmbedded: item.isEmbedded,
          advancementEditable: (this.advancementConfigurationMode || !item.isEmbedded) && context.editable,
          rollData: this.item.getRollData(),

          itemType: game.i18n.localize(CONFIG.Item.typeLabels[this.item.type]),
          itemStatus: this._getItemStatus(),
          itemProperties: this._getItemProperties(),

          advantageslist: context.config.AdvantageEnum,
          selected_id: syst.id,

          max_ranks: syst.max_ranks,
          type: syst.type,
          extradesc: syst.extradesc,
          ranked: syst.ranked,
          enchanced: syst.enchanced,
          additionalDesc: syst.additionalDesc,

          descPlaceholder: syst.placeholder ?? '',
          descDropdown: syst.dropdown ?? [],
        });
        break;
    }
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
        props.push(labels.activate);
        props.push(labels.range);
        props.push(labels.duration);
        props.push(labels.basepower);
        break;
    }

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

  _getCheckmarkIcon(level){
    const icons = {
      true: '<i class="fa-solid fa-lock"></i>',
      false: '<i class="fa-solid fa-lock-open"></i>',
    }
    return icons[level] || icons[0];
  }

  _getActiveIcon(level){
    const icons = {
      false: '<i class="fa-solid fa-circle-xmark"></i>',
      true: '<i class="fa-solid fa-circle-check"></i>',
    }
    return icons[level] || icons[0];
  }

  _canBePurchased(){
    const returnV = this.item.system.power_cost.manual_purchase ? false : true;
    return returnV;
  }

  /* -------------------------------------------- */
  /*  Form Submission                             */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _getSubmitData(updateData={}) {
    const formData = foundry.utils.expandObject(super._getSubmitData(updateData));

    // Handle Extras and Flaws
    const exfl = formData.system?.extrasflaws;
    if (exfl) exfl.parts = Object.values(exfl?.parts || {}).map(d => [d[0] || "", d[1] || "", d[2] || 0]);

    const ench = formData.system?.values;
    if (ench) ench.value_array = Object.values(ench?.value_array || {}).map(e => [e[0] || "", e[1] || 1]);

    return foundry.utils.flattenObject(formData);
  }

  _disableOverriddenFields(html){
    if(!this.item.system.power_cost.manual_purchase)
    {
      const toggle = html.find(`.rank`);
      toggle[0].disabled = true;
    }
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;
    html.find(".exfl-control").click(this.onExFlControl.bind(this));
    html.find(".ench-control").click(this.onEnchControl.bind(this));

    html.find(".lockbutton").click(this.lockSheet.bind(this));
    // Roll handlers, click handlers, etc. would go here.
    if(this.item.type == "power")
    {
      this._disableOverriddenFields(html);
    }
  }

    // Adding and removing extras and flaws
  async onEnchControl(event){
    event.preventDefault();
    const a = event.currentTarget;

    if( a.classList.contains("add-ench") ) {
      await this._onSubmit(event);  // Submit any unsaved changes
      const values = this.item.system.values;
      return this.item.update({"system.values.value_array": values.value_array.concat([["", 1]])});
    }

    if ( a.classList.contains("delete-ench") ) {
      await this._onSubmit(event);  // Submit any unsaved changes
      const li = a.closest(".ench-part");
      const value = li.getAttribute('data-ench-part'); 
      const values = foundry.utils.deepClone(this.item.system.values);
      values.value_array.splice(value, 1)
      return this.item.update({"system.values.value_array": values.value_array});
    }
  }

  // Adding and removing extras and flaws
  async onExFlControl(event){
    event.preventDefault();
    const a = event.currentTarget;

    if( a.classList.contains("add-exfl") ) {
      await this._onSubmit(event);  // Submit any unsaved changes
      event.stopPropagation();
      let app;
      app = new ExtrasFlawsSheet(this.item);
      app.render(true);
      // const extrasflaws = this.item.system.extrasflaws;
      // return this.item.update({"system.extrasflaws.parts": extrasflaws.parts.concat([["", "", 0]])});
    }

    if ( a.classList.contains("delete-exfl") ) {
      await this._onSubmit(event);  // Submit any unsaved changes
      const li = a.closest(".exfl-part");
      const value = li.getAttribute('data-exfl-part'); 
      const extrasflaws = foundry.utils.deepClone(this.item.system.extrasflaws);
      extrasflaws.parts.splice(value, 1)
      return this.item.update({"system.extrasflaws.parts": extrasflaws.parts});
    }
  }

  /**
   * 
   * @param {Object} data 
   * @param {String} data.label Display label
   * @param {type} data.type extra/extraflat/flaws/flawsflat Modifier
   * @returns Creates extrasflaws part
   */
  async addModifier(data)
  {
    const extrasflaws = this.item.system.extrasflaws;

    var toAdd = [
      data.label, //Display label
      data.type, //
      data.cost,
      data.id,
      data.max_ranks,
      data.effect
    ];

    return this.item.update({"system.extrasflaws.parts": extrasflaws.parts.concat([toAdd])});
  }

  async lockSheet(event){
    event.preventDefault();
    await this._onSubmit(event);
    return this.item.update({"system.locked": true})
  }
}
