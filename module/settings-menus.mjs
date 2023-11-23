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
      title: game.i18n.localize("mnmMovementScalesName"),
      id: "movement-config",
      template: "systems/foundrymnm3e/templates/settings/movement-config.hbs",
      popOut: true,
      width: 600,
      height: "auto"
    });
  }

  /* -------------------------------------------- */


  /** @inheritdoc */
  getData(options = {}) {
    const context = super.getData(options);
    context.config = [];
    const types = ["walk",'burrowing', 'flight', 'leaping', 'swimming', 'teleport'];
    const speedvalue = game.settings.get("foundrymnm3e", "movementScalesSetting")

    console.debug(speedvalue);
    types.forEach(element => {
      //context.config.push({label: element, id: element, value: speedvalue[types]});
    });
    return context;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _updateObject(event, formData) {
    //await game.settings.set("foundrymnm3e", "movementScalesSetting", foundry.utils.expandObject(formData));
    return SettingsConfig.reloadConfirm({ world: true });
  }
}