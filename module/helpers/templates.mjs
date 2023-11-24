/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {

  return loadTemplates([

    // Actor partials.
    "systems/foundrymnm3e/templates/actor/parts/actor-attacks.hbs",
    "systems/foundrymnm3e/templates/actor/parts/actor-features.hbs",
    "systems/foundrymnm3e/templates/actor/parts/actor-powers.hbs",
    "systems/foundrymnm3e/templates/actor/parts/actor-effects.hbs",
    "systems/foundrymnm3e/templates/actor/parts/actor-advantages.hbs",

    // Arrays
    "systems/foundrymnm3e/templates/actor/parts/actor-array-list.hbs",
    "systems/foundrymnm3e/templates/actor/parts/actor-array.hbs",

    "systems/foundrymnm3e/templates/window-overlay/add-modifiers.hbs"
  ]);
};
