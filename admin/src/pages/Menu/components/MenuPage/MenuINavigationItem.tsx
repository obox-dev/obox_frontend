import { NavLink } from "react-router-dom";

export interface MenuNavigationItemProps {
  id: string
  label: string;
}
export const MenuNavigationItem = (props: MenuNavigationItemProps) => {
  const { label } = props;
  return (
    <li className="menu__navigation-item">
      <NavLink to={`/menu/${props.id}`} className="menu__navigation-item-link">{label}</NavLink>
    </li>
  )
}
