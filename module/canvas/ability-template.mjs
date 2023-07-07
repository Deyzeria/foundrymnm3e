export default class AbilityTemplate extends MeasuredTemplate {

    /**
     * Track the timestamp when the last mouse move event was captured.
     * @type {number}
     */
    #moveTime = 0;
  
    /* -------------------------------------------- */
  
    /**
     * The initially active CanvasLayer to re-activate after the workflow is complete.
     * @type {CanvasLayer}
     */
    #initialLayer;
  
    /* -------------------------------------------- */
  
    /**
     * Track the bound event handlers so they can be properly canceled later.
     * @type {object}
     */
    #events;

    
}