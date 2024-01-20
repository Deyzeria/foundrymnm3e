export async function ParserAccess(xmlfile) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlfile, 'text/xml');
  console.debug(xmlDoc);
  const parsed = xmlToJson(xmlDoc);
  var actorJson = await GenerateActor(parsed, "hero");
  console.debug(actorJson);
  console.debug(parsed);

  actorJson = PopulateActorData(actorJson, parsed);
  // var powList = PopulateActorPowers(parsed);
  var advlist = GenerateActorAdvantages(parsed.document.public.character.advantages.advantage);

  var act = await Actor.create(actorJson);

  PopulateActorItems(act, advlist);
  // Activate functions which populate actor with items!
}

/**
 * @param {XMLDocument} xml 
 * @returns {import("./hero-lab-documentation.mjs").hlparsed}
 */
function xmlToJson(xml) {
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj[attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj["text"] = xml.nodeValue.trim();
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof (obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

async function GenerateActor(dataActor, actorType) {
  return new Actor({ name: dataActor.document.public.character.name, type: actorType }).toObject()
}

/** Populates base actor data, abilities, defenses, skills, visuals, role 
 * @param {import("../../documentation/actor-documentation.mjs").actorData} actorStub 
 * @param {import("./hero-lab-documentation.mjs").hlparsed} dataActor 
 * @returns 
 */
function PopulateActorData(actorStub, dataActor) {
  const dataBase = dataActor.document.public.character;

  // ----ABILITIES----
  const actorStubAbilitiesList = ['str', 'sta', 'agl', 'dex', 'fgt', 'int', 'awe', 'pre'];
  for (var i = 0; i < actorStubAbilitiesList.length; i++) {
    actorStub.system.abilities[actorStubAbilitiesList[i]].purchased = parseInt(dataBase.attributes.attribute[i].base);
  }

  // ----DEFENCES----
  const actorStubDefensesList = ['dodge', 'parry', 'fortitude', 'toughness', 'will']
  for (var i = 0; i < actorStubDefensesList.length; i++) {
    actorStub.system.defenses[actorStubDefensesList[i]].purchased = parseInt(dataBase.defenses.defense[i].cost.value);
  }

  // ----SKILLS----
  const skillsList = dataBase.skills.skill;
  const actorStubSkillList = ['acr', 'ath', 'dec', 'inm', 'ins', 'inv', 'prc', 'prs', 'soh', 'ste', 'tec', 'tre', 'veh'];
  for (var i = 0; i < actorStubSkillList.length; i++) {
    var tempValue = skillsList[GetSkill(skillsList, i)].base;
    tempValue = (tempValue === "-") ? 0 : parseInt(tempValue);
    actorStub.system.skills[actorStubSkillList[i]].purchased = tempValue;
  }

  // Rewrite this completely one day to implement infinite skills? Copy from PF2e or PF1e or something. 
  var comb = ['clc1', 'clc2', 'rng1', 'rng2'];
  var numb = [0, 2]
  var namb = ['Close Combat: ', 'Ranged Combat: '];
  var namr = ['CC: ', 'RC: '];
  for (var i = 0; i < numb.length; i++) {
    var skillArray = GetMultipleSkills(skillsList, numb[i]);
    for (var y = 0; y < skillArray.length; y++) {
      var tempValue = skillsList[skillArray[y]].base;
      tempValue = (tempValue === "-") ? 0 : parseInt(tempValue);
      actorStub.system.skills[comb[y + numb[i]]].purchased = tempValue;

      if (skillsList[skillArray[y]].name !== "") {
        var skillName = skillsList[skillArray[y]].name;
        actorStub.system.skills[comb[y + numb[i]]].subtype = skillName.replace(namb[i], namr[i]);
      }
    }
  }

  comb = ['exp1', 'exp2', 'exp3', 'exp4', 'exp5'];
  var skillArray = GetMultipleSkills(skillsList, 1);

  for (var i = 0; i < skillArray.length; i++) {
    var tempValue = skillsList[skillArray[i]].base;
    tempValue = (tempValue === "-") ? 0 : parseInt(tempValue);
    actorStub.system.skills[comb[i]].purchased = tempValue;

    const variant = skillsList[skillArray[i]].name.split(":")[0].trim();
    switch (variant) {
      case "Expertise (AGL)":
        console.log("Matched Expertise (AGL)");
        actorStub.system.skills[comb[i]].ability = "agl";
        break;
      case "Expertise (AWE)":
        console.log("Matched Expertise (AWE)");
        actorStub.system.skills[comb[i]].ability = "awe";
        break;
      case "Expertise (DEX)":
        console.log("Matched Expertise (DEX)");
        actorStub.system.skills[comb[i]].ability = "dex";
        break;
      case "Expertise (FGT)":
        console.log("Matched Expertise (FGT)");
        actorStub.system.skills[comb[i]].ability = "fgt";
        break;
      case "Expertise (PRE)":
        console.log("Matched Expertise (PRE)");
        actorStub.system.skills[comb[i]].ability = "pre";
        break;
      case "Expertise (STA)":
        console.log("Matched Expertise (STA)");
        actorStub.system.skills[comb[i]].ability = "sta";
        break;
      case "Expertise (STR)":
        console.log("Matched Expertise (STR)");
        actorStub.system.skills[comb[i]].ability = "str";
        break;
      case "Expertise":
        console.log("Matched default Expertise, remains INT");
        break;
      default:
        console.warn(variant, " does not exist as a valid Expertise")
        break;
    }
    var skillName = skillsList[skillArray[i]].name;
    actorStub.system.skills[comb[i]].subtype = skillName.replace(variant, "EX")
  }

  // ----GENERIC----
  actorStub.system.generic.pl = parseInt(dataBase.powerlevel.value);

  // Should be removed and moved.
  var extrapp = parseInt(dataBase.powerpoints.value) - parseInt(dataBase.resources.startingpp);
  actorStub.system.generic.extrapp = extrapp;

  var disposition = 0;
  switch (dataActor.document.public.character.relationship) {
    case 'ally':
      disposition = 1;
      break;
    case 'enemy':
      disposition = -1;
      break;
    case 'neutral':
      disposition = 0;
      break;
    default:
      break
  }
  actorStub.prototypeToken.disposition = disposition;

  // ----DETAILS----
  var details = actorStub.system.details.civilian_identity;
  details.age = parseInt(dataBase.personal.age);
  details.hair = dataBase.personal.hair;
  details.eyes = dataBase.personal.eyes;
  details.height = dataBase.personal.charheight.text; // Maybe to change. There is value, which you int(value/12) for feet and (value%12) for inches.
  details.weight = parseInt(dataBase.personal.charweight.value);
  details.gender = dataBase.personal.gender;
  details.name = dataBase.name;

  // = parseInt(dataBase.);
  return actorStub;
}

function GetSkill(skillsList, skillIndex) {
  const skillNames = [
    'Acrobatics',
    'Athletics',
    'Deception',
    'Insight',
    'Intimidation',
    'Investigation',
    'Perception',
    'Persuasion',
    'Sleight of Hand',
    'Stealth',
    'Technology',
    'Treatment',
    'Vehicles'
  ];

  const matchingIndexes = skillsList.map(e => e.name).indexOf(skillNames[skillIndex])

  return matchingIndexes;
}

function GetMultipleSkills(skillsList, skillIndex) {
  const skillNames = [
    'Close Combat',
    'Expertise',
    'Ranged Combat'
  ];

  const matchingIndexes = skillsList
    .map((e, index) => ({ name: e.name, index })) // Map objects to include both name and index
    .filter(obj => obj.name.includes(skillNames[skillIndex])) // Filter objects with names containing the keyword
    .map(obj => obj.index); // Extract the indexes

  return matchingIndexes;
}

// ....###....########..##.....##....###....##....##.########....###.....######...########..######.
// ...##.##...##.....##.##.....##...##.##...###...##....##......##.##...##....##..##.......##....##
// ..##...##..##.....##.##.....##..##...##..####..##....##.....##...##..##........##.......##......
// .##.....##.##.....##.##.....##.##.....##.##.##.##....##....##.....##.##...####.######....######.
// .#########.##.....##..##...##..#########.##..####....##....#########.##....##..##.............##
// .##.....##.##.....##...##.##...##.....##.##...###....##....##.....##.##....##..##.......##....##
// .##.....##.########.....###....##.....##.##....##....##....##.....##..######...########..######.

/**
 * Initial call to generate a list of advantages to populate
 * @param {import("./hero-lab-documentation.mjs").hladvantage[]|import("./hero-lab-documentation.mjs").hladvantage} advsunchecked 
 */
function GenerateActorAdvantages(advsunchecked) {
  const advantagelist = CONFIG.MNM3E.AdvantageEnum;
  /** @type {import("./hero-lab-documentation.mjs").hladvantage[]} */
  var advs = [];
  var returnarr = [];

  if (Array.isArray(advs)) {
    advs = advsunchecked;
  }
  else {
    advs.add(advsunchecked);
  }

  for (let index = 0; index < advs.length; index++) {
    const element = advs[index];
    if (element.useradded == undefined || element.useradded == "yes") {
      var response = GetAdvantageSpecificName(element.name);
      if (response != null) {
        var toAddArray = {
          name: advantagelist[response[0]],
          type: 'advantage',
          system: {
            id: response[0],
            ranks: Number.parseInt(element.cost.value),
            additionalDesc: response[1] ?? response[2] ?? '',
          }
        }

        returnarr.push(toAddArray);
      }
    }
  }
  return returnarr;
}

/**
 * @param {string} advantage
 * @returns {string[]} Type, Additional Desc, Choice Desc
 */
function GetAdvantageSpecificName(advantage) {
  const adConfArray = Object.values(CONFIG.MNM3E.AdvantageEnum);
  const adConf = Object.keys(CONFIG.MNM3E.AdvantageEnum);

  var additionalDesc = "";
  var choiceDesc = "";

  const pattern = /\s+\d+$/;
  advantage = advantage.replace(pattern, '');
  var id = adConfArray.findIndex((adv) => adv == advantage);

  if (id == -1) {
    let response = UniqueAdvantage(advantage);
    id = response[0];
    additionalDesc = response[1];
    choiceDesc = response[2];
    if (id == -1) {
      console.warn("Didn't find ", advantage);
      return null;
    }
  }

  var type = adConf[id];
  return [type, additionalDesc, choiceDesc];
}

/**
 * @param {string} val 
 * @returns {Array}
 */
function UniqueAdvantage(val) {
  let pattern = /\w+/g;
  let words = val.match(pattern);
  let id = -1;
  let additionalDesc = "";
  let choiceDesc = null;

  if (words[0] == 'Benefit') {
    switch (words[1]) {
      // FIXME: Check other Benefits for working!
      case 'Security':
        id = FindAdvantageId('Benefit, Security Clearance');
        additionalDesc = val.split(': ')[1];
        break;

      case 'Status':
        id = FindAdvantageId('Benefit, Status');
        additionalDesc = val.split(': ')[1];
        break;

      case 'Wealth':
        id = FindAdvantageId('Benefit, Wealth');
        additionalDesc = val.split(': ')[1];
        break;
      default:

        break;
    }
  }
  // Just Daze and Fascinate, adding their respective chosen Skills
  else if (words[0] == 'Daze' || words[0] == 'Fascinate') {
    id = FindAdvantageId(words[0]);
    pattern = /\((.+)\)/;
    // FIXME: Choice of specific Expertise and potentially other skills.
    // Yes, I do know that you could use words[1], but this was implemented for theoretical usage of Sleight of hand or other multiword ones
    choiceDesc = val.match(pattern)[1].split(':')[0];
  }
  else {
    id = FindAdvantageId(words[0]);

    // FIXME: Descriptions
    if (id == -1) {
      id = FindAdvantageId(words[0] + " " + words[1]);
    }
  }

  return [id, additionalDesc, choiceDesc];
}

/**
 * @param {string} val Name of the power
 * @returns {number} id or -1
 */
function FindAdvantageId(val) {
  const adConfArray = Object.values(CONFIG.MNM3E.AdvantageEnum);

  const pattern = /\s+\d+$/;
  val = val.replace(pattern, '');
  var id = adConfArray.findIndex((adv) => adv == val);
  return id;
}

function FindAdvantageType(id) {
  const adConf = Object.keys(CONFIG.MNM3E.AdvantageEnum);
  return adConf[id];
}

// .########...#######..##......##.########.########...######.
// .##.....##.##.....##.##..##..##.##.......##.....##.##....##
// .##.....##.##.....##.##..##..##.##.......##.....##.##......
// .########..##.....##.##..##..##.######...########...######.
// .##........##.....##.##..##..##.##.......##...##.........##
// .##........##.....##.##..##..##.##.......##....##..##....##
// .##.........#######...###..###..########.##.....##..######.

/** POWERS
 * @param {import("./hero-lab-documentation.mjs").hlparsed} dataActor 
 * @returns 
 */
function PopulateActorPowers(dataActor) {
  const powersList = dataActor.document.public.character.powers.power;
  var powerListToAdd = [];
  var powersInArrays = [];

  const powerConf = Object.keys(CONFIG.MNM3E.defaultPowerEffects);

  var powToAnalyseCustom = [];
  console.debug(powersList);

  for (var i = 0; i < powersList.length; i++) {
    let val = powersList[i];
    if (val.otherpowers !== undefined) {
      var id = FindPowerId(val);

      if (id == -1) {
        powToAnalyseCustom.push(val);
        continue;
      }

      var powername = removeAfterLastColon(val.name);
      var cadv = [];
      if (val.chainedadvantages != {} && val.chainedadvantages != undefined) {
        if (Array.isArray(val.chainedadvantages.chainedadvantage)) {
          // val.chainedadvantages.chainedadvantage.forEach(element => {
          //   var id = FindAdvantageId(element.name);
          //   if (id == -1) {
          //     //let response = UniqueAdvantage(id)
          //     console.warn("Unknown Chained Advantage ", element);
          //   }
          //   else {
          //     cadv.push(FindAdvantageType(id));
          //   }
          // });
        }
        else {

        }
      }
      powerListToAdd.push({
        type: powerConf[id],
        name: powername,
        descriptors: val.descriptors,
        ranks: Number.parseInt(val.ranks),

        extras: FindExtrasFlaws(val.extras?.extra ?? []),
        flaws: FindExtrasFlaws(val.flaws?.flaw ?? []),
        options: val.options?.option ?? [],
        traitoptions: val.traitmods?.traitmod ?? "", //FIXME: Should actually assign to correct names
        chainedadvantages: cadv
      });
    }
    else {
      powersInArrays.push(buildArray(val));
    }
  }

  console.debug("Powers Sorted: ", powerListToAdd);
  console.debug("Powers Separate Arrays: ", powersInArrays);
  console.debug("Unknown: ", powToAnalyseCustom);
}

function FindPowerId(val) {
  const powerConfArray = Object.values(CONFIG.MNM3E.defaultPowerEffects);

  const pattern = /:\s+([\w\s]+)\s+\d+$/;
  var matches = val.name.match(pattern);
  if (matches && matches.length >= 2) {
    var type = matches[1];
  }
  else {
    console.warn("Didn't find power type!", val);
    return;
  }

  var id = powerConfArray.findIndex((pow) => pow == type);

  if (id == -1) {
    const words = matches[1].match(/\w+/g);
    words.forEach(element => {
      id = powerConfArray.findIndex((pow) => pow == element);
      if (id > -1) return id;
    });
    return -1;
  }

  return id;
}

/**
 * @param {Array<Object>|Object} list 
 * @returns 
 */
function FindExtrasFlaws(list) {
  let nameList = Object.values(CONFIG.MNM3E.ExtrasFlawsAll);
  let keyList = Object.keys(CONFIG.MNM3E.ExtrasFlawsAll);

  var responselist = [];
  if (typeof list == 'object') {
    var id = nameList.findIndex((exfl) => exfl == list.name);
    responselist.push(keyList[id]);
  }
  else {
    for (var i = 0; i < list.length; i++) {
      var id = nameList.findIndex((exfl) => exfl == list[i].name);
      responselist.push(keyList[id]);
    }
  }
  return responselist;
}

function GetArrayType(powersList) {
  var description = powersList.description;
  var summary = powersList.summary;
  var response = {
    type: "multiple",
    removable: 0,
    indestructible: false
  }

  // if (description.startsWith("An array is a set of powers"))
  // {
  //     response.type = "array";

  //     if (summary.startsWith("Removable"))
  //     {
  //         response.removable = 1;
  //     }
  //     else if (summary.startsWith("Easily Removable"))
  //     {
  //         response.removable = 2;
  //     }

  //     if(summary.includes("(indestructible)"))
  //     {
  //         response.indestructible = true;
  //     }
  // }
  // else if (description.startsWith("Select this power to add multiple effects as a single power"))
  // {
  //     response.type = "multiple"
  // }
  // else if (description.startsWith("A device has one or more"))
  // {
  //     response.type = "device"
  //     response.removable = 1;
  //     if (summary.startsWith("Easily Removable"))
  //     {
  //         response.removable = 2;
  //     }
  //     if(summary.includes("(indestructible)"))
  //     {
  //         response.indestructible = true;
  //     }
  // }
  // else if (description.startsWith("Select this power to add multiple effects that are all activated"))
  // {
  //     response.type = "linked";
  // }

  return response;
}

function buildArray(datatable) {
  var powersList = [];
  if (Array.isArray(datatable.otherpowers.power)) {
    powersList = datatable.otherpowers.power;
  }
  else {
    powersList.push(datatable.otherpowers.power);
  }

  var powerListToReturn = [];
  const powerConf = Object.keys(CONFIG.MNM3E.defaultPowerEffects);

  var arrayTypeData = GetArrayType(datatable);

  powerListToReturn.push({
    arrayname: datatable.name,
    arraytype: arrayTypeData.type,
    removable: arrayTypeData.removable,
    indestructible: arrayTypeData.indestructible
  });

  for (var i = 0; i < powersList.length; i++) {
    const val = powersList[i];
    var id = FindPowerId(val);
    if (id == -1) {
      console.warn("Custom Power!");
      return null;
    }

    var powername = removeAfterLastColon(val.name);
    powerListToReturn.push({
      type: powerConf[id],
      name: powername,
      descriptors: val.descriptors,
      ranks: Number.parseInt(val.ranks),

      extras: FindExtrasFlaws(val.extras?.extra ?? []),
      flaws: FindExtrasFlaws(val.flaws?.flaw ?? []),
      options: val.options?.option ?? [],
      traitoptions: val.traitmods?.traitmod ?? "",
      chainedadvantages: val.chainedadvantages?.chainedadvantage ?? ""
    });
  }

  return powerListToReturn;
}

function removeAfterLastColon(inputString) {
  const lastSemicolonIndex = inputString.lastIndexOf(':');

  if (lastSemicolonIndex !== -1) {
    return inputString.substring(0, lastSemicolonIndex);
  } else {
    return inputString; // No semicolon found, return the original string
  }
}

/**
 * 
 * @param {import("../../documentation/actor-documentation.mjs").actorData} Actor 
 * @param {{name: string, type: string, system: {id: string, ranks: number, additionalDesc: string}}[]} AdvantageList 
 * @returns 
 */
async function PopulateActorItems(Actor, AdvantageList) {
  for (let i = 0; i < AdvantageList.length; i++) {
    const element = AdvantageList[i];
    await Actor.createEmbeddedDocuments("Item", [element]);
    // Need to figure out how to run a function on them.
  }

  for (let a = 0; a < Actor.itemTypes.advantage.length; a++) {
    Actor.itemTypes.advantage[a].prepareAdvantage();
    Actor.itemTypes.advantage[a].setAdvantageItemName();
  }
}