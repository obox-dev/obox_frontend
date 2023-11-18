import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from '@libs/react-i18next';
import { useMainProvider } from '@admin/providers/main';
import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';
import { useMenu } from './components/MenuPage/useMenu';
import { TabsSection } from './components/TabsSection/TabsSection';
import { useCategories } from './components/MenuCategories/useCategories';
import './Menu.scss';

const HARDCODED_RESTAURANT_ID = '793ecd10-c0c0-4b06-ac09-c7a3ecdc9f04';

export const MenuPage = () => {
  const { t } = useTranslation();
  const { menuLanguage, menuId, setMenuId } = useMainProvider();

  const restaurantId = HARDCODED_RESTAURANT_ID;
  const { openMenuCreateDialog, loadAllMenus, menuList, menuActions } = useMenu(
    {
      restaurant_id: restaurantId,
      language: menuLanguage,
    }
  );

  const navigate = useNavigate();

  const {
    openCategoryCreateDialog,
    loadAllCategories,
    categoriesList,
    menuCategoriesActions,
  } = useCategories(menuId!, menuLanguage);

  useEffect(() => {
    if (menuId) {
      loadAllCategories();
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
          <TabsSection
            items={menuList.map((menu) => {
              return {
                id: menu.menu_id,
                ...menu,
              };
            })}
            title={t('menu:createMenu')}
            buttonText={t('menu:addMenuButton')}
            currentLanguage={menuLanguage}
            mainAction={openMenuCreateDialog}
            onTabChange={(tabId) => {
              setMenuId(tabId);
            }}
            actions={menuActions}
          />
          {menuId && (
            <TabsSection
              items={categoriesList.map((category) => {
                return {
                  id: category.category_id,
                  ...category,
                };
              })}
              title={t('menu:createCategory')}
              buttonText={t('menu:addCategoryButton')}
              currentLanguage={menuLanguage}
              mainAction={openCategoryCreateDialog}
              onTabChange={(tabId) => {
                navigate(`/menu/${menuId}/category/${tabId}`);
              }}
              actions={menuCategoriesActions}
            />
          )}
        </>
      </LayoutWithSearch>
    </div>
  );
};
