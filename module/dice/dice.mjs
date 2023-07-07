/* -------------------------------------------- */
/* D20 Roll                                     */
/* -------------------------------------------- */

/**
 * A standardized helper function for managing core 5e d20 rolls.
 * Holding SHIFT, ALT, or CTRL when the attack is rolled will "fast-forward".
 * This chooses the default options of a normal attack with no bonus, Advantage, or Disadvantage respectively
 *
 * @param {D20RollConfiguration} configuration  Configuration data for the D20 roll.
 * @returns {Promise<D20Roll|null>}             The evaluated D20Roll, or null if the workflow was cancelled.
 */
export async function d20Roll({
    parts=[], data={},
    improved, critical=20, fumble=1, targetValue,
    fastForward=true, template, title, dialogOptions,
    chatMessage=true, messageData={}, rollMode, flavor
  }={}) {

    // Handle input arguments
    const formula = ["1d20"].concat(parts).join(" + ");

    const defaultRollMode = rollMode || game.settings.get("core", "rollMode");

    // Construct the D20Roll instance
  const roll = new CONFIG.Dice.D20Roll(formula, data, {
    flavor: flavor || title,
    improved,
    defaultRollMode,
    rollMode,
    critical,
    fumble,
    targetValue
  });

  // Prompt a Dialog to further configure the D20Roll
  if ( !fastForward ) {
    const configured = await roll.configureDialog({
      title,
      defaultRollMode,
      template
    }, dialogOptions);
    if ( configured === null ) return null;
  } else roll.options.rollMode ??= defaultRollMode;
  
  await roll.evaluate({async: true});

  // Create a Chat Message
  if ( roll && chatMessage ) await roll.toMessage(messageData);
  return roll;
}