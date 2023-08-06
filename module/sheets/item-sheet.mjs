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

    switch (this.item.type) {
      case "power":
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

          powers: context.config.defaultPowerEffects,

          selected_powers: this.item.system.power_effect,
          selected_type: this.item.system.type,
          selected_action: this.item.system.action.type,
          selected_range: this.item.system.ranges.range,
          selected_duration: this.item.system.duration,
          selected_savingthrow: this.item.system.save.resistance,
          selected_damage: this.item.system.damage.resistance,
          saveDamage: this.item.system.damage.resistance != "",

          max_ranks: this.item.system.power_cost.max_ranks,
          purchase: this._canBePurchased(),
          lock: this._getCheckmarkIcon(this.item.system.locked)
          //uniquefield: this.fillUniqueField()
          // effects: ActiveEffect5e.prepareActiveEffectCategories(item.effects)
        });
      case "advantage":
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

  fillUniqueField(){
    switch (this.item.system.power_effect) {
      case 'affliction':
        return '<select class="power-value" name="system.power_effect">{{selectOptions powers selected=selected_powers blank=""}}</select>';
      default:
        return '<label>Nothing</label>'
    }
  }

  _getCheckmarkIcon(level){
    const icons = {
      true: '<i class="fa-solid fa-lock"></i>',
      false: '<i class="fa-solid fa-lock-open"></i>',
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
    if (exfl) exfl.parts = Object.values(exfl?.parts || {}).map(d => [d[0] || "", d[1] || "", d[2] || ""]);

    return foundry.utils.flattenObject(formData);
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;
    html.find(".exfl-control").click(this.onExFlControl.bind(this));

    html.find(".lockbutton").click(this.lockSheet.bind(this));
    // Roll handlers, click handlers, etc. would go here.
  }

  // Adding and removing extras and flaws
  async onExFlControl(event){
    event.preventDefault();
    const a = event.currentTarget;

    if( a.classList.contains("add-exfl") ) {
      await this._onSubmit(event);  // Submit any unsaved changes
      const extrasflaws = this.item.system.extrasflaws;
      return this.item.update({"system.extrasflaws.parts": extrasflaws.parts.concat([["", "", null]])});
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

  async lockSheet(event){
    event.preventDefault();
    await this._onSubmit(event);
    return this.item.update({"system.locked": true})
  }
}
