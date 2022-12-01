import {Device}  from '../../Device';

import icon from '../../deviceIcons/ServerIcon';
import model from './CirrosModel';
import widget from './CirrosWidget';

export default new Device({
  type: 'cirros',
  name: 'Cirros',
  description: 'A basic virtual PC',
  group: 'Hosts',
  model,
  widget,
  icon,
});
