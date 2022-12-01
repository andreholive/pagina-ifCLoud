import {Device}  from '../../Device';

import icon from '../../deviceIcons/RouterIcon';
import model from './RouterModel';
import widget from './RouterWidget';

export default new Device({
  type: 'router',
  name: 'Roteador',
  description: 'A simple Router',
  group: 'Infra-estrutura',
  model,
  widget,
  icon,
});
