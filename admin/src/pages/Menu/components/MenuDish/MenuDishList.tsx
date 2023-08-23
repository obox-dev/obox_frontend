import { Dish } from "@shared/services/DishService";
import { MenuDishItem } from "./MenuDishItem";
import { IAction } from "@shared/components/atoms/ActionMenu"
export interface MenuDishListProps {
  dishItems: Dish[]
  actions: IAction<Dish>[];
}

export const MenuDishList = (props: MenuDishListProps) => {
  const { dishItems, actions } = props;

  return (
    <ul className="menu-dish-list p-0">
      {dishItems.map((item: Dish) => {
        return (<MenuDishItem actions={actions} key={item.dish_id} dishItem={item}/>)
      })}
    </ul>
  )
}
