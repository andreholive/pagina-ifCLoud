import { BaseModel } from '../../BaseModel';
import PortModel from '../../Port/PortModel';

export default class SwichModel extends BaseModel {
  
  initialize() {
    this.type = 'switch';
    this.device = 2;
    this.status=1;
    this.gateway = false;
  }

  generatePorts(){
    for(let i = 0; i<8; i++){
      this.addPort(new PortModel({ name: `eth${i}` }));
    }
    return this.getPortsData();
  }


}
