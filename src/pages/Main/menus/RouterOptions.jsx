import {useState} from 'react';
import styled from 'styled-components';
import {Content, Label, Input, PortsContent} from './components';
import PortEdit from './PortEdit'
import Tooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ButtonAddPort = styled.button.attrs(({ ...props }) => ({
    ...props,
    type: 'button',
  }))`
  z-index: 2;
  border: none;
  border-radius: 100%;
  background: #737fc7;
  width: 30px;
  height: 30px;
  margin: 10px;
  font-size: 1.3em;
  line-height: 1em;
  color: white;
  position: absolute;
left: 107px;
top: 286px;
box-shadow: 1px 1px 2px rgb(0 0 0 / 30%);
  `;

function UID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const RouterOptions = ({device, diagram, close})=> {
    const [name, setName] = useState(device.name);

    function addPort(){
        close();
        const num = Object.keys(device.ports).length
        if(num<2)
        {
        const port = {
            id: UID(),
            name: `eth${num}`,
            deviceId: device.options.id,
        }
        device.setStatus(2);
        device.setSelected(!device.isSelected());
        diagram.engine.model.fireEvent({ port }, 'portAdded');
        }
    }
    return (
    <Content>
        <Label>Nome do dispositivo</Label>
        <Input 
            placeholder="Nome do Dispositivo" 
            value={name}
            onChange={e => {setName(e.target.value)}}
        />
        <Label>Interfaces</Label>
        <PortsContent className='scroll'>
        {Object.values(device.ports).map(port => (
        <PortEdit port={port} key={port.options.id} diagram={diagram} close={close}/>
        ))}
        </PortsContent>
        <ButtonAddPort
        className={Object.values(device.ports).length == 0 ? "add-port-shine add-port" : "add-port"}
        data-for="addInterface"
        data-tip={"Adicionar Interface"}
        data-place="bottom"
        data-effect="solid"
        onClick={()=>addPort()}>
            <FontAwesomeIcon icon={faPlus}/>
        </ButtonAddPort>
        <Tooltip id="addInterface" globalEventOff="click" />
    </Content>
    )
}

export default RouterOptions