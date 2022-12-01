import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  width: 410px;
  height: 30px;
  align-content: space-between;
  font-size: 20px;
  color: #CCC
`;

const HeaderMenu = () => (
  <Header>
    Adicionar Dispositivo
  </Header>
  
);

export default HeaderMenu;