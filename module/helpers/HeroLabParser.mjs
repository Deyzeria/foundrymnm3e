import { xml2json } from "xml-js";

export async function ParserAccess(){
    // ---REMOVE---
    const manualSwitch = true;
    const generateActor = false;
    if(manualSwitch){

    var requestURL = "https://raw.githubusercontent.com/Sinantrarion/foundrymnm3e/main/module/helpers/charactertest.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const dataActor = await response.json();

    console.debug("dataActor: ", dataActor);
    var actorJson = await GenerateActor(dataActor, "hero");
    
    actorJson = PopulateActorData(actorJson, dataActor);
    PopulateActorAdvantages(actorJson, dataActor);
    PopulateActorPowers(actorJson, dataActor);
    //console.debug(actorJson); 
    if (!generateActor) return;
    await Actor.create(actorJson);
    }
}

// xml file should be passed here.
async function PassedData(xmlfile)
{
    const jsonfile = xml2json(xmlfile, { spaces: 2, compact: true });
    console.debug("acquired data", jsonfile);
}

async function GenerateActor(dataActor, actorType){
    return new Actor({name: dataActor.document.public.character._name, type:actorType}).toObject()
}

function PopulateActorData(actorStub, dataActor){
    const dataBase = dataActor.document.public.character;

    // ----ABILITIES----
    const actorStubAbilitiesList = ['str', 'sta', 'agl', 'dex', 'fgt', 'int', 'awe', 'pre'];
    for (var i = 0; i < actorStubAbilitiesList.length; i++)
    {
        actorStub.system.abilities[actorStubAbilitiesList[i]].purchased = parseInt(dataBase.attributes.attribute[i]._base);
    }

    // ----DEFENCES----
    const actorStubDefensesList = ['dodge', 'parry', 'fortitude', 'toughness', 'will']
    for (var i = 0; i < actorStubDefensesList.length; i++)
    {
        actorStub.system.defenses[actorStubDefensesList[i]].purchased = parseInt(dataBase.defenses.defense[i].cost._value);
        actorStub.system.defenses[actorStubDefensesList[i]].impervious = parseInt(dataBase.defenses.defense[i]._impervious);
    }
    
    // ----SKILLS----
    const skillsList = dataBase.skills.skill;
    const actorStubSkillList = ['acr', 'ath', 'dec', 'inm', 'ins', 'inv', 'prc', 'prs', 'soh', 'ste', 'tec', 'tre', 'veh'];
    for (var i = 0; i < actorStubSkillList.length; i++)
    {
        var tempValue = skillsList[GetSkill(skillsList, i)]._base;
        tempValue = (tempValue === "-") ? 0 : parseInt(tempValue);
        actorStub.system.skills[actorStubSkillList[i]].purchased = tempValue;
    }

    // Rewrite this completely one day to implement infinite skills? Copy from PF2e or PF1e or something. 
    var comb = ['clc1', 'clc2', 'rng1', 'rng2'];
    var numb = [0, 2]
    var namb = ['Close Combat: ', 'Ranged Combat: '];
    var namr = ['CC: ', 'RC: '];
    for (var i = 0; i < numb.length; i++)
    {
        var skillArray = GetMultipleSkills(skillsList, numb[i]);
        for (var y = 0; y < skillArray.length; y++)
        {
            var tempValue = skillsList[skillArray[y]]._base;
            tempValue = (tempValue === "-") ? 0 : parseInt(tempValue);
            actorStub.system.skills[comb[y+numb[i]]].purchased = tempValue;

            if(skillsList[skillArray[y]]._name !== ""){
                var skillName = skillsList[skillArray[y]]._name;
                actorStub.system.skills[comb[y+numb[i]]].subtype = skillName.replace(namb[i], namr[i]);
            }
        }
    }

    comb = ['exp1', 'exp2', 'exp3', 'exp4', 'exp5'];
    var skillArray = GetMultipleSkills(skillsList, 1);
    for (var i = 0; i < skillArray.length; i++)
    {
        var tempValue = skillsList[skillArray[i]]._base;
        tempValue = (tempValue === "-") ? 0 : parseInt(tempValue);
        actorStub.system.skills[comb[i]].purchased = tempValue;

        const variant = skillsList[skillArray[i]]._name.split(":")[0].trim(); 
        switch(variant) {
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
        var skillName = skillsList[skillArray[i]]._name;
        actorStub.system.skills[comb[i]].subtype = skillName.replace(variant, "EX")
    }

    // ----GENERIC----
    actorStub.system.generic.pl = parseInt(dataBase.powerlevel._value);

    // Should be removed and moved.
    var extrapp = parseInt(dataBase.powerpoints._value) - parseInt(dataBase.resources._startingpp);
    actorStub.system.generic.extrapp = extrapp;

    var disposition = 0;
    switch(dataActor.document.public.character._relationship) {
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
    actorStub.system.age = parseInt(dataBase.personal._age);
    actorStub.system.hair = dataBase.personal._hair;
    actorStub.system.eyes = dataBase.personal._eyes;
    actorStub.system.height = dataBase.personal.charheight._text; // Maybe to change. There is _value, which you int(_value/12) for feet and (_value%12) for inches.
    actorStub.system.weight = parseInt(dataBase.personal.charweight._value); 
    actorStub.system.gender = dataBase.personal._gender;
    actorStub.system.heroname = dataActor.document.public.character._name;

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

    const matchingIndexes = skillsList.map(e=>e._name).indexOf(skillNames[skillIndex])

    return matchingIndexes;
}

function GetMultipleSkills(skillsList, skillIndex) {
    const skillNames = [
        'Close Combat',
        'Expertise',
        'Ranged Combat'
    ];

    const matchingIndexes = skillsList
        .map((e, index) => ({ _name: e._name, index })) // Map objects to include both name and index
        .filter(obj => obj._name.includes(skillNames[skillIndex])) // Filter objects with names containing the keyword
        .map(obj => obj.index); // Extract the indexes

    return matchingIndexes;
}


//-------------------------//
//-------------------------//
//-------ADVANTAGES--------//
//-------------------------//
//-------------------------//
function PopulateActorAdvantages(actorStub, dataActor)
{
    const advantageList = dataActor.document.public.character.advantages.advantage;
    var advListToAdd = [];
    var advToAnalyseCustom = [];
    for (var i=0; i < advantageList.length; i++)
    {
        const val = advantageList[i];
        if (val._useradded == undefined || val._useradded == "yes")
        {
            var id = FindAdvantageId(val);
            if (id == -1)
            {
                advToAnalyseCustom.push(val);
                continue;
            }
            advListToAdd.push({type: FindAdvantageType(id), rank: Number.parseInt(val.cost._value)});
        }
    }
    console.debug("Advantages Sorted: ", advListToAdd);
    console.debug("Advantages Unsorted: ", advToAnalyseCustom);

    const advantagelist = CONFIG.MNM3E.AdvantageEnum;
    advListToAdd.forEach(element => {
        const itemData = {
            name: advantagelist[element.type],
            type: 'advantage',
            system: foundry.utils.expandObject({ ...header.dataset })
        }
        delete itemData.system.type;
        //itemData.system.id = element.type;
        //itemData.system.ranks = element.rank;
        console.debug("PopulateActorAdvantages: ", itemData);
        //actorStub.createEmbeddedDocuments("Item", [itemData]);
        console.debug("PopulateActorAdvantages actorStub: ", actorStub);
    });
}

function FindAdvantageId(val)
{
    const adConfArray = Object.values(CONFIG.MNM3E.AdvantageEnum);

    var name = val._name;
    const pattern = /\s+\d+$/;
    name = name.replace(pattern, '');
    var id = adConfArray.findIndex((adv) => adv == name);
    return id;
}

function FindAdvantageType(id)
{
    const adConf = Object.keys(CONFIG.MNM3E.AdvantageEnum);
    return adConf[id];
}


//-------------------------//
//-------------------------//
//---------POWERS----------//
//-------------------------//
//-------------------------//
function PopulateActorPowers(actorStub, dataActor)
{
    const powersList = dataActor.document.public.character.powers.power;
    var powerListToAdd = [];
    var powersInArrays = [];

    const powerConf = Object.keys(CONFIG.MNM3E.defaultPowerEffects);

    var powToAnalyseCustom = [];

    for (var i=0; i < powersList.length; i++)
    {
        const val = powersList[i];
        if(val.otherpowers == undefined)
        {
            var id = FindPowerId(val);

            if (id == -1) 
            {
                powToAnalyseCustom.push(val);
                continue;
            }
    
            var powername = removeAfterLastColon(val._name);
            var cadv = [];
            if(val.chainedadvantages != undefined)
            {
                console.debug(val.chainedadvantages);
                if (Array.isArray(val.chainedadvantages.chainedadvantage))
                {
                    val.chainedadvantages.chainedadvantage.forEach(element => {
                    var id = FindAdvantageId(element);
                    if (id == -1)
                    {
                        console.warn("Unknown Chained Advantage ", element);
                    }
                    else
                    {
                        cadv.push(FindAdvantageType(id));
                    }
                    });
                }
                else
                {

                }
            }
            powerListToAdd.push({
                type: powerConf[id],
                name: powername,
                descriptors: val.descriptors,
                ranks: Number.parseInt(val._ranks),
    
                extras: FindExtrasFlaws(val.extras.extra, true), //FIXME: Should actually assign correct values
                flaws: FindExtrasFlaws(val.flaws.flaw, false), //FIXME: Should actually assign correct values
                options: val.options?.option ?? [],
                traitoptions: val.traitmods?.traitmod ?? "", //FIXME: Should actually assign to correct names
                chainedadvantages: cadv
            });
        }
        else
        {
            powersInArrays.push(buildArray(val));
        }
    }

    console.debug("Powers Sorted: ", powerListToAdd);
    console.debug("Powers Separate Arrays: ", powersInArrays);
    console.debug("Unknown: ", powToAnalyseCustom);

    advListToAdd.forEach(element => {
        var itemData = {
            name: element.name,
            type: 'power',
            system: foundry.utils.expandObject({ ...header.dataset })
        }
        delete itemData.system.type;
        //itemData.system.power_effect = element.type;
        //itemData.system.power_cost.rank = element.ranks;
        console.debug("PopulateActorPowers: ", itemData);
        //console.debug("PopulateActorPowers actorStub: ", actorStub);
        //actorStub.createEmbeddedDocuments("Item", [itemData]);
    });
}

function FindPowerId(val)
{
    const powerConfArray = Object.values(CONFIG.MNM3E.defaultPowerEffects);

    const pattern = /:\s+([\w\s]+)\s+\d+$/;
    var matches = val._name.match(pattern);
    if (matches && matches.length >= 2) 
    {
        var type = matches[1];
    } 
    else 
    {
        console.warn("Didn't find power type!");
        return;
    }

    var id = powerConfArray.findIndex((pow) => pow == type);

    if(id == -1)
    {
        const words = matches[1].match(/\w+/g);
        words.forEach(element => {
            id = powerConfArray.findIndex((pow) => pow == element);
            if(id > -1) return id;
        });
        return -1;
    }

    return id;
}

// FIXME:
function FindExtrasFlaws(list, type)
{
    var datalist;
    if(type)
    {
        datalist = Object.values(CONFIG.MNM3E.ExtrasAll);
    }
    else
    {
        datalist = Object.values(CONFIG.MNM3E.FlawsAll);
    }
    
    var responselist = [];
    for (var i=0; i < list.length; i++)
    {
        const val = list[i];
        var id = datalist.findIndex((exfl) => exfl == val._name);
        responselist.push(datalist[id]);
    }
    return responselist;
}

function GetArrayType(powersList)
{
    var description = powersList.description;
    var summary = powersList._summary;
    var response = {
        type: "multiple",
        removable: 0,
        indestructible: false
    }

    if (description.startsWith("An array is a set of powers"))
    {
        response.type = "array";

        if (summary.startsWith("Removable"))
        {
            response.removable = 1;
        }
        else if (summary.startsWith("Easily Removable"))
        {
            response.removable = 2;
        }

        if(summary.includes("(indestructible)"))
        {
            response.indestructible = true;
        }
    }
    else if (description.startsWith("Select this power to add multiple effects as a single power"))
    {
        response.type = "multiple"
    }
    else if (description.startsWith("A device has one or more"))
    {
        response.type = "device"
        response.removable = 1;
        if (summary.startsWith("Easily Removable"))
        {
            response.removable = 2;
        }
        if(summary.includes("(indestructible)"))
        {
            response.indestructible = true;
        }
    }
    else if (description.startsWith("Select this power to add multiple effects that are all activated"))
    {
        response.type = "linked";
    }

    return response;
}

function buildArray(datatable)
{
    var powersList = datatable.otherpowers.power;
    var powerListToReturn = [];
    const powerConf = Object.keys(CONFIG.MNM3E.defaultPowerEffects);

    var arrayTypeData = GetArrayType(datatable);

    powerListToReturn.push({
        arrayname: datatable._name,
        arraytype: arrayTypeData.type,
        removable: arrayTypeData.removable,
        indestructible: arrayTypeData.indestructible
    });

    for (var i=0; i < powersList.length; i++)
    {
        const val = powersList[i];
        var id = FindPowerId(val);
        if (id == -1) 
        {
            console.warn("Custom Power!");
            return null;
        }

        var powername = removeAfterLastColon(val._name);
        powerListToReturn.push({
            type: powerConf[id],
            name: powername,
            descriptors: val.descriptors,
            ranks: Number.parseInt(val._ranks),

            extras: val.extras?.extra ?? [],
            flaws: val.flaws?.flaw ?? [],
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
  