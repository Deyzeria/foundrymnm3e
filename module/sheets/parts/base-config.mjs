/**
 * An abstract class containing common functionality between actor sheet configuration apps.
 * @extends {DocumentSheet}
 * @abstract
 */
export default class BaseConfigSheet extends DocumentSheet {
    /** @inheritdoc */
    activateListeners(html) {
      super.activateListeners(html);
      if ( this.isEditable ) {
      }
    }
  
    /* -------------------------------------------- */
  
    /**
     * Retrieve the list of fields that are currently modified by Active Effects on the Actor.
     * @returns {string[]}
     * @protected
     */
    _getActorOverrides() {
      return Object.keys(foundry.utils.flattenObject(this.object.overrides || {}));
    }
  }