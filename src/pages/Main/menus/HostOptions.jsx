import {useState} from 'react';
import {Content, Label, Input, PortsContent} from './components';
import PortEdit from './PortEdit'




const HostOptions = ({device, diagram, close})=> {
    const [name, setName] = useState(device.name);

    return (
    <Content>
        <Label>Nome do dispositivo</Label>
        <Input 
            placeholder="Nome do Dispositivo" 
            value={name}
            onChange={e => {setName(e.target.value)}}
        />
        <Label>Interfaces</Label>
        <PortsContent className='scroll1'>
            {Object.values(device.ports).map(port => (
            <PortEdit port={port} diagram={diagram} key={port.options.id} close={close}/>
            ))}
        </PortsContent>
    </Content>
    )
}

export default HostOptions;