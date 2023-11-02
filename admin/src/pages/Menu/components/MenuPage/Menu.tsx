import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { Sidebar } from '@admin/layout/Sidebar/Sidebar';
import { useCategories } from '../MenuCategories/useCategories';
import { MenuCategoryList } from '../MenuCategories/MenuCategoryList';
import { MenuDishList } from '../MenuDish/MenuDishList';
import { useDish } from '../MenuDish/useDish';

interface MenuProps {
  menuId: string;
  currentLanguage: string;
}

export const Menu = (props: MenuProps) => {
  const { menuId, currentLanguage } = props;
  const { categoryId, dishId } = useParams();
  const { t } = useTranslation();
  const {
    openCategoryCreateDialog,
    loadAllCategories,
    loadSingleCategory,
    categoriesList,
    menuCategoriesActions,
  } = useCategories(menuId!, currentLanguage);
  const { loadSingleDish, loadAllDishes, dishList, menuDishesActions } =
    useDish(categoryId!);

  useEffect(() => {
    if (menuId) {
      loadAllCategories();
    }
  }, [menuId]);

  useEffect(() => {
    if (categoryId) {
      loadSingleCategory(categoryId);
      loadAllDishes();
    }
  }, [categoryId]);

  useEffect(() => {
    if (dishId) {
      loadSingleDish(dishId);
    }
  }, [dishId]);

  return (
    <div className="menu__page d-flex">
      <Sidebar
        header={
          <div className="d-flex justify-content-between align-items-center">
            <h4>{t('menu:categories')}</h4>
            <Button
              variant={ButtonVariants.SECONDARY}
              text={`+ ${t('menu:addcategory')}`}
              onClick={openCategoryCreateDialog}
            ></Button>
          </div>
        }
      >
        <MenuCategoryList
          actions={menuCategoriesActions}
          categoryItems={categoriesList}
          currentLanguage={currentLanguage}
        />
      </Sidebar>
      {categoryId && (
        <div className="menu__dishes flex-grow-1 p-2">
          <div className="d-flex justify-content-between align-items-center">
            <h4>{t('menu:dishes')}</h4>
            <Link to={`/menu/${menuId}/category/${categoryId}/create-dish`}>
              <Button
                variant={ButtonVariants.SECONDARY}
                text={`+ ${t('menu:adddish')}`}
              ></Button>
            </Link>
          </div>
          <MenuDishList
            dishItems={dishList}
            actions={menuDishesActions}
            currentLanguage={currentLanguage}
          />
        </div>
      )}
    </div>
  );
};
