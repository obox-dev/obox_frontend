import { useTranslation } from '@libs/react-i18next';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { Menu, MenuResponse } from '@shared/services';
import { IAction } from '@shared/components/atoms/ActionMenu';
import { MenuNavigationItem } from './MenuINavigationItem';

interface MenuNavigationProps {
  items: MenuResponse[],
  addMenu: () => void;
  actions: IAction<Menu>[];
  currentLanguage: string;
}


export const MenuNavigation = (props: MenuNavigationProps) => {
  const { t } = useTranslation();
  const { items, actions, addMenu, currentLanguage } = props;

  const mapMenuContent = (menuItem: MenuResponse): Menu => {
    const { content, ...menu } = menuItem;
    
    return {
      ...content[currentLanguage],
      ...menu,
    };
  };

  return (
    <div className="menu__navigation container-fluid bg-dark text-white">
      <ul className="menu__navigation-list d-flex align-items-center m-0 p-0">
        {
          items.map((menu: MenuResponse) => {
            const menuItem = mapMenuContent(menu);
            return (
              <MenuNavigationItem key={menuItem.menu_id} menuItem={menuItem} label={menuItem.name} actions={actions} />
            );
          })
        }
        {
          <Button variant={ButtonVariants.SECONDARY} text={`+ ${t('menu:addmenu')}`} onClick={addMenu} />
        }
      </ul>
    </div>
  );
};
