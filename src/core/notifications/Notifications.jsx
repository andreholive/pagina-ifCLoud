import { useState } from 'react';
import { useEffect } from 'react';
import styled, {keyframes} from 'styled-components';

const ContainerAnimation = keyframes`
 0% { height: 0px; width: 0px; }
 1% { height: 90px; width: 90px;}
 15% { height: 90px; width: 90px;}
 16% { height: 90px; width: 300px;}
 75% { height: 90px; width: 300px;}
 76% { height: 90px; width: 90px;}
 99% { height: 90px; width: 90px;}
 100% { height: 0px; width: 0px;}
`

const Container = styled.div`
position: relative;
margin 10px 0;
width: 0px;
height: 0px;
background: rgb(88,88,88);
animation-name: ${ContainerAnimation};
animation-duration: 5s;
animation-iteration-count: 1;
animation-timing-function: linear;
border-radius: 90px;
overflow: hidden;
box-shadow: 0 5px 10px rgba(0,0,0,0.4);
`;

const Message = styled.div`
  position: relative;
  float: left;
  width: 210px;
  height: 20px;
  overflow: hidden;
  padding: 35px 0;
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  
`;

const Icon = styled.div`
  position: relative;
  float: left;
  width: 70px;
  height: 70px;
  margin: 10px;
  border-radius: 60px;
  background: #b5c0ff;
`;

const IconWrap = styled.div`
  position: relative;
  float: left;
  width: 70px;
  height: 70px;
  margin: 20px 5px;
`;


function NotificationIcon({node}){
    if(node){
        const {Icon} = node;
        return (
            <Icon size={60}/>
        )
    }
    
  }

function Notifications({notification}){

const [notify] = useState(notification);
if(notification){
return (
<Container>
    <Icon>
        <IconWrap>
            <NotificationIcon node={notify.caller} />
        </IconWrap>
    </Icon>
    <Message>{notify.msg}</Message>
</Container>
)}
};

export default Notifications;