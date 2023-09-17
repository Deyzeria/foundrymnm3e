// Import document classes.
import { MNM3E } from "./module/helpers/config.mjs";
import { FoundryMnM3eActor } from "./module/documents/actor.mjs";
import { FoundryMnM3eItem } from "./module/documents/item.mjs";
// Import sheet classes.
import { FoundryMnM3eActorSheet } from "./module/sheets/actor-sheet.mjs";
import { FoundryMnM3eItemSheet } from "./module/sheets/item-sheet.mjs";
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from "./module/helpers/templates.mjs";
import { ParserAccess } from "./module/helpers/HeroLabParser.mjs";
import registerSystemSettings from "./module/settings.mjs";
import {SetGameValues, GetScale} from "./module/helpers/data-tables.mjs";
import { fillDefaults } from "./module/helpers/dataholders/ModifiersData.mjs";

import * as dice from "./module/dice/_module.mjs";
import * as canvas from "./module/canvas/_module.mjs";
import * as utils from "./module/helpers/utils.mjs"
import * as documents from "./module/helpers/_module.mjs"

globalThis.foundrymnm3e = {
  canvas,
  config: MNM3E,
  dice,
  documents
};


/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {
  globalThis.foundrymnm3e = game.foundrymnm3e = Object.assign(game.system, globalThis.foundrymnm3e);
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.foundrymnm3e = {
    FoundryMnM3eActor,
    FoundryMnM3eItem,
    rollItemMacro
  };

  //Register System settings
  registerSystemSettings();

  // If this doesn't work, then move arrays separately and make this getting right when getting value?
  SetGameValues(game.settings.get("foundrymnm3e", "measurementsystem"));

  // Custom Die modifier
  // For now will be usually hardcoded to just do d20imp, adding a die with the result of 10 if the result is below 11(1-10)
  Die.MODIFIERS.imp = function(modifier) 
  { 
    const rgx = /imp/i;
    const match = modifier.match(rgx);
    if ( !match ) return false;
    if (this.results[0].result < 11) 
    {
      this.results.push( { "result": 10, "active": true, "exploded": true } );
    }
  }

  // Add custom constants for configuration.
  CONFIG.MNM3E = MNM3E;
  CONFIG.ActiveEffect.documentClass = documents.ActiveEffectMnm3e;
  CONFIG.Actor.documentClass = FoundryMnM3eActor;
  CONFIG.Item.documentClass = FoundryMnM3eItem;
  CONFIG.Dice.D20Roll = dice.D20Roll;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20 + @generic.initiative"
  };

  // Define custom Document classes
  CONFIG.Dice.rolls.push(dice.D20Roll);


  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("foundrymnm3e", FoundryMnM3eActorSheet, 
    {  
      types: ["hero"],
      makeDefault: true,
      label: "ACTOR.SheetHero"
    });
  Actors.registerSheet("foundrymnm3e", FoundryMnM3eActorSheet, 
    {  
      types: ["npc"],
      makeDefault: true,
      label: "ACTOR.SheetNpc"
    });
  Actors.registerSheet("foundrymnm3e", FoundryMnM3eActorSheet, 
    {  
      types: ["vehicle"],
      makeDefault: true,
      label: "ACTOR.SheetVehicle"
    });
  Actors.registerSheet("foundrymnm3e", FoundryMnM3eActorSheet, 
    {  
      types: ["base"],
      makeDefault: true,
      label: "ACTOR.SheetBase"
    });
  
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("foundrymnm3e", FoundryMnM3eItemSheet, 
  { 
    makeDefault: true,
    label: "MNM3E.SheetItem"
  });
  fillDefaults();
  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here are a few useful examples:
Handlebars.registerHelper('concat', function() {
  var outStr = '';
  for (var arg in arguments) {
    if (typeof arguments[arg] != 'object') {
      outStr += arguments[arg];
    }
  }
  return outStr;
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

// Handlebars showing various datas
Handlebars.registerHelper('isinput', function (value) {
  return value == "input";
});

Handlebars.registerHelper('isdropdown', function (value) {
  return value == "dropdown";
});

Handlebars.registerHelper('isnotfalse', function (value) {
  return value != false;
});

Handlebars.registerHelper('isaffliction', function (value) { return value == "affliction"; });
Handlebars.registerHelper('isdamage', function (value) { return value == "damage"; });
Handlebars.registerHelper('iscommunication', function (value) { return value == "communication"; });
Handlebars.registerHelper('isenhanced', function (value) { return value == "enhancedability" || value == "enhancedtrait" || value == "enhancedadvantage"; });

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("i18nInit", () => utils.performPreLocalization(CONFIG.MNM3E));


Hooks.once("ready", async function() {
  ParserAccess();

  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => createItemMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  if (data.type !== "Item") return;
  if (!("data" in data)) return ui.notifications.warn("You can only create macro buttons for owned Items");
  const item = data.data;

  // Create the macro command
  const command = `game.foundrymnm3e.rollItemMacro("${item.name}");`;
  let macro = game.macros.find(m => (m.name === item.name) && (m.command === command));
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: { "foundrymnm3e.itemMacro": true }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
 function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then(item => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(`Could not find item ${itemName}. You may need to delete and recreate this macro.`);
    }

    // Trigger the item roll
    item.roll();
  });
}