import { Button, ButtonVariants } from "@shared/components/atoms/Button";
import { Menu } from '@shared/services'
import { MenuNavigationItem } from "./MenuINavigationItem";

interface MenuNavigationProps {
  items: Menu[],
  addMenu: () => void;
}


export const MenuNavigation = (props: MenuNavigationProps) => {
  const { items, addMenu } = props;

  return (
    <div className="menu__navigation container-fluid bg-dark text-white">
      <ul className="menu__navigation-list d-flex align-items-center m-0 p-0">
        {
          items.map(({ menu_id, name }) => (
            <MenuNavigationItem key={menu_id} id={menu_id} label={name} />
          ))
        }
        {
          <Button variant={ButtonVariants.SECONDARY} text="Add menu" onClick={addMenu} />
        }
      </ul>
    </div>
  )
}
