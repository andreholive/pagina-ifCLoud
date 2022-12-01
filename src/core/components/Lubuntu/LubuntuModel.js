import { BaseModel } from '../../BaseModel';
import PortModel from '../../Port/PortModel';


const getPort = (port) => {
  if (port instanceof PortModel){
    return port;
  }
  const newPort = new PortModel({ name: port.name });
  newPort.gateway = false;
  return newPort;
};

export default class LubuntuModel extends BaseModel{
    initialize() {
    this.type = 'lubuntu';
    this.device = 3;
  }

  addPort(name) {
    const port = getPort(name);
    super.addPort(port);
  };

  generatePorts(){
    const port = new PortModel({ name: 'eth0' });
    port.gateway = false;
    super.addPort(port);
    return this.getPortsData();
  }
  
}
