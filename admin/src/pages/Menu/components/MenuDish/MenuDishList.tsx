import { DishResponse } from '@shared/services/DishService';
import { DishCard } from '@admin/components/molecules/DishCard';
import { DishActions } from './types';
export interface MenuDishListProps {
  dishItems: DishResponse[];
  actions: DishActions;
  currentLanguage: string;
}

export const MenuDishList = (props: MenuDishListProps) => {
  const { dishItems, actions, currentLanguage } = props;

  return (
    <div className="menu-dish-list">
      {dishItems.map((item: DishResponse) => {
        return (
          <DishCard
            actions={actions}
            key={item.dish_id}
            dishItem={item}
            language={currentLanguage}
          />
        );
      })}
    </div>
  );
};
