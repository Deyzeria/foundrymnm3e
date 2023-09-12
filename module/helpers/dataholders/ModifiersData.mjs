const ExtrasGeneral = {
  accurate:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  affcorporeals:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  affinsubstantial:
  {
    cost: 1,
    maxranks: 2,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  affobjects:
  {
    cost: 0,
    maxranks: 1,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  affothers:
  {
    cost: 0,
    maxranks: 1,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  altresist:
  {
    cost: 0,
    maxranks: 1,
    manualpay: false,
    type: "extra",
    effect: false
  },
  area:
  {
    cost: 1,
    manualpay: true,
    type: "extra",
    effect: false
  },
  attack:
  {
    cost: 0,
    maxranks: 0,
    manualpay: false,
    type: "extra",
    effect: false
  },
  contagious:
  {
    cost: 1,
    manualpay: false,
    type: "extra",
    effect: false
  },
  dimensional:
  {
    cost: 1,
    maxranks: 3,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  extendedrange:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  feature:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  homing:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  incrduration:
  {
    cost: 1,
    manualpay: true,
    type: "extra",
    effect: false
  },
  incrmass:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  incrrange:
  {
    cost: 1,
    manualpay: true,
    type: "extra",
    effect: false
  },
  incurable:
  {
    cost: 1,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  indirect:
  {
    cost: 1,
    maxranks: 4,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  innate:
  {
    cost: 1,
    maxranks: 1,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  insidious:
  {
    cost: 1,
    maxranks: 1,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  linked:
  {
    cost: 0,
    maxranks: 0,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  multiattack:
  {
    cost: 1,
    manualpay: true,
    type: "extra",
    effect: false
  },
  penetrating:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  precise:
  {
    cost: 1,
    maxranks: 1,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  reach:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  reaction:
  {
    cost: 1,
    maxranks: 3,
    manualpay: false,
    type: "extra",
    effect: false
  },
  reversible:
  {
    cost: 1,
    maxranks: 1,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  ricochet:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  secondeffect:
  {
    cost: 1,
    manualpay: false,
    type: "extra",
    effect: false
  },
  selective:
  {
    cost: 1,
    manualpay: false,
    type: "extra",
    effect: false
  },
  sleep:
  {
    cost: 0,
    maxranks: 0,
    manualpay: false,
    type: "extra",
    effect: false
  },
  split:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  subtle:
  {
    cost: 1,
    maxranks: 2,
    manualpay: false,
    type: "extraflat",
    effect: false
  },
  sustained:
  {
    cost: 0,
    maxranks: 0,
    manualpay: false,
    type: "extra",
    effect: false
  },
  triggered:
  {
    cost: 1,
    manualpay: true,
    type: "extraflat",
    effect: false
  },
  vardescriptor:
  {
    cost: 1,
    maxranks: 2,
    manualpay: false,
    type: "extraflat",
    effect: false
  }
}

const FlawsGeneral = {

}

/**
 * 
 * @param {string} power_type 
 * @returns {Object} 
 */
export default function GetAllExtrasFlaws(power_type) {
  var returnextras = new Object;


  var defaultMods = {
    ...ExtrasGeneral,
    ...FlawsGeneral
  }

  return returnextras;
}

CustomExtrasFlaws()
{
  var customExFl = game.settings.get("foundrymnm3e", "customexfl");
  /*
    customExFl = [
      {
        id: 'accurate',
        name: 'Accurate',
        manual_pay: false
        type: ['','','',''] 'extraflat',
        cost: 0,
        maxranks: 0,
        effect: false
      }
    ]
  */
  customExFl.forEach(element => {
    var toAdd = {
      type: element.type ?? 'extra',
      cost: element.cost ?? 0,
      manual_pay: element.manual_pay ?? false,
      maxranks: element.maxranks ?? null,
      effect: element.effect == '' ? false : element.effect
    };

    const label = element.name == '' ? element.name.charAt(0).ToUpperCase() + element.name.slice(1) : element.name;

    const conf = CONFIG.MNM3E;

    if (element.type == 'extra' || element.type == 'extraflat') {
      toAdd.label = label;
      ExtrasGeneral[element.id] = toAdd;
      conf.ExtrasGeneral[element.id] = label;
    }
    else {
      toAdd.label = label;
      FlawsGeneral[element.id] = toAdd;
      conf.FlawsGeneral[element.id] = label;
    }
  });
}