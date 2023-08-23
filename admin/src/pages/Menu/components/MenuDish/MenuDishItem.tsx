import { Dish } from "@shared/services/DishService";
import { ActionMenu, IAction } from "@shared/components/atoms/ActionMenu"
export interface MenuDishItem {
  dishItem: Dish;
  actions: IAction<Dish>[];
}

const DISH_ID = "12e98cf4-6302-4d06-acdd-937879ae4a8f"

export const MenuDishItem = (props: MenuDishItem) => {
  const { dishItem, actions } = props;

  return (
  <li className="d-flex justify-content-between align-items-center my-2">
    {dishItem.name}
    <ActionMenu entity={dishItem} actions={actions}/>
  </li>
  );
};
