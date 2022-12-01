import {useState, useEffect} from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Tooltip from 'react-tooltip';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';


import DiagramEngine from '../../core/Diagram/DiagramEngine';
import Logo from './Logo';
import ButtonMenu from './menus/ButtonMenu';
import MainMenu from './menus/MainMenu';
import DeviceEditMenu from './menus/DeviceEditMenu';
import DroppableLayer from './DroppableLayer';
import './index.css';
import Notifications from '../../core/notifications/Notifications';

const FullscreenCanvas = styled(CanvasWidget)`
  height: 100%;
  width: 100%;
`;

const NotificationArea = styled.div`
position: absolute;
bottom: 20px;
left: 20px;
z-index: 100;
width: 350px;
height: auto;
`;

function UID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

let timeout;

export default function Project(){
    let navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuEdit, setMenuEdit] = useState(false);
    const [deviceEdit, setDeviceEdit] = useState(false);
    const [diagram, setDiagram] = useState(false);
    const [notification, setNotifications] = useState([]);
    
    useEffect(() => {
        if(!localStorage.getItem("userId")){
            navigate("/?error=true", { replace: true });
            return;
        }
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
          });
        setDiagram(new DiagramEngine(editDevice, updateEditMenu, goToLogin, sendNotification))
    },[]);

    function openCloseMenu(){
        editDevice(false);
        if(menuOpen){
            setMenuOpen(false);
            return;
        }
        setMenuOpen(true);
    }

    function goToLogin(){
        navigate("/?error=true", { replace: true });
    }

    function editDevice(device){
        if(device)device.original = device;
        setMenuOpen(false);
        setDeviceEdit(device);
        if(device)setMenuEdit(true);
        if(!device)setMenuEdit(false);
    }

    function closeMenus(){
        setMenuOpen(false);
        setDeviceEdit(false);
        setMenuEdit(false);
    }

    function updateEditMenu(){
        setDeviceEdit(deviceEdit => {
            if(deviceEdit){
                deviceEdit.original = deviceEdit.original;
                return {...deviceEdit}
            }
            return false;
        });
    }

    function sendNotification(notify){
        const notificationObject = {
            id: UID(),
            caller: notify.type,
            msg: notify.msg,
            selfDestroy: () => {
                const index = notification.findIndex(n => n.id == this.id);
                setNotifications([...notification.filter((item, i) => i !== index)]);
            }
        }
        setNotifications(prevItems => [...prevItems, notificationObject]);
        clearTimeout(timeout);
        timeout = setTimeout(() => notificationObject.selfDestroy(), 5000);
    }

    return (
        <div className='diagram'>
            <Logo/>
            {diagram ? <>
            <DroppableLayer handleDeviceDrop={(...args) => diagram.handleDeviceDrop(...args) } disabled={diagram.isLocked()}>
                <FullscreenCanvas engine={diagram.getEngine()} className={diagram.isLocked() ? 'locked' : 'unlocked'}/>
            </DroppableLayer>
            <Tooltip id="tooltip" globalEventOff="click" />
            <ButtonMenu isOpen={menuOpen} setOpen={openCloseMenu}/>
            <DeviceEditMenu isOpen={menuEdit} device={deviceEdit} diagram={diagram} close={closeMenus}/>
            <MainMenu isOpen={menuOpen} close={closeMenus}/>
            <NotificationArea>
                {notification.map(notify => (
                    <Notifications key={notify.id} notification={notify} />
                ))}
            </NotificationArea>
            </>
            : null}
        </div>
    )

}