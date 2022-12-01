import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faLinkSlash } from "@fortawesome/free-solid-svg-icons";
import Tooltip from 'react-tooltip';
import { PORTSTATE } from '../../../core/Port/PortModel';

const Port = styled.div`
    position: relative;
    height: 60px;
    width: 100%;
    margin-bottom: 10px;
    background: ${props => {
      if(!props.enabled){
        return '#ffd4d4'
      }
      if(props.state == PORTSTATE.connected){
        return '#d9ffdf'
      }
      if(props.state == PORTSTATE.connecting || props.state == PORTSTATE.disconnecting){
        return '#ffe9d9';
      }
      if(props.state == PORTSTATE.disconnected){
        return 'rgb(88, 88, 88)';
      }
      if(props.state == PORTSTATE.standBy){
        return 'rgb(88, 88, 88)';
      }
    }};
    transition: all .3s ease-in-out;
`;

const PortInfo = styled.div`
    position: relative;
    float: left;
    height: 60px;
    width: 150px;
    font-size: 11px;
    padding: 5px;
    transition: all .3s ease-in-out;
`;

const PortIcon = styled.div`
    position: relative;
    float: left;
    height: 60px;
    width: 50px;
    padding: 15px 10px;
`;

const PortName = styled.div`
    position: relative;
    float: left;
    height: 20px;
    width: 120px;
    font-weight: bold;
    font-size: 16px;
`;

const PortFixedIp = styled.div`
    position: relative;
    float: left;
    height: 15px;
    width: 120px;
    font-size: 13px;
`;
const PortMacAddr = styled.div`
    position: relative;
    float: left;
    height: 15px;
    width: 120px;
    font-size: 12px;
    color: #888
`;

const Icon = styled.div`
    position: relative;
    float: left;
    height: 60px;
    padding: 2px;
    transition: all .3s ease-in-out;
`;

const PortEdit = ({port, diagram, close}) => {

function iconGenerator(){
  const link = port.getLink();
  if(link){
  if(link.sourcePort != port){
    const {Icon} = diagram.getEngine().nodeFactories.factories[link.sourcePort.parent.options.type];
    return <Icon size={70}/>
  }
  if(link.targetPort != port){
    const {Icon} = diagram.getEngine().nodeFactories.factories[link.targetPort.parent.options.type];
    return <Icon size={70}/>
  }
  }
  return null;
}

return (
    <Port state={port.state} enabled={port.enabled}>
      <Tooltip id="port-tooltip" globalEventOff="click" />
      <PortIcon>
      <svg 
    viewBox="0 0 32.96 33.99"
    data-name={port.options.name}
    data-nodeid={port.parent.options.id}
    port={port}
    width="30"
    height="30"
    >
    <g>
      <path fill="#808080" d="M29.44,33.99H3.51C1.57,33.99,0,32.42,0,30.48V3.51C0,1.57,1.57,0,3.51,0h25.93c1.94,0,3.51,1.57,3.51,3.51
        v26.96C32.96,32.42,31.38,33.99,29.44,33.99z"/>
      <g>
        <polygon fill="#46515C" points="28.88,5.2 4.08,5.2 4.08,22.66 11.47,22.66 11.47,28.79 21.49,28.79 21.49,22.66 28.88,22.66 		
          "/>
        <g>
          <rect x="8.25" y="5.2" fill="#FEFEFE" width="2.72" height="5.53"/>
          <rect x="12.83" y="5.2" fill="#FEFEFE" width="2.72" height="5.53"/>
          <rect x="17.41" y="5.2" fill="#FEFEFE" width="2.72" height="5.53"/>
          <rect x="21.99" y="5.2" fill="#FEFEFE" width="2.72" height="5.53"/>
        </g>
      </g>
      <path fill={port.getColor()} d="M9.16,30.42H2.3c-0.5,0-0.9-0.43-0.9-0.96v-3.12c0-0.53,0.4-0.96,0.9-0.96h6.86c0.5,0,0.9,0.43,0.9,0.96
        v3.12C10.06,29.99,9.66,30.42,9.16,30.42z"/>
    </g>
    </svg>
    </PortIcon>
      <PortInfo className={port.state}>
      <PortName>{port.options.name}</PortName>
      <PortMacAddr>{port.macAddr}</PortMacAddr>
      <PortFixedIp>{port.fixedIp}</PortFixedIp>
      </PortInfo>
      <Icon>{iconGenerator()}</Icon>
      { port.state === PORTSTATE.connected || port.state === PORTSTATE.standBy ? 
      <FontAwesomeIcon 
        className='port-button-option' 
        icon={faLinkSlash} 
        onClick={() => {
          close();
          diagram.getEngine().model.fireEvent({port}, 'disconnect');
        }}
        data-for="port-tooltip"
        data-tip={"Desconectar Porta"}
        data-place="bottom"
      /> : ''}
      {Object.values(port.links).length != 0 && port.state != PORTSTATE.disconnected 
      && port.state != PORTSTATE.standBy ? 
      <FontAwesomeIcon
        data-for="port-tooltip"
        data-tip={port.enabled ? 'Desativar Porta' : 'Ativar Porta'}
        data-place="bottom"
        className='port-button-option'
        icon={faPowerOff} 
        onClick={() => {
          if(port.enabled){
            diagram.getEngine().model.fireEvent({port}, 'disableLink');
          }
          if(!port.enabled){
            diagram.getEngine().model.fireEvent({port}, 'enableLink');
          }
        }}/> : ''}
    </Port>
  );
};

export default PortEdit;