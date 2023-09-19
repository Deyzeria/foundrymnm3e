/**
 * Register all of the system's settings
 */

export default function registerSystemSettings() {
  game.settings.register("foundrymnm3e", "measurementsystem", {
    name: "SETTINGS.mnmScaleSystem",
    hint: "SETTINGS.mnmScaleSystemDesc",
    scope: "world",
    config: true,
    default: "meters",
    type: String,
    choices: {
      meters: "SETTINGS.mnmScaleSystemMeters",
      feet: "SETTINGS.mnmScaleSystemFeet"
    },
    requiresReload: true
  });
}