import { State, Action, InputType } from '@projectstorm/react-canvas-core';
import { PortModel } from '@projectstorm/react-diagrams-core';

import DragCanvasState from './DragCanvasState';
import DragNewLinkState from './DragNewLinkState';
import MoveItemsState from './MoveItemsState';

/**
 * This class defines custom handlers (called states) to respond to
 * clicking events on certain elements.
 */
export default class States extends State {
  constructor(model) {
    super({name: 'diagram-states'});
    this.dragCanvas = new DragCanvasState();
    this.dragNewLink = new DragNewLinkState();
    this.dragItems = new MoveItemsState(model);
    // Determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: event => {
          const element = this.engine.getActionEventBus().getModelForEvent(event);
          // The canvas was clicked on, transition to the dragging canvas state
          if (!element) {
            this.transitionWithEvent(this.dragCanvas, event);
            this.engine.editDevice(false);
          }
          // Initiate dragging a new link
          else if (element instanceof PortModel) {
            this.transitionWithEvent(this.dragNewLink, event);
          }
          // Move items
          else {
            this.transitionWithEvent(this.dragItems, event);
          }
        },
      }),
    );
    
  }
}
