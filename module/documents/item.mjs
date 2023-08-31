import GetPowerData from "../helpers/PowersData.mjs"
import GetAdvantagesData from "../helpers/AdvantagesData.mjs"
import { GetDistanceName } from "../helpers/data-tables.mjs";

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
        this.prepareExtrasFlawsCostAddition();
        this.prepareCostTotal();
        this._prepareActivation();
      break;

      case "advantage":
        if(this.system.id != "")
        {
          this.prepareAdvantage();
        }
        if(this.system.ranked == false)
        {
          //this.actor.update({'system.ranks': 1}); // FIXME: Check if works
        }
      break;
    }

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
    //if ( !("action" in this.system) ) return;
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
    else if (rng.range == "close")
    {
      this.prepareRanges();
      this.labels.range = rng.close + " " + GetDistanceName(false); 
    }
    else
    {
      this.prepareRanges();
      this.labels.range = rng.close + "/" + rng.medium + "/" + rng.far + " " + GetDistanceName(false);
    }

    // Duration label
    this.labels.duration = C.powerDurationEnum[this.system.duration] ?? "";

    this.labels.basepower = C.defaultPowerEffects[this.system.power_effect] ?? "";
  }

  prepareRanges(){
    const rng = this.system.ranges ?? {};

    const RangeIncrease = Math.pow(2, rng.rangeincrease);
    
    if (rng.range == 'close')
    {
      rng.close = 1 * RangeIncrease;
    }
    else
    {
      const baseRange = this.system.power_cost.rank * RangeIncrease;
      rng.close = baseRange * 25;
      rng.medium = baseRange * 50;
      rng.far = baseRange * 100;
    }
  }

  prepareFinalAttributes() {
    // Other Saving throws
    switch ( this.type ) {
      case "power":
        this.getSaveDC();
        this.getDamageDC();
        //this.getDerivedExtraFlawLabel();
        //this.prepareCostTotal();
      break;
      case "advantage":
        this.setAdvantageItemName();
      break;
    }

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

    this.system.power_cost.base_cost = powerData.cost ?? 0;
    this.system.action.type = powerData.action ?? '';
    this.system.duration = powerData.duration ?? '';
    this.system.ranges.range = powerData.range;
    this.system.type = powerData.type;
    this.system.save.resistance = powerData.savingthrow;
    this.system.damage.resistance = powerData.damage ?? "";

    this.system.power_cost.manual_purchase = powerData.manual_purchase ?? true
    this.system.power_cost.max_ranks = powerData.max_ranks ?? 50;
    this.preparePowers(powerData.data ?? {});
  }

  prepareAdvantage(){
    var advantageData = {
      max_ranks: 1,
      type: "",
      extradesc: false,
      ranked: false,
      effect: false
    }
    if(this.system.id != null){
      advantageData = GetAdvantagesData(this.system.id);
    }

    this.system.max_ranks = advantageData.max_ranks ?? 1;
    this.system.type = advantageData.type ?? "";
    this.system.extradesc = advantageData.extradesc ?? false;
    this.system.ranked = advantageData.ranked ?? false;
    this.system.effect = advantageData.effect ?? false;
    
    if (advantageData.extradesc == "input")
    {
      this.system.description = advantageData.description ?? "";
    }
    else if (advantageData.extradesc == "dropdown")
    {
      var arr = new Object();
      const skl = CONFIG.MNM3E.skills;
      const dt = advantageData.dropdown;

      if (Array.isArray(dt) && dt.length)
      {
        dt.forEach(element => {
          const subtypeValue = this.actor.system.skills[element].subtype;
          const val = (subtypeValue !== undefined && subtypeValue !== '') ? subtypeValue : skl[element];
          arr[element] = val;
        });
      }
      else
      {
        Object.keys(skl).forEach(element => {
          const subtypeValue = this.actor.system.skills[element].subtype;
          const val = (subtypeValue !== undefined && subtypeValue !== '') ? subtypeValue : skl[element];
          arr[element] = val;
        });
      }
      this.system.dropdown = arr;
    }
  }

  preparePowers(data)
  {
    switch (this.system.power_effect) {
      case 'affliction':        
        this.system.unique.value_one= this.ListFiller(data.rank1, CONFIG.MNM3E.conditions);
        this.system.unique.value_two= this.ListFiller(data.rank2, CONFIG.MNM3E.conditions);
        this.system.unique.value_three= this.ListFiller(data.rank3, CONFIG.MNM3E.conditions);
        this.system.unique.resistancecheck= this.ListFiller(data.resistance, CONFIG.MNM3E.defenses);
        this.system.save.resistance = this.system.values.value_five;
      break;
      case 'enhancedability':
        this.system.unique.value_one = this.ListFiller(data, CONFIG.MNM3E.abilities);
      break;
      case 'enhancedextra':
        
      break;
      case 'enhancedtrait':
        this.system.unique.value_one = this.ListFiller(data.skills, this.skillsWithCharacterNames());
        this.system.unique.value_two = CONFIG.MNM3E.AdvantageEnum;
      break;
    }
  }

  /**
   * @param {array} data Array with values from where to pull value names
   * @param {object} table Config object to use
   * @returns Object
   */
  ListFiller(data, table){
    var response = new Object();
    
    data.forEach(element => {
      response[element] = table[element];
    });

    return response;
  }

  setAdvantageItemName()
  {
    if (this.system.id != "custom")
    {
      const conf = CONFIG.MNM3E;
      if(this.system.extradesc == false)
      {
        this.name = conf.AdvantageEnum[this.system.id];
      }
      else if(this.system.extradesc == "input")
      {
        this.name = conf.AdvantageEnum[this.system.id] + " (" + this.system.additionalDesc + ")";
      }
      else if(this.system.extradesc == "dropdown")
      {
        const val = this.skillsWithCharacterNames();
        this.name = conf.AdvantageEnum[this.system.id] + " (" + val[this.system.additionalDesc] + ")";
      }
    }  
  }

  getSaveDC() 
  {
    if ( this.system.save.resistance == "" ||  this.system.save.effect == "" || this.system.save.effect == null ) return null;

    const save = this.system.save;
    const dc =  parseInt(save.effect) + 10;

    const abl = CONFIG.MNM3E.abilities[save.resistance]?.label ?? "";
    this.labels.save = game.i18n.format("MNM3E.SaveDC", {dc: dc || "", ability: abl});
    return dc;
  }

  getDamageDC() 
  {
    if ( this.system.damage.resistance == "" ||  this.system.damage.effect == "" ||  this.system.damage.effect == null) return null;

    const save = this.system.damage;
    const dc = parseInt(save.effect) + 15;

    const abl = CONFIG.MNM3E.abilities[save.resistance]?.label ?? "";
    this.labels.damage = game.i18n.format("MNM3E.SaveDamageDC", {dc: dc || "", ability: abl});
    return dc;
  }

  getAttackToHit() 
  {
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

  prepareExtrasFlawsCostAddition()
  {
    let extras = this.system.extrasflaws.parts.reduce((extras, i) => {
      if (i[1] != "extra") return extras;
      const c = i[2] || 0;
      return extras + c
    }, 0);
    this.system.power_cost.extras = extras;

    let flaws = this.system.extrasflaws.parts.reduce((flaws, i) => {
      if (i[1] != "flaws") return flaws;
      const c = i[2] || 0;
      return flaws + c
    }, 0);
    this.system.power_cost.flaws = flaws;

    const flatsTypes = ["extraflat", "flawsflat"];
    let flat = this.system.extrasflaws.parts.reduce((flat, i) => {
      if (!flatsTypes.includes(i[1])) return flat;
      if (i[1] == "flawsflat")
      {
        const c = i[2] || 0;
        return flat - c
      }
      const c = i[2] || 0;
      return flat + c
    }, 0);

    this.system.power_cost.flat = flat;
  }

  prepareCostTotal(){
    const pcost = this.system.power_cost;

    var combinedPerRank = pcost.base_cost + pcost.extras - pcost.flaws;

    if(combinedPerRank < 1)
    {
      pcost.final_cost = Math.ceil(pcost.rank / (2 - combinedPerRank)) + pcost.flat;
    } 
    else 
    {
      pcost.final_cost = combinedPerRank * pcost.rank + pcost.flat;
    }

    // Check if array
    pcost.active_cost = pcost.final_cost;
    pcost.active_rank = pcost.rank;
  }

  addActiveEffects(){
    if (key.system.power_effect == 'enhancedability')
    {
      
    }
    if (key.system.power_effect == 'enhancedtrait')
    {

    }
  }

  skillsWithCharacterNames(){
    var returnObject = new Object();
    const skillsactor = this.actor.system.skills;
    Object.keys(CONFIG.MNM3E.skills).forEach(element => {
      const subtypeValue = this.actor.system.skills[element].subtype;
      returnObject[element] = (subtypeValue !== undefined && subtypeValue !== '') ? subtypeValue : CONFIG.MNM3E.skills[element];
    });
    return returnObject;
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