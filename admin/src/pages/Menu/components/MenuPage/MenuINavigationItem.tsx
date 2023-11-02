import { NavLink } from 'react-router-dom';
import { ActionMenu } from '@shared/components/atoms/ActionMenu';
import { Menu } from '@shared/services';
import { IAction } from '@shared/components/atoms/ActionMenu';

export interface MenuNavigationItemProps {
  menuItem: Menu;
  label: string;
  actions: IAction<Menu>[];
}

export const MenuNavigationItem = (props: MenuNavigationItemProps) => {
  const { label, menuItem, actions } = props;
  
  return (
    <li className="menu__navigation-item d-flex align-items-center">
      <NavLink to={`/menu/${menuItem.menu_id}`} className="menu__navigation-item-link">{label}</NavLink>
      <ActionMenu entity={menuItem} actions={actions}/>
    </li>
  );
};
