export async function ParserAccess(){
    // ---REMOVE---
    const manualSwitch = false;
    const generateActor = false;
    if(manualSwitch){

    requestURL = "https://raw.githubusercontent.com/Sinantrarion/foundrymnm3e/main/module/helpers/charactertest.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const dataActor = await response.json();

    console.debug("dataActor: ", dataActor);
    var actorJson = await GenerateActor(dataActor, "hero");
    
    actorJson = PopulateActorData(actorJson, dataActor);
    PopulateActorAdvantages(actorJson, dataActor);
    //console.debug(actorJson); 
    if (!generateActor) return;
    await Actor.create(actorJson);
    }
}

// json file should be passed here.
function PassedData(jsonfile)
{
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

function PopulateActorAdvantages(actorStub, dataActor)
{
    const advantageList = dataActor.document.public.character.advantages.advantage;
    var advListToAdd = {};
    const adConfArray = Object.values(CONFIG.MNM3E.AdvantageEnum);
    const adConf = Object.keys(CONFIG.MNM3E.AdvantageEnum);
    var advToAnalyseCustom = [];
    for (var i=0; i < advantageList.length; i++)
    {
        const val = advantageList[i];
        if (val._useradded == undefined || val._useradded == "yes")
        {
            var name = val._name;
            const pattern = /\s+\d+$/;
            name = name.replace(pattern, '');
            var id = adConfArray.findIndex((adv) => adv == name);
            if (id == -1) 
            {
                advToAnalyseCustom.push(val);
                continue;
            }
            advListToAdd[adConf[id]] = {type: adConf[id], rank: Number.parseInt(val.cost._value)};
        }
    }
    console.debug("Advantages Sorted: ", advListToAdd);
    console.debug("Advantages Unsorted: ", advToAnalyseCustom);
}

function PopulateActorPowers(actorStub, dataActor)
{
    const powersList = dataActor.document.public.character.powers.power;
    var powerListToAdd = {};
    var powersInArrays = {};

    const powerConfArray = Object.values(CONFIG.MNM3E.defaultPowerEffects);
    const powerConf = Object.keys(CONFIG.MNM3E.defaultPowerEffects);
    var powToAnalyseCustom = [];

    for (var i=0; i < powersList.length; i++)
    {
        const val = powersList[i];
        if(val.otherpowers == undefined)
        {
            powerListToAdd = buildArray(val);
        }
        else
        {
            const powerListArray = val.otherpowers.power;
            powersInArrays.name = val._name;
            for (var y=0; y < powerListArray.length; y++)
            {
                const newval = powerListArray[y];
                if(newval.otherpowers == undefined)
                {
                    powersInArrays = buildArray(newval);
                }
            }
        }
    }

    console.debug("Powers Sorted: ", powerListToAdd);
    console.debug("Powers Separate Arrays: ", powersInArrays);
}

function buildArray(val)
{
    const pattern = /:\s+(\w+)\s+\d+$/;
    var matches = val._name.match(pattern);
    if (matches && matches.length >= 2) 
    {
        var type = matches[1];
    } 
    else 
    {
        console.warn("Didn't find power type!");
        return null;
    }

    var id = powerConfArray.findIndex((pow) => pow == type);

    if (id == -1) 
    {
        console.warn("Custom Power!");
        return null;
    }

    var powername = removeAfterLastColon(val._name);

    return powerListToAdd[powerConf[id]] = 
    {
        type: powerConf[id],
        name: powername,
        descriptors: val.descriptors,
        ranks: Number.parseInt(val._ranks),

        extras: val.extras?.extra ?? [],
        flaws: val.flaws?.flaw ?? [],
        options: val.options?.option ?? [],
        traitoptions: val.traitmods?.traitmod ?? "",
        chainedadvantages: val.chainedadvantages?.chainedadvantage ?? ""
    }
}

function removeAfterLastColon(inputString) {
    const lastSemicolonIndex = inputString.lastIndexOf(':');
    
    if (lastSemicolonIndex !== -1) {
      return inputString.substring(0, lastSemicolonIndex);
    } else {
      return inputString; // No semicolon found, return the original string
    }
  }
  