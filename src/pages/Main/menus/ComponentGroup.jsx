import { useState } from 'react';
import styled from 'styled-components';
import { Chevron } from './Icons';
import DraggableComponent from './DraggableComponent';

const DragArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 130px;
  margin: 0 auto;
  box-shadow: inset 0 0 16px rgb(34 34 34);
  background: var(--background);
  border-radius: 10px;
  overflow: hidden;
`;

const Container = styled.div`
  margin-bottom: 32px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 18px;
  color: #464646;
`;

const HorizontalSeparator = styled.hr`
  flex-grow: 1;
  align-self: center;
  margin: 16px;
  border-top: 1px solid black;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  width: 50px;
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'none')};
`;

const ComponentsGrid = styled.div`
  display: ${props => (props.isOpen ? 'grid' : 'none')};
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;

const ComponentGroup = ({
  name,
  components,
  isOpen,
  close,
}) => {
  const [groupOpen, setGroupOpen] = useState(true);

  return (
    <Container>
      <Header onClick={() => setGroupOpen(!groupOpen)}>
        <Title>{name}</Title>
        <HorizontalSeparator />
        <IconButton isOpen={groupOpen} onClick={() => setGroupOpen(!groupOpen)}>
          <Chevron />
        </IconButton>
      </Header>
      <ComponentsGrid isOpen={groupOpen}>
        {components.map((component, index) => (
          <DragArea error={false} key={index}>
            <DraggableComponent
                  component={component}
                  isOpen={isOpen}
                  close={close}
            />
          </DragArea>
        ))}
      </ComponentsGrid>
    </Container>
  );
};

export default ComponentGroup;
