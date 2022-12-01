import { BaseModel } from '../../BaseModel';
import PortModel from '../../Port/PortModel';

export default class RouterModel extends BaseModel {
  initialize() {
    this.type = 'router';
    this.device = 1;
    this.status=1;
  }

  addPort(portData) {
    if (portData instanceof PortModel){
      super.addPort(portData);
      return;
    }
    const port = new PortModel(portData);
    port.fixedIp = portData.fixedIp;
    port.macAddr = portData.macAddr
    super.addPort(port);
  }

  generatePorts(){
    return this.getPortsData();
  }
  
}
