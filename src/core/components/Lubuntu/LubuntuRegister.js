import {Device}  from '../../Device';

import icon from '../../deviceIcons/DesktopIcon';
import model from './LubuntuModel';
import widget from './LubuntuWidget';

export default new Device({
  type: 'lubuntu',
  name: 'Lubuntu',
  description: 'A Light ubuntu version',
  group: 'Hosts',
  model,
  widget,
  icon,
});
