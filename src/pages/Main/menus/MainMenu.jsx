import styled from 'styled-components';
import ComponentGroup from './ComponentGroup';
import {groupedDevices} from '../../../core/components'
import HeaderMenu from './HeaderMenu';

const ContainerMenu = styled.div`
    position: absolute;
    right: ${props => props.isOpen ? '0' : '-450px'};
    top: 0;
    height: 100vh;
    width: 450px;
    background: var(--menu-background);
    -webkit-box-shadow: -4px 0px 15px 0px rgb(0 0 0 / 60%);
    -moz-box-shadow: -4px 0px 15px 0px rgb(0 0 0 / 60%);
    box-shadow: -4px 0px 15px 0px rgb(0 0 0 / 60%);
    transition: all .3s ease-in-out;
    
`;

const Content = styled.div`
  padding-top: 15px;
  width: 410px;
  margin: 0 auto;
`;

export default function MainMenu({isOpen, close}){
    return (
        <ContainerMenu isOpen={isOpen}>
            <HeaderMenu/> 
            <Content>
                {groupedDevices.map(({ name, components }) => (
                <ComponentGroup
                    name={name}
                    components={components}
                    key={name}
                    isOpen={isOpen}
                    close={close}
                />
                ))}
            </Content>
        </ContainerMenu>
    )

}