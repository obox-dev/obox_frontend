import { useEffect } from 'react';
import { useMenu } from './components/MenuPage/useMenu';
import { useMainProvider } from '@admin/providers/main';
import './Menu.scss';
import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';
import { TabsSection } from './components/TabsSection/TabsSection';
import { useCategories } from './components/MenuCategories/useCategories';

const HARDCODED_RESTAURANT_ID = '793ecd10-c0c0-4b06-ac09-c7a3ecdc9f04';

export const MenuPage = () => {
  const { menuLanguage, menuId, setMenuId, setCategoryId } =
    useMainProvider();

  const restaurantId = HARDCODED_RESTAURANT_ID;
  const {
    openMenuCreateDialog,
    loadAllMenus,
    menuList,
    menuActions,
  } = useMenu({
    restaurant_id: restaurantId,
    language: menuLanguage,
  });

  const {
    openCategoryCreateDialog,
    loadAllCategories,
    categoriesList,
    // menuActions,
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
            title="Menues"
            buttonText="Add menu"
            currentLanguage={menuLanguage}
            mainAction={openMenuCreateDialog}
            onTabChange={(tabId) => {
              setMenuId(tabId);
            }}
            actions={menuActions}
          />
          <TabsSection
            items={categoriesList.map((category) => {
              return {
                id: category.category_id,
                ...category,
              };
            })}
            title="Category"
            buttonText="Add category"
            currentLanguage={menuLanguage}
            mainAction={openCategoryCreateDialog}
            onTabChange={(tabId) => {
              setCategoryId(tabId);
            }}
            actions={[]}
          />
        </>
      </LayoutWithSearch>
    </div>
  );
};
