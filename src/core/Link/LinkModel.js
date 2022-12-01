import { LabelModel as Label, LinkModel as RDLinkModel,} from '@projectstorm/react-diagrams';
import { sameAxis } from '../Diagram/states/common';
import { PORTSTATE } from '../Port/PortModel';
import LabelModel from './LabelModel';

export default class LinkModel extends RDLinkModel {
  constructor(options) {
    super({
      type: 'link',
      ...options,
    });
  }

  start(){
    this.setConnecting();
    this.update();
  }

  getLinkData(){
    return {
      id: this.options.id,
      sourcePort: this.sourcePort.options.id,
      targetPort: this.targetPort.options.id,
      source: this.sourcePort.parent.options.id,
      target: this.targetPort.parent.options.id,
      sourceLabel: this.sourcePort.options.name,
      targetLabel: this.targetPort.options.name,
      projectId: localStorage.getItem("projectID"),
    }
  }

  remove(){
    this.setUnlinked()
    super.remove();
  }

  addLabel(label) {
    if (label instanceof Label) {
      return super.addLabel(label);
    }
    const newLabel = new LabelModel();
    newLabel.setLabel(label);
    return super.addLabel(newLabel);
  }
 
  getSelectionEntities() {
      return [...super.getSelectionEntities()];
  }

  update(){
    if(this.state !== PORTSTATE.disconnecting){
      this.setLocked(false);
      if(this.getTargetPort().parent.device == 1 && this.getSourcePort().parent.device == 2){
        this.getSourcePort().state = PORTSTATE.connected;
        this.getTargetPort().state = PORTSTATE.connected;
        this.getSourcePort().parent.gateway = true;
        return;
      }
      if(this.getTargetPort().parent.device == 2 && this.getSourcePort().parent.device == 1){
        this.getSourcePort().state = PORTSTATE.connected;
        this.getTargetPort().state = PORTSTATE.connected;
        this.getTargetPort().parent.gateway = true;
        return;
      }
      if(this.getTargetPort().parent.device == 3 || this.getSourcePort().parent.device == 3){
        this.getSourcePort().state = PORTSTATE.standBy;
        this.getTargetPort().state = PORTSTATE.standBy;
        return;
      }
      if(this.getTargetPort().parent.device == 2 || this.getSourcePort().parent.device == 2){
        this.getSourcePort().state = PORTSTATE.connected;
        this.getTargetPort().state = PORTSTATE.connected;
        return;
      }
    }
  }

  setConnecting(){
    this.getSourcePort().state = PORTSTATE.connecting;
    this.getTargetPort().state = PORTSTATE.connecting;
    this.getTargetPort().parent.setLocked(true);
    this.getSourcePort().parent.setLocked(true);
    this.setLocked(true);
  }

  setDisconnecting(){
    this.getSourcePort().state = PORTSTATE.disconnecting;
    this.getTargetPort().state = PORTSTATE.disconnecting;
    this.getTargetPort().parent.setLocked(true);
    this.getSourcePort().parent.setLocked(true);
    this.setLocked(true);
  }

  setUnlinked(){
    this.enable();
    this.getSourcePort().state = PORTSTATE.disconnected;
    if(this.getTargetPort())this.getTargetPort().state = PORTSTATE.disconnected;
  }

  disconnect(){
    this.getSourcePort().macAddr = null;
    this.getTargetPort().macAddr = null;
    this.getSourcePort().subnetId = null;
    this.getTargetPort().subnetId = null;
    this.getSourcePort().networkId = null;
    this.getTargetPort().networkId = null;
    this.getSourcePort().fixedIp = null;
    this.getTargetPort().fixedIp = null;
    this.getSourcePort().state = PORTSTATE.standBy;
    this.getTargetPort().state = PORTSTATE.standBy;
    this.setLocked(false);
  }

  connect(port){
    this.getSourcePort().macAddr = port.macAddr;
    this.getTargetPort().macAddr = port.macAddr;
    this.getSourcePort().subnetId = port.subnetId;
    this.getTargetPort().subnetId = port.subnetId;
    this.getSourcePort().networkId = port.networkId;
    this.getTargetPort().networkId = port.networkId;
    this.getSourcePort().fixedIp = port.fixedIp;
    this.getTargetPort().fixedIp = port.fixedIp;
    this.enable();
  }

  enable(){
    this.getSourcePort().enabled = true;
    this.getSourcePort().state = PORTSTATE.connected;
    if(this.getTargetPort())
    {
      this.getTargetPort().enabled = true
      this.getTargetPort().state = PORTSTATE.connected;
    }
    this.setLocked(false);
  }

  disable(){
    this.getSourcePort().enabled = false;
    this.getSourcePort().state = PORTSTATE.connected;
    if(this.getTargetPort())
    {
      this.getTargetPort().enabled =false
      this.getTargetPort().state = PORTSTATE.connected;
    }
    this.setLocked(false);
  }

  setLocked(locked){
    super.setLocked(locked);
    this.getSourcePort().parent.setLocked(locked);
    this.getSourcePort().setLocked(locked);
    if(this.getTargetPort())
    {
      this.getTargetPort().parent.setLocked(locked);
      this.getTargetPort().setLocked(locked);
    }
    this.repaint();
  }

  repaint(){
    super.setSelected(!this.isSelected());
    this.getSourcePort().parent.setSelected(!this.getSourcePort().parent.isSelected());
    if(this.getTargetPort())
    {
      this.getTargetPort().parent.setSelected(!this.getSourcePort().parent.isSelected());
    }
  }

  deserialize(event) {
    super.deserialize(event);
    const {registerModel} = event;
    registerModel(this);
  }

  addPoint(pointModel, index = 1) {
    super.addPoint(pointModel, index);

    return pointModel;
  }

  getMiddlePoint() {
    if (!this.hasMiddlePoint()) return null;

    return this.getPoints()[1];
  }

  getSecondPoint() {
    return this.getPoints()[1];
  }

  getSecondLastPoint() {
    const points = this.getPoints();
    return points[points.length - 2];
  }

  getFirstPosition() {
    return this.getFirstPoint().getPosition();
  }

  getSecondPosition() {
    return this.getSecondPoint().getPosition();
  }

  getMiddlePosition() {
    if (!this.hasMiddlePoint()) return null;

    return this.getMiddlePoint().getPosition();
  }

  getSecondLastPosition() {
    return this.getSecondLastPoint().getPosition();
  }

  getLastPosition() {
    return this.getLastPoint().getPosition();
  }

  hasMiddlePoint() {
    return this.getPoints().length === 3;
  }

  isStraight() {
    if (!this.hasMiddlePoint()) return true;

    const first = this.getFirstPosition();
    const middle = this.getMiddlePosition();
    const last = this.getLastPosition();

    if (sameAxis(first, middle, last)) return true;

    return false;
  }

    getColor() {
      if(!this.getSourcePort().enabled)return 'var(--disabled)';
      if(this.getSourcePort().state == PORTSTATE.connected) return 'var(--connected)';
      if(this.getSourcePort().state == PORTSTATE.disconnecting) return 'var(--disconnecting)';
      if(this.getSourcePort().state == PORTSTATE.connecting) return 'var(--connecting)';
      if(this.getSourcePort().state == PORTSTATE.standBy)return 'var(--standBy)';
      if(this.getSourcePort().state === PORTSTATE.disconnected) return 'var(--disconnected)';
      return 'var(--disconnected)';
  }
}
