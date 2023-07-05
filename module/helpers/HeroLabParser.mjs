export async function ParserAccess(requestURL){
    requestURL = "https://raw.githubusercontent.com/Sinantrarion/foundrymnm3e/main/module/helpers/data.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const dataActor = await response.json();  

            console.log(dataActor);
    var actorJson = await GenerateActor(dataActor);
    
    actorJson = await PopulateActorData(actorJson, dataActor);
            console.log(actorJson); 
    //await Actor.create(actorJson)
}

async function GenerateActor(dataActor){
    return new Actor({name: dataActor.document.public.character._name, type:"hero"}).toObject()
}

async function PopulateActorData(actorStub, dataActor){
    const dataBase = dataActor.document.public.character;

    // ----ABILITIES----
    actorStub.system.abilities.str.purchased = parseInt(dataBase.attributes.attribute[0]._base);
    actorStub.system.abilities.sta.purchased = parseInt(dataBase.attributes.attribute[1]._base);
    actorStub.system.abilities.agl.purchased = parseInt(dataBase.attributes.attribute[2]._base);
    actorStub.system.abilities.dex.purchased = parseInt(dataBase.attributes.attribute[3]._base);
    actorStub.system.abilities.fgt.purchased = parseInt(dataBase.attributes.attribute[4]._base);
    actorStub.system.abilities.int.purchased = parseInt(dataBase.attributes.attribute[5]._base);
    actorStub.system.abilities.awe.purchased = parseInt(dataBase.attributes.attribute[6]._base);
    actorStub.system.abilities.pre.purchased = parseInt(dataBase.attributes.attribute[7]._base);

    // ----DEFENCES----
    actorStub.system.defenses.dodge.purchased = parseInt(dataBase.defenses.defense[0]._base);
    actorStub.system.defenses.parry.purchased = parseInt(dataBase.defenses.defense[1]._base);
    actorStub.system.defenses.fortitude.purchased = parseInt(dataBase.defenses.defense[2]._base);
    actorStub.system.defenses.toughness.purchased = parseInt(dataBase.defenses.defense[3]._base);
    actorStub.system.defenses.will.purchased = parseInt(dataBase.defenses.defense[4]._base);
    
    // ----SKILLS----
    actorStub.system.acr.purchased = parseInt(dataBase.skills.skill[0]._base);
    actorStub.system.ath.purchased = parseInt();
    actorStub.system.clc1.purchased = parseInt();
    actorStub.system.clc2.purchased = parseInt();
    actorStub.system.dec.purchased = parseInt();
    actorStub.system.exp1.purchased = parseInt();
    actorStub.system.exp2.purchased = parseInt();
    actorStub.system.exp3.purchased = parseInt();
    actorStub.system.exp4.purchased = parseInt();
    actorStub.system.exp5.purchased = parseInt();
    actorStub.system.inm.purchased = parseInt();
    actorStub.system.ins.purchased = parseInt();
    actorStub.system.inv.purchased = parseInt();
    actorStub.system.prc.purchased = parseInt();
    actorStub.system.prs.purchased = parseInt();
    actorStub.system.rng1.purchased = parseInt();
    actorStub.system.rng2.purchased = parseInt();
    actorStub.system.soh.purchased = parseInt();
    actorStub.system.ste.purchased = parseInt();
    actorStub.system.tec.purchased = parseInt();
    actorStub.system.tre.purchased = parseInt();
    actorStub.system.veh.purchased = parseInt();

    // ----GENERIC----
    actorStub.system.generic.pl = parseInt(dataBase.powerlevel._value);
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
    actorStub.system.weight = parseInt(dataBase.personal.charweight_value); 
    actorStub.system.gender = dataBase.personal._gender;
    actorStub.system.heroname = dataActor.document.public.character._name;

    // = parseInt(dataBase.);
    return actorStub;
}