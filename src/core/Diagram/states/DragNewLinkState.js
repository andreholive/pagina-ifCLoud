import { AbstractDisplacementState, Action, InputType,} from '@projectstorm/react-canvas-core';
import { NodeModel, PortModel } from '@projectstorm/react-diagrams-core';
import { nearby } from './common';
import handleLinkDrag from './handleLinkDrag';
import LinkModel from '../../Link/LinkModel';

export default class DragNewLinkState extends AbstractDisplacementState {
  constructor() {
    super({ name: 'drag-new-link' });
    
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: event => {
          this.sourcePort = this.engine.getMouseElement(event.event);
          if (!(this.sourcePort instanceof PortModel) 
          || this.sourcePort.isLocked()
          || this.sourcePort.isLinked()
          ) {
            this.eject();
            return;
          }
          this.link = new LinkModel();
          this.link.setSourcePort(this.sourcePort);
          this.engine.getModel().clearSelection();
          this.engine.getModel().addLink(this.link);
          this.sourcePort.reportPosition();
        },
      }),
    );

    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: event => {
          this.targetPort = this.engine.getMouseElement(event.event);
          if (this.targetPort instanceof NodeModel || this.isNearbySourcePort(event.event)) {
            this.link.remove();
            this.engine.repaintCanvas();
            return
          }
          if (this.targetPort instanceof PortModel && this.sourcePort.canLinkToPort(this.targetPort)) {
            if(this.targetPort.getParent().gateway && this.targetPort.getParent().device === 1){
              this.link.remove();
              return;
            };
            this.link.setTargetPort(this.targetPort);
            this.link.addLabel(this.sourcePort.options.name);
            this.link.addLabel(this.targetPort.options.name);
            this.targetPort.reportPosition();
            this.engine.model.fireEvent({ link: this.link }, 'addLink');
            return;
          }
          this.link.remove();
          this.engine.repaintCanvas();
        },
      }),
    );
  }

  isNearbySourcePort(event) {
    const point = this.engine.getRelativeMousePoint(event);
    const sourcePort = this.link.getSourcePort();
    const sourcePortSize = sourcePort.width;
    const sourcePortPosition = sourcePort.getPosition();
    return nearby(point, sourcePortPosition, sourcePortSize);
  }

  fireMouseMoved(event) {
    handleLinkDrag.call(this, event, this.link);
  }
}
