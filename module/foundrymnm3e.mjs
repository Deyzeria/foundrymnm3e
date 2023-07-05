// Import document classes.
import { FoundryMnM3eActor } from "./documents/actor.mjs";
import { FoundryMnM3eItem } from "./documents/item.mjs";
// Import sheet classes.
import { FoundryMnM3eActorSheet } from "./sheets/actor-sheet.mjs";
import { FoundryMnM3eItemSheet } from "./sheets/item-sheet.mjs";
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { MNM3E } from "./helpers/config.mjs";
import { ParserAccess } from "./helpers/HeroLabParser.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.foundrymnm3e = {
    FoundryMnM3eActor,
    FoundryMnM3eItem,
    rollItemMacro
  };

  // Add custom constants for configuration.
  CONFIG.MNM3E = MNM3E;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20 + @generic.initiative"
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = FoundryMnM3eActor;
  CONFIG.Item.documentClass = FoundryMnM3eItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("foundrymnm3e", FoundryMnM3eActorSheet, 
    {  
      types: ["hero"],
      makeDefault: true,
      label: "MNM3E.SheetHero"
    });
  Actors.registerSheet("foundrymnm3e", FoundryMnM3eActorSheet, 
    {  
      types: ["vehicle"],
      makeDefault: true,
      label: "MNM3E.SheetVehicle"
    });
  Actors.registerSheet("foundrymnm3e", FoundryMnM3eActorSheet, 
    {  
      types: ["base"],
      makeDefault: true,
      label: "MNM3E.SheetBase"
    });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("foundrymnm3e", FoundryMnM3eItemSheet, 
  { 
    makeDefault: true,
    label: "MNM3E.SheetItem"
  });

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

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", async function() {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  ParserAccess();

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