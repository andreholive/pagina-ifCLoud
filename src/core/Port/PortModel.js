import { PortModel as RDPortModel } from '@projectstorm/react-diagrams';

export const PORTSTATE = {
    connected: 'connected',
    disconnected: 'disconnected',
    disconnecting: 'disconnecting',
    connecting: 'connecting',
    standBy: 'standBy'
}

export default class PortModel extends RDPortModel {
  constructor(options = {}) {
    super({
      type: 'Port',
      maximumLinks: 1,
      ...options,
    });
    this.status = 3;
    this.input = true;
    this.macAddr = null;
    this.subnetId = null;
    this.networkId = null;
    this.fixedIp = null;
    this.state = PORTSTATE.disconnected;
    this.enabled = true;
  }

  setStatus(status){
    this.status = status;
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
    this.input = event.data.input;
    this.status = event.data.status;
    this.macAddr = event.data.macAddr;
    this.subnetId = event.data.subnetId;
    this.networkId = event.data.networkId;
    this.fixedIp = event.data.fixedIp;
    this.state = event.data.state;
    this.enabled = event.data.enabled;
  }

  getData(){
    return {
        id: this.options.id,
        name: this.options.name,
        deviceId: this.parent.options.id,
        status: this.status,
        networkId: this.networkId,
        subnetId: this.subnetId,
        portId: this.portId,
        macAddr: this.macAddr,
        fixedIp: this.fixedIp,
        state: this.state,
        enabled: this.enabled
    }
}

  isInput() {
    return this.input === true;
  }

  isOutput() {
    return this.input === false;
  }

  canLinkToPort(port) {
    if(this.parent.status === 2 || port.parent.status === 2)return false;
    //if(this.parent.device === 2 && port.parent.device ===2)return true;
    if(this.parent.device === port.parent.device)return false;
    if(this.parent.options.id === port.parent.options.id)return false;
    if(Object.keys(port.getLinks()).length == 1)return false;
    return true;
  }

  getMainLink() {
    const links = Object.values(this.getLinks());
    return links.length > 0 ? links[0] : null;
  }

  getLink() {
    const links = Object.values(this.getLinks());
    return links.length > 0 ? links[0] : null;
  }

  isLinked() {
    return Object.values(this.getLinks()).length == 1;
  }

  getColor() {
  if(!this.enabled)return 'var(--disabled)';
  if(this.state == PORTSTATE.connected) return 'var(--connected)';
  if(this.state == PORTSTATE.disconnecting) return 'var(--disconnecting)';
  if(this.state == PORTSTATE.connecting) return 'var(--connecting)';
  if(this.state == PORTSTATE.standBy)return 'var(--standBy)';
  if(this.state === PORTSTATE.disconnected) return 'var(--disconnected)';
  return 'var(--disconnected)';
  }
}
