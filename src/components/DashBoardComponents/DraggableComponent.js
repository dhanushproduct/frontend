// DraggableComponent.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableComponent = ({ id, onDrop, children }) => {
  const [, ref] = useDrag({ type: 'COMPONENT', item: { id } });
  const [, drop] = useDrop({
    accept: 'COMPONENT',
    hover: (draggedItem) => onDrop(draggedItem.id, id),
  });

  return <div ref={(node) => ref(drop(node))}>{children}</div>;
};

export default DraggableComponent;
