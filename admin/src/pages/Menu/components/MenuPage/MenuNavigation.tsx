import { Button, ButtonVariants } from "@shared/components/atoms/Button";
import { Menu } from '@shared/services'
import { IAction } from "@shared/components/atoms/ActionMenu";
import { MenuNavigationItem } from "./MenuINavigationItem";
import { useTranslation } from '@libs/react-i18next';

interface MenuNavigationProps {
  items: Menu[],
  addMenu: () => void;
  actions: IAction<Menu>[];
}


export const MenuNavigation = (props: MenuNavigationProps) => {
  const { t } = useTranslation();
  const { items, actions, addMenu } = props;

  return (
    <div className="menu__navigation container-fluid bg-dark text-white">
      <ul className="menu__navigation-list d-flex align-items-center m-0 p-0">
        {
          items.map((menu: Menu) => {
            const { menu_id, name } = menu;
            return (
              <MenuNavigationItem key={menu_id} menuItem={menu} label={name} actions={actions} />
            )
          })
        }
        {
          <Button variant={ButtonVariants.SECONDARY} text={`+ ${t("menu:addmenu")}`} onClick={addMenu} />
        }
      </ul>
    </div>
  )
}
