import GetPowerData from "../helpers/dataholders/PowersData.mjs"
import GetAdvantagesData from "../helpers/dataholders/AdvantagesData.mjs"
import * as ScaleTable from "../helpers/data-tables.mjs";
import ActiveEffectMnm3e from "../helpers/effects.mjs";

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
        this.prepareExtrasFlawsCostAddition();
        this.prepareCostTotal();
        this._prepareLabels();
        this.system.combineddescription= "";
      break;

      case "advantage":
        if(this.system.ranked == false)
        {
          this.update({'system.ranks': 1});
        }
      break;
    }

    //if ( !this.isOwned ) this.prepareFinalAttributes();
  }

  /** @inheritdoc */
  _onUpdate(data, options, userId) {
    super._onUpdate(data, options, userId);

    // Power updates
    if(data.system?.power_effect != undefined)
    {
      this.preparePower();
    }
    if(data.system?.values?.value_array != undefined)
    {
      this.addActiveEffects();
    }

    // Advantages
    if(data.system?.id != undefined && data.system?.id != "")
    {
      this.prepareAdvantage();
    }
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

  _prepareLabels() {
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
      this.labels.range = rng.close + " " + ScaleTable.GetDistanceName(false); 
    }
    else
    {
      this.prepareRanges();
      this.labels.range = rng.close + "/" + rng.medium + "/" + rng.far + " " + ScaleTable.GetDistanceName(false);
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
        this.prepareTransformativeDataPowers();
        if(this.system.save.resistance != "" && this.system.save.resistance != "none") this.getSaveDC();
        if(this.system.damage.resistance != "" && this.system.damage.resistance != "none") this.getDamageDC();
        if(this.system.area.type != "" && this.system.area.type != "none") this.getAreaSaveDC();
        this.prepareFinalDescription();
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

    var updateData = {};

    updateData["system.power_cost.base_cost"] = powerData.cost ?? 0;
    updateData["system.action.type"] = powerData.action ?? '';
    updateData["system.duration"] = powerData.duration ?? '';
    updateData["system.ranges.range"] = powerData.range;
    updateData["system.type"] = powerData.type;
    updateData["system.save.resistance"] = powerData.savingthrow;
    updateData["system.damage.resistance"] = powerData.damage ?? ''; // FIXME: This quite often just stops working?

    updateData["system.power_cost.manual_purchase"] = powerData.manual_purchase ?? true;
    updateData["system.power_cost.max_ranks"] = powerData.max_ranks ?? 50;

    //Data is not always updated if you switch too quickly :/
    this.update(updateData);

    if(powerData.data == false) return;

    this.preparePowers(powerData.data ?? {});
  }

  preparePowers(data)
  {
    this.clearValueAndUnique();

    var updateData = {};
    switch (this.system.power_effect) {
      case 'affliction':        
        updateData["system.unique.value_one"]= this.ListFiller(data.rank1, CONFIG.MNM3E.conditions);
        updateData["system.unique.value_two"]= this.ListFiller(data.rank2, CONFIG.MNM3E.conditions);
        updateData["system.unique.value_three"]= this.ListFiller(data.rank3, CONFIG.MNM3E.conditions);
        updateData["system.unique.resistancecheck"]= this.ListFiller(data.resistance, CONFIG.MNM3E.defenses);
        break;
      case 'communication':
        updateData["system.unique.value_one"]= this.ListFiller(data.sensetype, CONFIG.MNM3E.SenseTypes);
        break;
      case 'damage':
        updateData["system.values.value_one"] = false;
        break;
      case 'enhancedability':
        updateData["system.unique.value_one"] = this.ListFiller(data, CONFIG.MNM3E.abilities);
        break;
      case 'enhancedextra':
        
        break;
      case 'enhancedtrait':
        updateData["system.unique.value_one"] = {
          ...CONFIG.MNM3E.defenses,
          ...this.skillsWithCharacterNames()
        };
        updateData["system.unique.value_two"] = CONFIG.MNM3E.AdvantageEnum;
        break;
    }
    this.update(updateData);
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

    var updateData = {};

    updateData["system.max_ranks"] = advantageData.max_ranks ?? 1;
    updateData["system.type"] = advantageData.type ?? "";
    updateData["system.extradesc"] = advantageData.extradesc ?? false;
    updateData["system.ranked"] = advantageData.ranked ?? false;
    updateData["system.effect"] = advantageData.effect ?? false;
    
    if (advantageData.extradesc == "input")
    {
      updateData["system.description"] = advantageData.description ?? "";
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
      updateData["system.dropdown"] = arr;
    }

    this.update(updateData);
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
    if (this.system.id != "custom" && this.system.id != "")
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
    const save = this.system.save;
    var dc = this.system.power_cost.active_rank + 10;

    this.system.save.effect = dc;
  }

  getAreaSaveDC() 
  {
    const save = this.system.area.save;
    var dc = this.system.power_cost.active_rank + 10;

    this.system.save.effect = dc;
  }

  getDamageDC() 
  {
    const save = this.system.damage;
    var dc = this.system.power_cost.active_rank + 15;

    if(this.system.values.value_one === true)
    {
      dc += this.actor.system.abilities.str.total;
    }

    const abl = CONFIG.MNM3E.abilities[save.resistance]?.label ?? "";
    this.labels.damage = game.i18n.format("MNM3E.SaveDamageDC", {dc: dc || "", ability: abl});
    this.system.damage.effect = dc;
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

  prepareTransformativeDataPowers()
  {
    if(this.system.power_effect == 'affliction')
    {
      this.system.save.resistance = this.system.values.value_five;
    }
  }

  clearValueAndUnique()
  {
    var updateData = {};
    updateData["system.values.value_one"] = "";
    updateData["system.values.value_two"] = "";
    updateData["system.values.value_three"] = "";
    updateData["system.values.value_four"] = "";
    updateData["system.values.value_five"] = "";

    updateData["system.values.value_array"] = [];

    updateData["system.unique.value_one"] = "";
    updateData["system.unique.value_two"] = "";
    updateData["system.unique.value_three"] = "";
    updateData["system.unique.value_four"] = "";
    updateData["system.unique.value_five"] = "";

    this.update(updateData);
  }

  prepareCostTotal(){
    const pcost = this.system.power_cost;

    if(!pcost.manual_purchase) this.calculateRanksNonManual();

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

  calculateRanksNonManual()
  {
    const pcost = this.system.power_cost;

    switch (this.system.power_effect) {
      case 'concealment':
        
        break;
      case 'enhancedtrait':
      case 'enhancedability':
        pcost.rank = this.system.values.value_array.reduce((accumulator, currentArray) => {
          var n = parseInt(currentArray[1]) || 0;
          return accumulator + n;
        }, 0);
        break;

      case 'enhancedextra':
        
        break;

      case 'enhancedadvantage':
        
        break;

      case 'illusion':
        
        break;

      default:
        break;
    }
  }

  addActiveEffects(){
    //if (!this.system.active) return;
    const effects = [];

    const aefs = Object.entries(this.effects)[4][1];

    //Clear remaining active effects if all elements in value array are deleted
    if(this.system.values.value_array.length == 0 && aefs.length != 0)
    {
      this.clearItemActiveEffects(aefs);
      return;
    }
    
    switch (this.system.power_effect) {
      case 'enhancedability':
      case 'enhancedtrait':
        const defenses = Object.keys(CONFIG.MNM3E.defenses);
        const skills = Object.keys(CONFIG.MNM3E.skills);

        this.system.values.value_array.forEach(element => {
          const name = element[0] != '' ? element[0] : 'str';
          var typeBonus = '';
          if(this.system.power_effect == 'enhancedability')
          {
            typeBonus = 'abilities';
          }
          else if (defenses.includes(name))
          {
            typeBonus = 'defenses';
          }
          else if (skills.includes(name))
          {
            typeBonus = 'skills';
          }

          const val = {
            key:`system.${typeBonus}.${name}.auto`,
            mode: 2,
            value: element[1] != '' ? element[1] : '0'
          };
          effects.push(val);
        });
       break;
      
      case 'growth':
        var rank = this.system.power_cost.active_rank;

        if(this.actor.system.abilities.sta.purchased < -5)
        {
          // If Absent
          const conbuff = {
            key:`system.defenses.toughness.auto`,
            mode: 2,
            value: rank
          };
          effects.push(conbuff);
        }
        else
        {
          const conbuff = {
            key:`system.abilities.sta.auto`,
            mode: 2,
            value: rank
          };
          effects.push(conbuff);
        }
        
        var growthbonus = [
        {
          key:`system.abilities.str.auto`,
          mode: 2,
          value: rank
        },
        {
          key:`system.skills.inm.auto`,
          mode: 2,
          value: Math.floor(rank/2)
        },
        {
          key:`system.speed.walk.rank`,
          mode: 2,
          value: Math.floor(rank/8)
        },
        {
          key:`system.skills.ste.auto`,
          mode: 2,
          value: `-${rank}`
        },
        {
          key:`system.skills.ste.auto`,
          mode: 2,
          value: `-${rank}`
        },
        {
          key:`system.defenses.dodge.auto`,
          mode: 2,
          value: `-${Math.floor(rank/2)}`
        },
        {
          key:`system.defenses.parry.auto`,
          mode: 2,
          value: `-${Math.floor(rank/2)}`
        }
        //FIXME: Mass +1 for each rank. Size +1 for each 4 ranks
        ];

        effects.push(growthbonus);
        break;

      case 'shrinking':
        var rank = this.system.power_cost.active_rank;

        var shrinkbonus = [
        {
          key:`system.skills.ste.auto`,
          mode: 2,
          value: rank
        },
        {
          key:`system.skills.inm.auto`,
          mode: 2,
          value: `-${Math.floor(rank/2)}`
        },
        {
          key:`system.defenses.dodge.auto`,
          mode: 2,
          value: Math.floor(rank/2)
        },
        {
          key:`system.defenses.parry.auto`,
          mode: 2,
          value: Math.floor(rank/2)
        },
        {
          key:`system.speed.walk.rank`,
          mode: 2,
          value: `-${Math.floor(rank/8)}`
        },
        {
          key:`system.abilities.str.auto`,
          mode: 2,
          value: `-${Math.floor(rank/4)}`
        }
        //FIXME: Size -1 for each 4 ranks
        ];
        effects.push(shrinkbonus);
        break;

      default:
        return;
    }

    if(aefs.length == 0)
    {
      this.createItemActiveEffects(effects);
    }
    else
    {
      this.updateItemActiveEffects(aefs, effects);
    }
  }
  
  createItemActiveEffects(effects)
  {
    this.createEmbeddedDocuments("ActiveEffect", [{
        name: this.name,
        icon: "icons/svg/aura.svg",
        origin: this.uuid,
        "duration.rounds": undefined,
        disabled: false,
        changes: effects
      }]);
  }

  async updateItemActiveEffects(list, effects)
  {
    const updates = [{
      _id: list[0]._id,
      changes: effects
    }];
    await this.updateEmbeddedDocuments("ActiveEffect", updates);
  }

  clearItemActiveEffects(list)
  {
    var updates = [];
    updates.push(list[0]._id);
    this.deleteEmbeddedDocuments("ActiveEffect", updates);
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

  /**
   * This is a vague solution for the small field above the description
   * which just has all data in short
   */
  prepareFinalDescription()
  {
    var combdesc = [];
    const conf = CONFIG.MNM3E;
    const data = this.system;

    if (data.power_effect == "" && data.power_effect == null) return;

    // switch (data.power_effect) {
    //   case value:
        
    //     break;
    
    //   default:
    //     break;
    // }
    
    // Area filler
    if(data.area.type != "" && data.area.type != null)
    {
      switch (data.area.type) {
        case 'areaburst':
        case 'areacloud':
          var rangeString = ScaleTable.GetScale(data.area.range, 'distancedisplay');
          var areasize = game.i18n.format("MNM3E.areaSphereDescription", {range: rangeString});
          combdesc.push(game.i18n.format("MNM3E.areaFullDescription", {type: conf.attackType[data.area.type], scale: areasize, dc: data.save.effect || "", ability: conf.defenses[data.save.resistance]}));
          break;

        case 'areacylinder':
          var rangeString = ScaleTable.GetScale(data.area.range, 'distancedisplay');
          var areasize = game.i18n.format("MNM3E.areaCylinderDescription", {range: rangeString});
          combdesc.push(game.i18n.format("MNM3E.areaFullDescription", {type: conf.attackType[data.area.type], scale: areasize, dc: data.save.effect || "", ability: conf.defenses[data.save.resistance]}));
          break;

        case 'areacone':
          var rangeString = ScaleTable.GetScale(data.area.range, 'distancedisplay');
          var areasize = game.i18n.format("MNM3E.areaConeDescription", {range: rangeString});
          combdesc.push(game.i18n.format("MNM3E.areaFullDescription", {type: conf.attackType[data.area.type], scale: areasize, dc: data.save.effect || "", ability: conf.defenses[data.save.resistance]}));
          break;

        case 'arealine':
          var rangeString = ScaleTable.GetScale(data.area.range, 'distancedisplay');
          var range2String = ScaleTable.GetScale(data.area.range2, 'distancedisplay');
          var areasize = game.i18n.format("MNM3E.areaLineDescription", {range: rangeString, range2: range2String});
          combdesc.push(game.i18n.format("MNM3E.areaFullDescription", {type: conf.attackType[data.area.type], scale: areasize, dc: data.save.effect || "", ability: conf.defenses[data.save.resistance]}));
          break;

        case 'areashapeable':
          var rangeString = ScaleTable.GetScale(data.area.range, 'massdisplay');
          var areasize = game.i18n.format("MNM3E.areaShapeableDescription", {range: rangeString});
          combdesc.push(game.i18n.format("MNM3E.areaFullDescription", {type: conf.attackType[data.area.type], scale: areasize, dc: data.save.effect || "", ability: conf.defenses[data.save.resistance]}));
          break;

        case 'areaperception':
          combdesc.push(game.i18n.format("MNM3E.areaPerceptionDescription", {dc: data.save.effect || "", ability: conf.defenses[data.save.resistance]}));
          break;
      }
    }
    else if(data.save.resistance != "" && data.save.resistance != "none")
    {
      combdesc.push(game.i18n.format("MNM3E.SaveDC", {dc: data.save.effect || "", ability: conf.defenses[data.save.resistance]}));
    }

    if(data.damage.resistance != "" && data.damage.resistance != "none")
    {
      combdesc.push(game.i18n.format("MNM3E.SaveDamageDC", {dc: data.damage.effect || "", ability: conf.defenses[data.damage.resistance]}));
    }



    this.system.combineddescription = combdesc.join(', ');
  }
}