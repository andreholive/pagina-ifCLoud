import { PORTSTATE } from "../../Port/PortModel";

const websocketHandler = (socket) => {
  const projectId = localStorage.getItem("projectID");
  return {
    addDevice: ({ device }) => {
      device.setStatus(2);
      device.setLocked(true);
      const msg = {
        action: 'createDevice',
        data: {
          id: device.options.id,
          name: device.name,
          type: device.type,
          device: device.device,
          instanceId: '',
          projectId,
          status: 2,
          locked: false,
          x: device.position.x,
          y: device.position.y,
          ports: device.generatePorts()       
      }
      }
        try {
          socket.emit(projectId, msg);
        } catch (error) {
          console.log("ERRO", error);
      }
    },

    powerOn: ({ device }) => {
      device.setStatus(2);
      device.setLocked(true);
      const msg = {
        action: 'instancePowerOn',
        data: device.options.id
      }
      try {
        socket.emit(projectId, msg);
      } catch (error) {
         console.log("ERRO", error);
      }
    },

    powerOff: ({ device }) => {
      device.setStatus(2);
      device.setLocked(true);
      const msg = {
        action: 'instancePowerOff',
        data: device.options.id
      }
      try {
        socket.emit(projectId, msg);
      } catch (error) {
         console.log("ERRO", error);
      }
    },

    reboot: ({ device }) => {
      device.setStatus(2);
      device.setLocked(true);
      const msg = {
        action: 'deviceReboot',
        data: device.options.id
      }
      try {
        socket.emit(projectId, msg);
      } catch (error) {
         console.log("ERRO", error);
      }
    },

    getTerminalUrl: ({ device }) => {
      const msg = {
        action: 'accessVncUrl',
        data: device.options.id
      }
      try {
        socket.emit(projectId, msg);
      } catch (error) {
          throw new Error();
      } 
    },

    deleteDevice: ({ device }) => {
      device.setStatus(2);
      device.setLocked(true);
      const msg = {
        action: 'removeDevice',
        data: {deviceId: device.options.id}
      }
      try {
        socket.emit(projectId, msg);
      } catch (error) {
        throw new Error();
      }
    },

    moving: (device) => {
      const msg = {
        action: 'moveDevice',
        data: device.options.id
      }
      try {
        //socket.emit(projectId, msg);
      } catch (error) {
         throw new Error();
      }
    },

    portAdded: ({ port }) => {
      const msg = {
        action: 'addRouterPort',
        data: port
      }
      try {
        socket.emit(projectId, msg);
      } catch (error) {
         throw new Error();
      }
    },

    deviceMove: ({ device }) => {
      if(!device.isLocked())
      {
      const msg = {
        action: 'changeDevicePosition',
        data: {
          deviceId:device.options.id, 
          position:{
            x: device.position.x,
            y: device.position.y,
          }
        }
        }
        try {
          socket.emit(projectId, msg);
        } catch (error) {
           throw new Error();
      }
      }
    },
    
    addLink: ({link}) => {
      link.start();
      const msg = {
        action: 'createLink',
        data: link.getLinkData(),
      }
      try {
        socket.emit(projectId, msg);
      } catch (error) {
         console.log("ERRO", error);
      }
    },

    disconnect: ({port}) => {
      port.getLink().setDisconnecting();
      const msg = {
        action: 'deleteLink',
        data: port.getLink().getLinkData(),
      }
      try {
        socket.emit(projectId, msg);
      } catch (error) {
         console.log("ERRO", error);
      }
    },

    disableLink: ({port}) => {
      if(!port.parent.isLocked()){
        const link = port.getMainLink();
        link.setDisconnecting();
        const msg = {
          action: 'disableLink',
          data: link.getLinkData(),
        }
        try {
          socket.emit(projectId, msg);
        } catch (error) {
          console.log("ERRO", error);
        }
      }
    },

    enableLink: ({port}) => {
      if(!port.parent.isLocked()){
        const link = port.getMainLink();
        link.setConnecting();
        const msg = {
          action: 'enableLink',
          data: link.getLinkData(),
        }
        try {
          socket.emit(projectId, msg);
        } catch (error) {
           console.log("ERRO", error);
        }
      }
    },
  }
};

export default websocketHandler;
