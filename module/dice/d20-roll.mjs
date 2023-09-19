/**
 * A type of Roll specific to a d20-based check, save, or attack roll in the 5e system.
 * @param {string} formula                       The string formula to parse
 * @param {object} data                          The data object against which to parse attributes within the formula
 * @param {object} [options={}]                  Extra optional arguments which describe or modify the D20Roll

 * @param {number} [options.critical]            The value of d20 result which represents a critical success
 * @param {number} [options.fumble]              The value of d20 result which represents a critical failure
 * @param {(number)} [options.targetValue]       Assign a target value against which the result of this roll should be
 *                                               compared
 * @param {boolean} [options.elvenAccuracy=false]      Allow Elven Accuracy to modify this roll?
 * @param {boolean} [options.halflingLucky=false]      Allow Halfling Luck to modify this roll?
 * @param {boolean} [options.reliableTalent=false]     Allow Reliable Talent to modify this roll?
 */
export default class D20Roll extends Roll {
  constructor(formula, data, options) {
    super(formula, data, options);
    if (!this.options.configured) this.configureModifiers();
  }

  static fromRoll(roll) {
    const newRoll = new this(roll.formula, roll.data, roll.options);
    Object.assign(newRoll, roll);
    return newRoll;
  }


  static MODE = {
    NORMAL: 0,
    IMPROVED: 1
  }

  /**
  * A convenience reference for whether this D20Roll has advantage
  * @type {boolean}
  */
  get hasImproved() {
    return this.options.improved === D20Roll.MODE.IMPROVED;
  }

  /**
  * The HTML template path used to configure evaluation of this Roll
  * @type {string}
  */
  static EVALUATION_TEMPLATE = "systems/dnd5e/templates/chat/roll-dialog.hbs";

  /**
  * Does this roll start with a d20?
  * @type {boolean}
  */
  get validRoll() {
    return (this.terms[0] instanceof Die) && ((this.terms[0].faces === 20) || (this.terms[0].faces === 10));
  }

  /**
  * Is this roll a critical success? Returns undefined if roll isn't evaluated.
  * @type {boolean|void}
  */
  get isCritical() {
    if (!this.validRoll || !this._evaluated) return undefined;
    if (!Number.isNumeric(this.options.critical)) return false;
    return this.dice[0].total >= this.options.critical;
  }

  /**
  * Is this roll a critical failure? Returns undefined if roll isn't evaluated.
  * @type {boolean|void}
  */
  get isFumble() {
    if (!this.validRoll || !this._evaluated) return undefined;
    if (!Number.isNumeric(this.options.fumble)) return false;
    return this.dice[0].total <= this.options.fumble;
  }

  configureModifiers() {
    if (!this.validRoll) return;

    const d20 = this.terms[0];
    d20.modifiers = [];
    d20.number = 1;

    //call this by adding improved: 1
    if (this.hasImproved) {
      d20.modifiers.push("imp");
    }


    if (this.options.critical) d20.options.critical = this.options.critical;
    if (this.options.fumble) d20.options.fumble = this.options.fumble;
    if (this.options.targetValue) d20.options.target = this.options.targetValue;

    // Re-compile the underlying formula
    this._formula = this.constructor.getFormula(this.terms);

    // Mark configuration as complete
    this.options.configured = true;
  }

  /** @inheritdoc */
  async toMessage(messageData = {}, options = {}) {
    // Add appropriate advantage mode message flavor and dnd5e roll flags
    messageData.flavor = messageData.flavor || this.options.flavor;
    if (this.hasImproved) messageData.flavor += ` (${game.i18n.localize("MNM3E.ImprovedRoll")})`

    // Record the preferred rollMode
    options.rollMode = options.rollMode ?? this.options.rollMode;
    return super.toMessage(messageData, options);
  }


  /* -------------------------------------------- */
  /*  Configuration Dialog    #FIXME:             */
  /* -------------------------------------------- */

  /**
   * Create a Dialog prompt used to configure evaluation of an existing D20Roll instance.
   */
  async configureDialog({ title, defaultRollMode, template } = {}, options = {}) {
    // Render the Dialog inner HTML
    const content = await renderTemplate(template ?? this.constructor.EVALUATION_TEMPLATE, {
      formula: `${this.formula} + @total`,
      defaultRollMode,
      rollModes: CONFIG.Dice.rollModes,
      chooseModifier,
      defaultAbility,
      abilities: CONFIG.DND5E.abilities
    });

    let defaultButton = "normal";
    switch (defaultAction) {
      case D20Roll.MODE.IMPROVED: defaultButton = "improved"; break;
    }

    // Create the Dialog window and await submission of the form
    return new Promise(resolve => {
      new Dialog({
        title,
        content,
        buttons: {
          advantage: {
            label: game.i18n.localize("DND5E.Advantage"),
            callback: html => resolve(this._onDialogSubmit(html, D20Roll.ADV_MODE.ADVANTAGE))
          },
          normal: {
            label: game.i18n.localize("DND5E.Normal"),
            callback: html => resolve(this._onDialogSubmit(html, D20Roll.ADV_MODE.NORMAL))
          },
          disadvantage: {
            label: game.i18n.localize("DND5E.Disadvantage"),
            callback: html => resolve(this._onDialogSubmit(html, D20Roll.ADV_MODE.DISADVANTAGE))
          }
        },
        default: defaultButton,
        close: () => resolve(null)
      }, options).render(true);
    });
  }
}