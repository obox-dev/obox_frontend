import { useEffect } from 'react';
import { useParams } from 'react-router';
import { MenuNavigation } from './components/MenuPage/MenuNavigation';
import { Menu } from './components/MenuPage/Menu';
import { useMenu } from './components/MenuPage/useMenu';
import './Menu.scss';

const HARDCODED_RESTAURANT_ID = '793ecd10-c0c0-4b06-ac09-c7a3ecdc9f04';
const HARDCODED_LANGUAGE = 'uk-UA';

export const MenuPage = () => {
  const { menuId } = useParams();
  const restaurantId = HARDCODED_RESTAURANT_ID;
  const language = HARDCODED_LANGUAGE;
  const {
    openMenuCreateDialog,
    loadSingleMenu,
    loadAllMenus,
    menuList,
    menuActions,
  } = useMenu({
    restaurant_id: restaurantId,
    language,
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
    <div>
      <MenuNavigation
        items={menuList}
        addMenu={openMenuCreateDialog}
        actions={menuActions}
        currentLanguage={HARDCODED_LANGUAGE}
      />
      {menuId && <Menu menuId={menuId} />}
    </div>
  );
};
