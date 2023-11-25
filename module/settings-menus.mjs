export class MovementConfig extends FormApplication {
  /** @inheritdoc */
  constructor(object = {}, options = {}) {
    object = foundry.utils.mergeObject(game.settings.get("foundrymnm3e", "movementScalesSetting"), object, { inplace: false });
    super(object, options);
  }


  /* -------------------------------------------- */

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize("SETTINGS.mnmMovementScalesName"),
      classes: ["foundrymnm3e", "movement-config"],
      id: "movement-config",
      template: "systems/foundrymnm3e/templates/settings/movement-config.hbs",
      popOut: true,
      width: 240,
      height: "auto"
    });
  }

  /* -------------------------------------------- */


  /** @inheritdoc */
  getData(options = {}) {
    const context = super.getData(options);
    context.config = [];
    const types = ["walk",'burrowing', 'flight', 'leaping', 'swimming', 'teleport'];
    const speedvalue = game.settings.get("foundrymnm3e", "movementScalesSetting");

    types.forEach(element => {
      context.config.push({label: CONFIG.MNM3E.movementTypes[element], id: element, value: speedvalue[element]});
    });
    return context;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _updateObject(event, formData) {
    let vars = foundry.utils.expandObject(formData);
    let settingset = {
      walk: vars.walk.value,
      burrowing: vars.burrowing.value,
      flight: vars.flight.value,
      swimming: vars.swimming.value,
      teleport: vars.teleport.value,
      leaping: vars.leaping.value
    }
    await game.settings.set("foundrymnm3e", "movementScalesSetting", settingset);
    return SettingsConfig.reloadConfirm({ world: true });
  }
}