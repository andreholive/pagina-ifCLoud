import styled from 'styled-components';
import RouterOptions from './RouterOptions';
import HostOptions from './HostOptions';
import SwitchOptions from './SwitchOptions';
import VisualDevice from './VisualDevice';

const ContainerMenu = styled.div`
    position: absolute;
    left: ${props => props.isOpen ? '0' : '-450px'};
    top: 0;
    height: 100vh;
    width: 450px;
    background: var(--menu-background);
    -webkit-box-shadow: 4px 0px 15px 0px rgb(0 0 0 / 60%);
    -moz-box-shadow: 4px 0px 15px 0px rgb(0 0 0 / 60%);
    box-shadow: 4px 0px 15px 0px rgb(0 0 0 / 60%);
    transition: all .3s ease-in-out;
    z-index: 100;
`;

export default function DeviceEditMenu({close, device, diagram, isOpen}){
    return (
        <ContainerMenu isOpen={isOpen}>
            <VisualDevice device={device} close={close} engine={diagram}/>
            {device.device == 1 ? <RouterOptions close={close} device={device} diagram={diagram}/> : null }
            {device.device == 2 ? <SwitchOptions close={close}  device={device} diagram={diagram}/> : null }
            {device.device == 3 ? <HostOptions close={close} device={device} diagram={diagram}/> : null }
        </ContainerMenu>
    )

}