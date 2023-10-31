import { useTranslation } from '@libs/react-i18next';
import { Dish } from '@shared/services/DishService';
import { IAction } from '@shared/components/atoms/ActionMenu';
import { MenuDishItem } from './MenuDishItem';
export interface MenuDishListProps {
  dishItems: Dish[];
  actions: IAction<Dish>[];
}

interface HeaderItem {
  label: string;
  dataIndex: string;
}

export const MenuDishList = (props: MenuDishListProps) => {
  const { dishItems, actions } = props;
  const { t } = useTranslation();

  const dishListHeader: HeaderItem[] = [
    {
      label: t('dishForm:dishesTable.state'),
      dataIndex: 'state',
    },
    {
      label: t('dishForm:dishesTable.name'),
      dataIndex: 'name',
    },
    {
      label: t('dishForm:dishesTable.price'),
      dataIndex: 'price',
    },
    {
      label: t('dishForm:dishesTable.actions'),
      dataIndex: 'actions',
    },
  ];

  return (
    <table className="menu-dish-list table table-striped p-0">
      <thead>
        <tr>
          {dishListHeader.map((col: HeaderItem) => {
            return (
              <th scope="col" key={col.dataIndex}>
                {col.label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {dishItems.map((item: Dish) => {
          return (
            <MenuDishItem
              actions={actions}
              key={item.dish_id}
              dishItem={item}
            />
          );
        })}
      </tbody>
    </table>
  );
};
