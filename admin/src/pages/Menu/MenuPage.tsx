import { useEffect } from 'react';
import { useParams } from 'react-router';
import { MenuNavigation } from './components/MenuPage/MenuNavigation';
import { Menu } from './components/MenuPage/Menu';
import { useMenu } from './components/MenuPage/useMenu';
import { useMainProvider } from '@admin/providers/main';
import './Menu.scss';
import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';

const HARDCODED_RESTAURANT_ID = '793ecd10-c0c0-4b06-ac09-c7a3ecdc9f04';

export const MenuPage = () => {
  const { menuId } = useParams();
  const { menuLanguage } = useMainProvider();

  const restaurantId = HARDCODED_RESTAURANT_ID;
  const {
    openMenuCreateDialog,
    loadSingleMenu,
    loadAllMenus,
    menuList,
    menuActions,
  } = useMenu({
    restaurant_id: restaurantId,
    language: menuLanguage,
  });

  useEffect(() => {
    if (menuId) {
      loadSingleMenu(menuId);
    }
  }, [menuId]);

  useEffect(() => {
    if (restaurantId) {
      loadAllMenus();
    }
  }, [restaurantId]);

  return (
    <div className="menu-page">
      <LayoutWithSearch>
        <>
          <MenuNavigation
            items={menuList}
            addMenu={openMenuCreateDialog}
            actions={menuActions}
            currentLanguage={menuLanguage}
          />
          {menuId && <Menu menuId={menuId} currentLanguage={menuLanguage} />}
        </>
      </LayoutWithSearch>
    </div>
  );
};
