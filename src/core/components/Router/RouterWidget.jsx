import { Port } from '../../Port/Port';
import './router.css';
import styled from 'styled-components';
import { distributePorts } from '../portExtendUtils';
import RouterIcon from '../../deviceIcons/RouterIcon';

const PortsSlot = styled.div`
  position: absolute;
  top: 38px;
  right: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PositionedPort = styled(Port)`
  position: absolute;
  ${props =>  `left: ${props.position * 17 - 5}px;`}
  bottom: -10px;
`;

const RouterWidget = props => {
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
      <RouterIcon size={145} status={model.status}/>     
    </div>
  );
};

export default RouterWidget;
