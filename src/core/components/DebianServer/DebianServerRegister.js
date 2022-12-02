import {Device}  from '../../Device';

import icon from '../../deviceIcons/ServerIcon';
import model from './DebianServerModel';
import widget from './DebianServerWidget';

export default new Device({
  type: 'debianserver',
  name: 'Debian 11 Server',
  description: 'Server Debian',
  group: 'Hosts',
  model,
  widget,
  icon,
});
