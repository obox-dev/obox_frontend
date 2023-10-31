import { Dish } from '@shared/services/DishService';
import { ActionMenu, IAction } from '@shared/components/atoms/ActionMenu';
export interface MenuDishItem {
  dishItem: Dish;
  actions: IAction<Dish>[];
}

export const MenuDishItem = (props: MenuDishItem) => {
  const { dishItem, actions } = props;

  return (
    <tr className="align-middle">
      <td width={120}>{dishItem.state}</td>
      <td  className="dish-item__name">{dishItem.name}</td>
      <td>{dishItem.price}</td>
      <td className="text-end" width={50}>
        <ActionMenu entity={dishItem} actions={actions} />
      </td>
    </tr>
  );
};
