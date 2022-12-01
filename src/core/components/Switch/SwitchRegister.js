import {Device}  from '../../Device';

import icon from '../../deviceIcons/SwitchIcon';
import model from './SwitchModel';
import widget from './SwitchWidget';

export default new Device({
  type: 'switch',
  name: 'Switch',
  description: 'Switch 8 Portas',
  group: 'Infra-estrutura',
  model,
  widget,
  icon,
});
