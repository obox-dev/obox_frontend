import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
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
  const { menuId: selectedMenuId = '' } = useParams();
  const { menuLanguage } = useMainProvider();

  const [loadingMenus, setLoadingMenus] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const selectedMenu = useMemo(() => {
    return selectedMenuId;
  }, [selectedMenuId]);

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
  } = useCategories(selectedMenu, menuLanguage);

  useEffect(() => {
    const load = async () => {
      setLoadingCategories(true);
      await loadAllCategories();
      setLoadingCategories(false);
    };
    if (selectedMenu) {
      load();
    }
  }, [selectedMenu]);

  useEffect(() => {
    const load = async () => {
      setLoadingMenus(true);
      await loadAllMenus();
      setLoadingMenus(false);
    };
    if (restaurantId) {
      load();
    }
  }, [restaurantId]);

  return (
    <div className="menu-page container">
      <LayoutWithSearch>
        <>
          <TabsSection
            isLoading={loadingMenus}
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
              navigate(`/menu/${tabId}`);
            }}
            actions={menuActions}
            selected={selectedMenu}
          />
          {selectedMenu && (
            <TabsSection
              isLoading={loadingCategories}
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
                navigate(`/menu/${selectedMenu}/category/${tabId}`);
              }}
              actions={menuCategoriesActions}
            />
          )}
        </>
      </LayoutWithSearch>
    </div>
  );
};
