/**
 * Register all of the system's settings
 */

import { MovementConfig } from "./settings-menus.mjs";

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

  game.settings.registerMenu("foundrymnm3e", "movementScalesSetting", {
    name: "SETTINGS.mnmMovementScalesName",
    label: "SETTINGS.mnmMovementScalesLabel",
    hint: "SETTINGS.mnmMovementScalesHint",
    icon: "fa-solid fa-person-walking",
    type: MovementConfig,
    restricted: true
  });

  game.settings.register("foundrymnm3e", "movementScalesSetting", {
    name: "SETTINGS.mnmMovementScalesName",
    scope: "world",
    config: false,
    type: Object,
    default: {
      walk: 0,
      burrowing: -5, 
      flight: 0,
      leaping: -2,
      swimming: -2,
      teleport: 0
    }
  });
}