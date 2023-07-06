import {onManageActiveEffect, prepareActiveEffectCategories} from "../helpers/effects.mjs";

import SkillsConfig from "./parts/skills-config.mjs"

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class FoundryMnM3eActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["foundrymnm3e", "sheet", "actor"],
      template: "systems/foundrymnm3e/templates/actor/actor-sheet.hbs",
      width: 800,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
    });
  }

  /** @override */
  get template() {
    return `systems/foundrymnm3e/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = this.actor.toObject(false);

  // Add the actor's data to context.data for easier access, as well as flags.
  context.system = actorData.system;
  context.flags = actorData.flags;

    // Prepare character data and items.
    if (actorData.type == 'hero') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'vehicle') {
    }

    if (actorData.type == 'base') {
    }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(this.actor.effects);

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
   _prepareCharacterData(context) {
    // Handle ability scores.
    for (let [k, v] of Object.entries(context.system.abilities)) {
      v.label = game.i18n.localize(CONFIG.MNM3E.abilities[k]) ?? k;
    }

    // Handle defense scores.
    for (let [k, v] of Object.entries(context.system.defenses)) {
      v.label = game.i18n.localize(CONFIG.MNM3E.defenses[k]) ?? k;
    }

    // Handle skills scores.
    for (let [k, v] of Object.entries(context.system.skills)) {
      v.label = game.i18n.localize(CONFIG.MNM3E.skills[k]) ?? k;
      if (v.hasOwnProperty("subtype")){
        if(v.subtype != ""){
          v.label = v.subtype;
        }
      }
    }
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // Initialize containers.
    const power = [];
    const advantage = [];
    const equipment = [];
    const attack = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to power.
      if (i.type === 'power') {
        power.push(i);
      }
      // Append to advantages.
      else if (i.type === 'advantage') {
        advantage.push(i);
      } 
      // Append to equipment.
      else if (i.type === 'equipment') {
        equipment.push(i);
      } 
      // Append to attacks.
      else if (i.type === 'attack') {
        attack.push(i);
      } 
    }

    // Assign and return
    context.power = power;
    context.advantage = advantage;
    context.equipment = equipment;
    context.attack = attack;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable){

      // Add Inventory Item
      html.find('.item-create').click(this._onItemCreate.bind(this));

      // Delete Inventory Item
      html.find('.item-delete').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        item.delete();
        li.slideUp(200, () => this.render(false));
      });

      // Active Effect management
      html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

      // Rollable abilities.
      html.find('.rollable').click(this._onRoll.bind(this));

      html.find(".config-button").click(this._onConfigMenu.bind(this));

      // Drag events for macros.
      if (this.actor.isOwner) {
        let handler = ev => this._onDragStart(ev);
        html.find('li.item').each((i, li) => {
          if (li.classList.contains("inventory-header")) return;
          li.setAttribute("draggable", true);
          li.addEventListener("dragstart", handler, false);
        });
      }
    }
  }

  _onConfigMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    const button = event.currentTarget;
    let app;
    switch ( button.dataset.action ) {
      case "skill":
        app = new SkillsConfig(this.actor);
        break;
      default:
        break;
    }
    app?.render(true);
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
   async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system["type"];

    // Finally, create the item!
    return await Item.create(itemData, {parent: this.actor});
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
   _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

}
