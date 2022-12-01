import Cirros from './Cirros/CirrosRegister';
import Switch from './Switch/SwitchRegister';
import Router from './Router/RouterRegister';
import Lubuntu from './Lubuntu/LubuntuRegister';

const devices = [
  Switch,
  Router,
  Lubuntu,
  Cirros
];

export default devices;

export const groupedDevices = devices.reduce(
  (acc, device) => {
    const group = acc.find(g => g.name === device.group);

    if (group) group.components.push(device);
    else acc.push({ name: device.group, components: [device] });

    return acc;
  },
  [],
);
