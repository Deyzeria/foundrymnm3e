/**
 * Extend the base ActiveEffect class to implement system-specific logic.
 */
export default class ActiveEffectMnm3e extends ActiveEffect {

  /**
   * Manage Active Effect instances through the Actor Sheet via effect control buttons.
   * @param {MouseEvent} event      The left-click event on the effect control
   * @param {Actor|Item} owner      The owning document which manages this effect
   */
  static onManageActiveEffect(event, owner) {
    event.preventDefault();
    const a = event.currentTarget;
    const li = a.closest("li");
    const effect = li.dataset.effectId ? owner.effects.get(li.dataset.effectId) : null;
    switch (a.dataset.action) {
      case "create":
        return owner.createEmbeddedDocuments("ActiveEffect", [{
          name: "New Effect",
          icon: "icons/svg/aura.svg",
          origin: owner.uuid,
          "duration.rounds": li.dataset.effectType === "temporary" ? 1 : undefined,
          disabled: li.dataset.effectType === "inactive"
        }]);
      case "edit":
        return effect.sheet.render(true);
      case "delete":
        return effect.delete();
      case "toggle":
        return effect.update({ disabled: !effect.disabled });
    }
  }

  /**
   * Prepare the data structure for Active Effects which are currently applied to an Actor or Item.
   * @param {ActiveEffect[]} effects    The array of Active Effect instances to prepare sheet data for
   * @return {object}                   Data for rendering
   */
  static prepareActiveEffectCategories(effects) {
    // Define effect header categories
    const categories = {
      temporary: {
        type: "temporary",
        label: "Temporary Effects",
        effects: []
      },
      passive: {
        type: "passive",
        label: "Passive Effects",
        effects: []
      },
      inactive: {
        type: "inactive",
        label: "Inactive Effects",
        effects: []
      }
    };

    // Iterate over active effects, classifying them into categories
    for (let e of effects) {
      if (e.disabled) categories.inactive.effects.push(e);
      else if (e.isTemporary) categories.temporary.effects.push(e);
      else categories.passive.effects.push(e);
    }
    return categories;
  }

  static addActiveEffectItems(nameSource, state, list, effect, uuid, owner) {
    console.debug("hit");
    // owner.createEmbeddedDocuments("ActiveEffect", [{
    //   name: nameSource,
    //   icon: "icons/svg/aura.svg",
    //   origin: uuid,
    //   "duration.rounds": undefined,
    //   disabled: state
    // }]);

    console.debug("State: ", state);
    if (state) {
      var eff = [];
      effect.forEach(element => {
        const val = {
          key: `system.${list}.${element.name}.auto`,
          mode: 2,
          value: element.value
        }
        eff.push(val)
      });

      if (owner.effects.filter(e => e.origin === uuid).length == 0) {
        return owner.createEmbeddedDocuments("ActiveEffect", [{
          name: nameSource,
          icon: "icons/svg/aura.svg",
          origin: uuid,
          "duration.rounds": undefined,
          disabled: !state,
          changes: eff
        }]);
      }

    }


    // else
    // {

    // }
  }
}