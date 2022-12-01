import Tooltip from 'react-tooltip';

const DraggableComponent = ({
  close,
  component: {type, Icon, name},
  
}) => (
  <div
    draggable="true"
    onDragStart={event => {
    Tooltip.hide();
    event.dataTransfer.setDragImage(event.currentTarget.children[0], 0, 0,);
    event.dataTransfer.setData(
        'component',
        JSON.stringify({
          type,
          name,
        }),
      );

      requestAnimationFrame(() => {
        Tooltip.hide();
        close()
      });
    }}
    data-for="tooltip"
    data-tip={name}
    data-place="bottom"
  >
   <Icon size={120}/>
  </div>
);

export default DraggableComponent;
