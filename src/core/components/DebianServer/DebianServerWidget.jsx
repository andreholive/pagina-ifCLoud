import { Port } from '../../Port/Port';
import Tooltip from 'react-tooltip';
import './host.css'
import styled from 'styled-components';
import { distributePorts } from '../portExtendUtils';
import ServerIcon from '../../deviceIcons/ServerIcon';

const PortsSlot = styled.div`
  position: absolute;
  top: 34px;
  right: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PositionedPort = styled(Port)`
  position: absolute;
  ${props =>  `left: ${props.position * 14 - 5}px;`}
  bottom: -10px;
`;

const DebianServerWidget = props => {
  const { model, engine } = props;
  const inputPorts = Object.values(model.getInputPorts());
  const portPositions = distributePorts(inputPorts.length);
  function getMouseCursor(){
    if(model.status === 2)return 'device-working';
    if(model.grabbing)return 'device-grabbing';
    return 'device-grab';
  }
  return (
    <div className={getMouseCursor()}>
      <PortsSlot>
      {inputPorts.map((port, i) => (
        <PositionedPort
          key={port.getName()}
          name={port.getName()}
          model={model}
          port={port}
          engine={engine}
          position={portPositions[i]}
        />
      ))}
      </PortsSlot>
      <Tooltip id="cirros" globalEventOff="click"/>
      <ServerIcon data-for="cirros" data-place="bottom" data-tip="ok" size={145} status={model.status} />
    </div>
  );
};

export default DebianServerWidget;
