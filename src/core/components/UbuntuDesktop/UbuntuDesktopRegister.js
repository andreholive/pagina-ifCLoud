import {Device}  from '../../Device';

import icon from '../../deviceIcons/DesktopIcon';
import model from './UbuntuDesktopModel';
import widget from './UbuntuDesktopWidget';

export default new Device({
  type: 'ubuntudesktop',
  name: 'Ubuntu 18.04',
  description: 'Ubuntu Desktop',
  group: 'Hosts',
  model,
  widget,
  icon,
});
