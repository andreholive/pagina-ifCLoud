import { Point } from '@projectstorm/geometry';
import createEngine, {DiagramModel} from '@projectstorm/react-diagrams';

import WebSocket from '../../services/websocket';
import LinkFactory from '../Link/LinkFactory';
import PortFactory from '../Port/PortFactory';
import ZoomAction from './actions/ZoomAction';
import States from './states/States';
import devices from '../../core/components';
import generateProject from './projectGenerator';
import diagramHandlers from './Command/diagramHandlers';
import websocketHandler from './Command/websocketHandler';

export default class DiagramEngine {
  constructor(editDevice, updateEditMenu, goToLogin, setNotifications) {
    this.projectId = localStorage.getItem("projectID");
    this.devices = devices;
    this.locked = false;
    this.editDevice = editDevice;
    this.notify = setNotifications;
    this.updateEditMenu = updateEditMenu;
    this.goToLogin = () => goToLogin();
    this.initializeEngine();
    this.initializeModel();
  }

  getEngine = () => this.engine;

  initializeEngine = () => {
    this.engine = createEngine({
      registerDefaultDeleteItemsAction: false,
      registerDefaultZoomCanvasAction: false,
    });
    this.engine.editDevice = this.editDevice;
    this.engine.registerListener(diagramHandlers(this));
    this.engine.getActionEventBus().registerAction(new ZoomAction());
    this.engine.getPortFactories().registerFactory(new PortFactory());
    this.engine.getLinkFactories().registerFactory(new LinkFactory());
    this.registerDevices();
  };

  updateCanvas = async () => {
    await this.engine.repaintCanvas(true);
    this.updateEditMenu();
  }

  initializeModel = () => {
    this.model = new DiagramModel();
    this.model.setGridSize(15);
    this.model.setLocked(false);
    this.model.registerListener({
      eventDidFire: event => {
        const type = event.function;
        if (type === 'offsetUpdated') this.adjustGridOffset(event);
        if (type === 'zoomUpdated') this.adjustGridZoom(event);
      },
    });
    this.socket = new WebSocket(this.engine)._socket();
    this.engine.getStateMachine().pushState(new States(this.model));
    this.model.registerListener(websocketHandler(this.socket));
    this.engine.registerListener({gotoLogin: ()=> {
      this.socket.emit('disconnect', '')
    }});
    this.realignGrid();
    this.engine.setModel(this.model);
  };

  zoom(){
    this.engine.zoomToFit(50);
  }

  registerDevices = () => {
    this.devices.forEach(device => {
      this.engine.getNodeFactories().registerFactory(device);
    });
  };

  serialize = () => this.model.serialize();

  isProjectEmpty(project){
    if (project.devices.length == 0) return true;
    return false;
  };

  selectNodeById(nodeId){
    const nodes = this.model.getNodes();
    const index = Object.values(nodes).findIndex(node => {
    if(nodeId == node.options.id){
        return nodeId == node.options.id;
    } 
    });
    return nodes[index];
  }

  selectLinkById(linkId){
    const link = this.model.getLink(linkId);
    return link;
  }

  updateDevice(deviceData){
    const node = this.selectNodeById(deviceData.id);
    node.updateData(deviceData);
  }

  setDevicePosition(data){
    const device = this.selectNodeById(data.deviceId);
    device.setPosition(data.position)
  }

  updateDeviceStatus(deviceData){
    const device = this.selectNodeById(deviceData.id);
    if(device){
      if(deviceData.status !== 2){
        device.setLocked(false);
      }
      device.setStatus(deviceData.status);
      this.updateCanvas(); 
    }
  }

  disconnectHost(data){
    const device = this.selectNodeById(data.hostId);
    Object.values(device.getPorts()).map(port => {
      if(port.options.id == data.portId){
        port.openstackData = {id: null, networkId: null, subnetId: null}
      }
    });
    this.updateCanvas();
  }


  connectHost(data){
    const device = this.selectNodeById(data.host);
    Object.values(device.getPorts()).map(port => {
        if(port.options.id == data.port){
          port.openstackData = {id: data.openStack.port_id, networkId: data.openStack.net_id, subnetId: null}
        }
    })
  }

  setLinkStatus(data){
    this.model.setLocked(false);
    const device = this.selectNodeById(data.link.source);
    Object.values(device.getPorts()).map(port => {
      if(port.options.id == data.link.sourcePort){
        port.getMainLink().setStatus(data.status);
        port.getMainLink().setSelected(!port.getMainLink().options.selected);
      }
    });
    this.updateCanvas();
  }

  addLink(data){
    
  }

  removeDevice(deviceId){
    const device = this.selectNodeById(deviceId);
    if(device){
      device.remove();
    }
    this.updateCanvas();
  }
  
  load = async (msg) => {
    if (this.isProjectEmpty(msg)) return;
    const mountedProject = generateProject(msg);
    this.model.deserializeModel(mountedProject, this.engine);
    this.realignGrid();
    await this.updateCanvas();
  };
  
  setLocked = locked => {
    this.model.setLocked(locked);
    this.locked = locked;
  };

  isLocked = () => this.locked;

  repaint = () => this.engine.repaintCanvas();

  realignGrid = () => {
    this.adjustGridOffset({
      offsetX: this.model.getOffsetX(),
      offsetY: this.model.getOffsetY(),
    });

  this.adjustGridZoom({
      zoom: this.model.getZoomLevel(),
    });
  };

  adjustGridOffset = ({ offsetX, offsetY }) => {
    document.body.style.setProperty('--offset-x', `${offsetX}px`);
    document.body.style.setProperty('--offset-y', `${offsetY}px`);
  };

  adjustGridZoom = ({ zoom }) => {
    const { gridSize } = this.model.getOptions();
    document.body.style.setProperty(
      '--grid-size',
      `${(gridSize * zoom) / 100}px`,
    );
  };

  handleDeviceDrop = (event, node) => {
    const { Model } = this.devices.find(
      c => c.type === node.type,
    );
   const getSnappedRelativeMousePoint = () => {
      const { x, y } = this.engine.getRelativeMousePoint(event);
      return new Point(
        Math.round(x / 15) * 15,
        Math.round(y / 15) * 15,
      );
    };
    const point = event
      ? getSnappedRelativeMousePoint(event)
      : new Point(0, 0);
    const device = new Model(node.type, node.name);
    console.log(device)
    device.setPosition(point);
    this.model.addNode(device);
    this.model.fireEvent({ device }, 'addDevice');
    this.engine.repaintCanvas();  
  };

  createDevice(data){//implementar para o modo online
    console.log('createDevice',data)
  }

}
