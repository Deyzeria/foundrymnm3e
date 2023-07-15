import GetPowerData from "../helpers/PowersData.mjs"

/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class FoundryMnM3eItem extends Item {
  prepareData() {
    super.prepareData();
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
    this.labels = {};

    switch ( this.type ) {
      case "power":
        if(this.system.power_effect != "")
        {
        this.preparePower(); 
        }
        break;
    }

    this._prepareActivation();

    //if ( !this.isOwned ) this.prepareFinalAttributes();
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
    if ( [null, "personal", "perception", "rank", ""].includes(rng.range) )
    {
      rng.close = rng.medium = rng.far = null;
      this.labels.range = C.powerRangeEnum[rng.range] ?? "";
    }
    else if (rng.medium == 0 && rng.medium != null)
    {
      this.prepareRanges();
      this.labels.range = rng.close + " " + C.distanceUnits['mAb']; // FIXME: Change to use setting from the settings
    }
    else
    {
      this.prepareRanges();
      this.labels.range = rng.close + "/" + rng.medium + "/" + rng.far + " " + C.distanceUnits['mAb']; // FIXME: Change to use setting from the settings
    }

    // Duration label
    this.labels.duration = C.powerDurationEnum[this.system.duration] ?? "";

    this.labels.basepower = C.defaultPowerEffects[this.system.power_effect] ?? "";
  }

  prepareRanges(){
    const rng = this.system.ranges ?? {};
    if (rng.range == 'close')
    {
      rng.close = 1;
    }
    else
    {
      rng.close = this.system.power_cost.rank * 25;
      rng.medium = this.system.power_cost.rank * 50;
      rng.far = this.system.power_cost.rank * 100;
    }
  }

  prepareFinalAttributes() {
    // Other Saving throws
    this.getSaveDC();

    // Damage Saving Throws
    this.getDamageDC();

    this.prepareCostTotal();

    // To Hit
    //this.getAttackToHit();
  }

  preparePower() {
    var powerData = {
      cost: 0,
      type: "",
      action: "",
      range: "",
      duration: "",
      savingthrow: ""
    }
    if(this.system.power_effect != "")
    {
      powerData = GetPowerData(this.system.power_effect);
    }

    this.system.power_cost.base_cost = powerData.cost;
    this.system.action.type = powerData.action;
    this.system.duration = powerData.duration;
    this.system.ranges.range = powerData.range;
    this.system.type = powerData.type;
    this.system.save.resistance = powerData.savingthrow;
    this.system.damage.resistance = powerData.damage ?? "";

    this.system.power_cost.manual_purchase = powerData.manual_purchase ?? true
    this.system.power_cost.max_ranks = powerData.max_ranks ?? 50;
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