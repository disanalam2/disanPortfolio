import { useRef } from 'react';

export const useDragAndDrop = (listData, setListData) => {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    
    const updatedData = [...listData];
    const draggedItemContent = updatedData.splice(dragItem.current, 1)[0];
    updatedData.splice(dragOverItem.current, 0, draggedItemContent);
    
    setListData(updatedData);
    
    // Refs reset karo
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return { dragItem, dragOverItem, handleSort };
};