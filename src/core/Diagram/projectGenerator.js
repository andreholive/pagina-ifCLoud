function comparePorts(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
  }

function generatePorts(portsArray){
    portsArray = portsArray.sort();
    const ports = [];
    for(var i=0; i<portsArray.length; i++){
        ports.push({
            alignment: undefined,
            build: false,
            id: portsArray[i].id,
            input: true,
            links: null,
            locked: false,
            name: portsArray[i].name,
            gateway: portsArray[i].gateway,
            parentNode: portsArray[i].deviceId,
            networkId: portsArray[i].networkId,
            subnetId: portsArray[i].subnetId,
            macAddr: portsArray[i].macAddr,
            fixedIp: portsArray[i].fixedIp,
            selected: false,
            status: portsArray[i].status,
            state: portsArray[i].state,
            enabled: portsArray[i].enabled,
            type: "Port",
            value: null,
            x: 0,
            y: 0,
        })
    }
    return ports.sort(comparePorts);
}

function generateModels(devices){
    let models = [];
    for(var i=0; i<devices.length; i++){
        models.push({
            name: devices[i].name,
            type: devices[i].type,
            id: devices[i].id,
            locked: devices[i].locked,
            ports: generatePorts(devices[i].ports),
            selected: false,
            status: devices[i].status,
            x: devices[i].x,
            y: devices[i].y,
            })
    }
    return models;
}

function generateLinks(links){
    let models = [];
    for(var i=0; i<links.length; i++){
        models.push({
            id: links[i].id,
            sourcePort: links[i].sourcePort,
            targetPort: links[i].targetPort,
            source: links[i].source,
            target: links[i].target,
            labels: [{
                extras: undefined,
                id: links[i].sourcePort,
                label: links[i].sourceLabel,
                locked: undefined,
                offsetX: 0,
                offsetY: 0,
                selected: undefined,
                type: "default",
            },{
                extras: undefined,
                id: links[i].targetPort,
                label: links[i].targetLabel,
                locked: undefined,
                offsetX: 0,
                offsetY: 0,
                selected: undefined,
                type: "default",
            }],
            points: [{
                extras: undefined,
                id: "1",
                locked: undefined,
                selected: undefined,
                type: "point",
                x: 0,
                y: 0,
            },
            {
                extras: undefined,
                id: "2",
                locked: undefined,
                selected: undefined,
                type: "point",
                x: 0,
                y: 0,
            }],
            type: "link",
            })
    }
    return models;
}

export default function generateProject(project){
    const models = generateModels(Object.values(project.devices));
    const links = generateLinks(Object.values(project.links));
    let diagram = {
      id: localStorage.getItem("projectID"),
      locked: false,
      offsetX: 0,
      offsetY: 0,
      zoom: 100,
      gridSize: 15,
      layers:[
          {
              id:"1",
              type:"diagram-links",
              isSvg:true,
              transformed:true,
              models: links
          },
          {
              id:"2",
              type:"diagram-nodes",
              isSvg:false,
              transformed:true,
              models: models
          }
      ]
  }
  return diagram;
}