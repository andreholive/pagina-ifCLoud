import { PORTSTATE } from "../../Port/PortModel";

const diagramHandlers = (diagram) => {
  return {
    diagramLoad: ({devices, links}) => {
      diagram.load({devices, links})
    },

    removeDevice: (data) => {
      const device = diagram.selectNodeById(data.id);
      diagram.notify({type:diagram.getEngine().nodeFactories.factories[device.type], msg:`Dispositivo Removido!`})
      diagram.removeDevice(data.id);
    },

    createDevice: (deviceData) => {
      const device = diagram.selectNodeById(deviceData.id);
      if(device.device !== 3){
        device.setStatus(1);
        diagram.updateCanvas();
      }
      diagram.notify({type:diagram.getEngine().nodeFactories.factories[device.type], msg:`Dispositivo Adicionado!`})
    },

    changeDevicePosition: ({ deviceId, position }) => {
      const device = diagram.selectNodeById(deviceId);
      if(device)console.log(device)
    },

    updateInstanceStatus: (deviceData) => {
      diagram.updateDeviceStatus(deviceData)
    },

    gotoLogin(data){
      diagram.goToLogin();
    },

    addRouterPort: (port) => {
      const device = diagram.selectNodeById(port.deviceId);
      device.setStatus(1);
      device.addPort(port);
      diagram.notify({type:diagram.getEngine().nodeFactories.factories[device.type], msg:`Interface Adicionada!`})
      diagram.updateCanvas();
    },

    moveDevice: (data)=> {
      //diagram.setDevicePosition(data)
    },

    accessVncUrl: ({url}) => {
        window.open(`${url}&scale=50`, "_blank", "toolbar=no,scrollbars=no,resizable=no,top=400,left=500,width=1028,height=770,titlebar=no,menubar=no");
    },

    connectPort: (port) => {
      const device = diagram.selectNodeById(port.deviceId);
      if(device){
        const devicePort = device.selectPortById(port.id);
        devicePort.getLink().connect(port);
        }
        diagram.updateCanvas();
        diagram.notify({type:diagram.getEngine().nodeFactories.factories[device.type], msg:`Dispositivo Conectado!`})
    },

    disconnectPort: (port) => {
      const device = diagram.selectNodeById(port.deviceId);
      if(device){
        const devicePort = device.selectPortById(port.id);
        devicePort.getLink().disconnect();
        }
        diagram.updateCanvas();
        diagram.notify({type:diagram.getEngine().nodeFactories.factories[device.type], msg:`Dispositivo Desconectado!`})
    },
    
    createLink: (data) => {
      diagram.updateCanvas();
    },

    deleteLink: (linkData)=> {
      const link = diagram.selectLinkById(linkData.id);
      if(link)link.remove();
      diagram.updateCanvas();
    },

    enableLink(linkData){
      const link = diagram.selectLinkById(linkData.id);
      link.enable();
      diagram.updateCanvas();
    },

    disableLink(linkData){
      const link = diagram.selectLinkById(linkData.id);
      link.disable();
      diagram.updateCanvas();
    }
  }
};

export default diagramHandlers;
