import { useState, useEffect } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  DroppableProvided,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { DishResponse } from '@shared/services/DishService';
import { DishCard } from '@admin/components/molecules/DishCard';
import { CustomDroppable } from '@admin/components/molecules/CustomDroppable/CustomDroppable';
import { DishActions } from './types';

export interface MenuDishListProps {
  dishItems: DishResponse[];
  actions: DishActions;
  currentLanguage: string;
  onReorder: (newOrder: string[]) => void;
}

const reorder = (
  list: DishResponse[],
  startIndex: number,
  endIndex: number
): DishResponse[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  background: isDragging ? '#BDC7BF' : '',
  borderRadius: 16,
  marginBottom: 24,
  ...draggableStyle,
});

export const MenuDishList = (props: MenuDishListProps) => {
  const { dishItems, actions, currentLanguage, onReorder } = props;

  const [innerDishItems, setInnerDishItems] = useState<DishResponse[]>([]);

  useEffect(() => {
    setInnerDishItems(dishItems);
  }, [dishItems]);

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    const items: DishResponse[] = reorder(
      innerDishItems,
      result.source.index,
      result.destination.index
    );

    setInnerDishItems(items);
    onReorder(items.map(({ dish_id }) => dish_id));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CustomDroppable droppableId="droppable">
        {(
          provided: DroppableProvided & { placeholder?: React.ReactNode }
        ): JSX.Element => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="menu-dish-list">
              {innerDishItems.map((item: DishResponse, index) => (
                <Draggable
                  key={item.dish_id}
                  draggableId={item.dish_id}
                  index={index}
                >
                  {(provided, snapshot): JSX.Element => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <DishCard
                        actions={actions}
                        key={item.dish_id}
                        dishItem={item}
                        language={currentLanguage}
                        isDragable
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </CustomDroppable>
    </DragDropContext>
  );
};
