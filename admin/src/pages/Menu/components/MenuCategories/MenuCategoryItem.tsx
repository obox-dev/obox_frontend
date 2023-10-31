import { NavLink } from 'react-router-dom';
import { Category } from '@shared/services';
import { ActionMenu, IAction } from '@shared/components/atoms/ActionMenu';

export interface MenuCategoryItem {
  categoryItem: Category;
  actions: IAction<Category>[];
}

export const MenuCategoryItem = (props: MenuCategoryItem) => {
  const { categoryItem, actions } = props;

  return (
    <li className="menu__categories-list-item d-flex justify-content-between align-items-center my-2">
      <NavLink to={`/menu/${categoryItem.menu_id}/category/${categoryItem.category_id}`}>{categoryItem.name}</NavLink>
      <ActionMenu entity={categoryItem} actions={actions}/>
    </li>
  );
};
