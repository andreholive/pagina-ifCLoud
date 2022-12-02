import Cirros from './Cirros/CirrosRegister';
import Switch from './Switch/SwitchRegister';
import Router from './Router/RouterRegister';
import Lubuntu from './Lubuntu/LubuntuRegister';
import DebianServer from './DebianServer/DebianServerRegister';
import UbuntuDesktop from './UbuntuDesktop/UbuntuDesktopRegister';

const devices = [
  Switch,
  Router,
  Lubuntu,
  Cirros,
  DebianServer,
  UbuntuDesktop
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
