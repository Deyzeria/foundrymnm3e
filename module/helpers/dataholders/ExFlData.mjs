const ExtrasGeneral = {
  accurate: { 
    cost: 1,
    type: 'extraflat',
    effect: true
  },
  affcorporeals: { 
    cost: 1,
    type: 'extraflat',
    effect: false
  },
  affinsubstantial: { 
    cost: 1,
    maxranks: 2,
    type: 'extraflat',
    effect: false
  },
  affobjects: { 
    cost: 0,
    maxranks: 1,
    type: 'extra',
    effect: false
  },
  affothers: { 
    cost: 0,
    maxranks: 1,
    type: 'extra',
    effect: false
  },
  altresist: { 
    cost: 0,
    maxranks: 1,
    type: 'extra',
    effect: true
  },
  area: { 

  },
  attack: { 

  },
  contagious: { 

  },
  dimensional: { 

  },
  extendedrange: { 

  },
  feature: { 

  },
  homing: { 

  },
  incrduration: { 

  },
  incrmass: { 

  },
  incrrange: { 

  },
  incurable: { 

  },
  indirect: { 

  },
  innate: { 

  },
  insidious: { 

  },
  linked: { 

  },
  multiattack: { 

  },
  penetrating: { 

  },
  precise: { 

  },
  reach: { 

  },
  reaction: { 

  },
  reversible: { 

  },
  ricochet: { 

  },
  secondeffect: { 

  },
  selective: { 

  },
  sleep: { 

  },
  split: { 

  },
  subtle: { 

  },
  sustained: { 

  },
  triggered: { 

  },
  vardescriptor: { 

  }
}

const FlawsGeneral= {

}

export default function GetAllExtrasFlaws(power_type) {
  var returnextras = [];

  returnextras.push(ExtrasGeneral)

  return returnextras;
}