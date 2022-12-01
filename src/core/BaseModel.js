import { NodeModel } from '@projectstorm/react-diagrams';
import PortModel from './Port/PortModel';

const getPort = (port) => {
  if (port instanceof PortModel) return port;
  return new PortModel({ name: port });
};

export class BaseModel extends NodeModel {
  constructor(type, name) {
    super({ type });
    this.status=2;
    this.grabbing = false;
    this.name = name;
    this.initialize();
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
    this.status = event.data.status;
  }

  addPort(port) {
    return super.addPort(port);
  }

  setGrabbing(grab){
    this.grabbing = grab;
  }

  getPortsData(){
    const ports = Object.values(this.ports);
    let portsData = [];
    ports.forEach(port => portsData.push({
          id: port.options.id,
          name: port.options.name,
          deviceId: this.options.id,
          gateway: false,
          status: 3,
          networkId: '',
          subnetId: '',
          instancePortId: ''  
    }));
    return portsData;
  }

  selectPortById(portId){
    const index = Object.values(this.ports).findIndex(port => {
    if(portId === port.options.id){
        return portId == port.options.id;
    } 
    });
    return Object.values(this.ports)[index];
  }

  setStatus(status){
    this.status = status
    if(status === 2)this.setLocked(true);
    else this.setLocked(false);
    this.fireEvent('', 'selectionChanged');
  }

  removePort(arg) {
    const port = getPort(arg);
    super.removePort(port);
  }

  getInputPorts() {
    return Object.fromEntries(
      Object.entries(this.getPorts()).filter(([, port]) =>
        port.isInput(),
      ),
    );
  }

  getNumberPorts() {
    return Object.entries(this.getInputPorts()).length;
  }

  getOutputPorts() {
    return Object.fromEntries(
      Object.entries(this.getPorts()).filter(
        ([, port]) => !port.isInput(),
      ),
    );
  }

  getAllLinks() {
    return Object.values(this.getPorts())
      .map(port => port.getMainLink())
      .filter(link => !!link)
      .reduce(
        (arr, link) => [...arr, link],
        [],
      );
  }

  initialize() {}

  
}
