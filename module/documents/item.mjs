/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class FoundryMnM3eItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
    this.labels = {};

    // switch ( this.type ) {
    //   case "power":
    //     this.preparePower(); break;
    // }

    this._prepareActivation();

    // Un-owned items can have their final preparation done here, otherwise this needs to happen in the owning Actor
    if ( !this.isOwned ) this.prepareFinalAttributes();
  }

  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
  getRollData() {
    // If present, return the actor's roll data.
    if ( !this.actor ) return null;
    const rollData = this.actor.getRollData();
    // Grab the item's system data as well.
    rollData.item = foundry.utils.deepClone(this.system);

    return rollData;
  }

  _prepareActivation() {
    if ( !("action" in this.system) ) return;
    const C = CONFIG.MNM3E;

    // Activation label
    const act = this.system.action ?? {};
    this.labels.activate = act.type  ? [act.length, C.powerActivationEnum[act.type]].filterJoin(" ") : "";

    // Range label
    const rng = this.system.ranges ?? {};
    if ( [null, "personal", "perception", "rank"].includes(rng.range) )
    {
      rng.close = rng.medium = rng.far = null;
      this.labels.range = C.powerRangeEnum[rng.range];
    }
    else if (rng.medium == 0 && rng.medium != null)
    {
      this.labels.range = rng.close + " " + C.distanceUnits['m']; // FIXME: Change to use setting from the settings
    }
    else
    {
      this.labels.range = rng.close + "/" + rng.medium + "/" + rng.far + " " + C.distanceUnits['m']; // FIXME: Change to use setting from the settings
    }

    // Duration label
    this.labels.duration = C.powerDurationEnum[this.system.duration] ?? "";

    this.labels.basepower = C.defaultPowerEffects['damage'] ?? "";
  }

  /**
   * Compute item attributes which might depend on prepared actor data. If this item is embedded this method will
   * be called after the actor's data is prepared.
   * Otherwise, it will be called at the end of `Item5e#prepareDerivedData`.
   */
  prepareFinalAttributes() {
    // Other Saving throws
    this.getSaveDC();

    // Damage Saving Throws
    this.getDamageDC();

    this.prepareCostTotal();

    // To Hit
    //this.getAttackToHit();
  }

  getSaveDC() {
    if ( this.system.save.resistance == "" ||  this.system.save.effect == "" || this.system.save.effect == null ) return null;

    const save = this.system.save;
    const dc =  parseInt(save.effect) + 10;

    const abl = CONFIG.MNM3E.abilities[save.resistance]?.label ?? "";
    this.labels.save = game.i18n.format("MNM3E.SaveDC", {dc: dc || "", ability: abl});
    return dc;
  }

  getDamageDC() {
    if ( this.system.damage.resistance == "" ||  this.system.damage.effect == "" ||  this.system.damage.effect == null) return null;

    const save = this.system.damage;
    const dc = parseInt(save.effect) + 15;

    const abl = CONFIG.MNM3E.abilities[save.resistance]?.label ?? "";
    this.labels.damage = game.i18n.format("MNM3E.SaveDamageDC", {dc: dc || "", ability: abl});
    return dc;
  }

  getAttackToHit() {
    if (this.system.attack.type == "") return null;
    const rollData = this.getRollData();
    const parts = [];

    if ( !this.isOwned ) return {rollData, parts};

    parts.push("@total");

    // Condense the resulting attack bonus formula into a simplified label
    const roll = new Roll(parts.join("+"), rollData);
    const formula = simplifyRollFormula(roll.formula) || "0";
    this.labels.toHit = !/^[+-]/.test(formula) ? `+ ${formula}` : formula;
    return {rollData, parts};
  }

  prepareCostTotal(){
    const pcost = this.system.power_cost;

    var combinedPerRank = 0

    combinedPerRank = pcost.base_cost + pcost.extras - pcost.flaws;

    if(combinedPerRank < 1)
    {
      pcost.final_cost = Math.ceil(pcost.rank / (2 - combinedPerRank)) + pcost.flat;
    } 
    else 
    {
      pcost.final_cost = combinedPerRank * pcost.rank + pcost.flat;
    }
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If there's no roll data, send a chat message.
    if (!this.system.formula) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
        content: item.data.description ?? ''
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.item.formula, rollData);
      // If you need to store the value first, uncomment the next line.
      // let result = await roll.roll({async: true});
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }
}