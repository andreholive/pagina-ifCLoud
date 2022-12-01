import { Port } from '../../Port/Port';
import './host.css';
import styled from 'styled-components';
import { distributePorts } from '../portExtendUtils';
import DesktopIcon from '../../deviceIcons/DesktopIcon';

const PortsSlot = styled.div`
  position: absolute;
  bottom: 33px;
  right: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PositionedPort = styled(Port)`
  position: absolute;
  ${props =>  `left: ${props.position * 14 - 5}px;`}
  bottom: -10px;
`;

const LubuntuWidget = props => {
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
      <DesktopIcon status={model.status} size={120}/>
    </div>
  );
};

export default LubuntuWidget;
