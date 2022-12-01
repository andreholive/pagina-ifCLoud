import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal, faPowerOff, faSync, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Tooltip from 'react-tooltip';
import styled from 'styled-components';

const engineStub = {
  registerListener: () => {},
  getCanvas: () => {},
  getPortCoords: () => ({
    getWidth: () => {},
    getHeight: () => {},
    getTopLeft: () => {},
  }),
  getModel: () => ({ isLocked: () => false }),
};


const DeviceArea = styled.div`
  display: flex;  
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 450px;
  height: 201px;
  margin: 0 auto;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
  overflow: hidden;
  background-color: #8fa1ce;
`;

const Device = styled.div`
  margin: 0 auto;
  position: relative;
`;

const Title = styled.h1`
  flex-grow: 1;
  font-size: 1.5em;
  margin: 0;
  align-self: center;
  text-align: center;
  color: #FFF;
`;

const Header = styled.div`
  margin-top: 7px;
  align-content: space-between;
  position: absolute;
  width: 100%;
`;

const Menu = styled.div`
  margin-top: 7px;
  position: absolute;
  width: fit-content;
  height: 36px;
  top: 146px;
  background-color: #FFF;
  border-radius: 4px 4px 14px 14px;
  box-shadow: 0 1px 4px -1px rgba(18, 22, 33, .24);
`;

const MenuButtons = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 12px;
  list-style: none;
  display: grid;
  position: relative;
  overflow: hidden;
  text-align: center;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const Button = styled.button`
  align-items: center;
  height: 36px;
  justify-content: center;
  display: flex;
  width: 36px;
  cursor: pointer;
  transition: all .3s linear;
  border: none;
  background: transparent;
  ${props => {
    if(props.status == 2 || props.status == 4) return `color: #ccc;`;
    return `color: black;`;
  }}
  opacity: 1;
  :hover {
    color: #8fa1ce;
  }
`;

const VisualDevice = ({
  device,
  close,
  engine
}) => {
  if(device){
  const {Widget, type, Model, name} = engine.getEngine().nodeFactories.factories[device.options.type];
  const model = new Model(type, name);
  model.status = device.status;
  model.ports = device.ports;
 
  return (
    <>
    <Header>
        <Title>{model.name}</Title>
    </Header>
    <DeviceArea className='device-menu-background'>
      <Device>
      <Widget
          engine={engineStub}
          model={model}
          lockMenu={true}
      />
      </Device>
      <Menu>
      <MenuButtons>
      <Tooltip id="device-options" globalEventOff="click" />
        <Button onClick={() => {
          close();
          engine.getEngine().model.fireEvent({ device: device.original }, 'getTerminalUrl')
          }} 
          status={model.status}
          data-for="device-options"
          data-tip="Acessar"
          data-place="bottom"
          disabled={model.status==4 || model.status==2 || model.device == 2 || model.device == 1}>
            <FontAwesomeIcon icon={faTerminal} />
        </Button>
        <Button 
          disabled={model.status===2 || model.device == 2 || model.device == 1}
          data-for="device-options"
          data-tip={model.status==1 ? "Desligar" : "Ligar"}
          data-place="bottom" 
          onClick={() => {
          close();
          if(model.status==1)engine.getEngine().model.fireEvent({ device: device.original }, 'powerOff');
          if(model.status==4)engine.getEngine().model.fireEvent({ device: device.original }, 'powerOn');
          }}>
          <FontAwesomeIcon icon={faPowerOff} />
        </Button>
        <Button
          data-for="device-options"
          data-tip="Reiniciar"
          data-place="bottom"
          onClick={() => {
          close();
          engine.getEngine().model.fireEvent({ device: device.original }, 'reboot')
          }} 
          status={model.status}
          disabled={model.status==4 || model.status==2 || model.device == 2 || model.device == 1}
          >
          <FontAwesomeIcon icon={faSync} />
        </Button>
        <Button
          data-for="device-options"
          data-tip="Excluir"
          data-place="bottom"
          onClick={() => {
          close();
          engine.getEngine().model.fireEvent({ device: device.original }, 'deleteDevice')
          }}>
          <FontAwesomeIcon icon={faTrashAlt}/>
        </Button>
      </MenuButtons>
      </Menu>
    </DeviceArea>
    </>
  )}
};

export default VisualDevice;
