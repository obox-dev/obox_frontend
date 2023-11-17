import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { useCategories } from '../MenuCategories/useCategories';
import { MenuCategoryList } from '../MenuCategories/MenuCategoryList';
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
  const { loadSingleDish, loadAllDishes } =
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
      <div className="d-flex justify-content-between align-items-center">
        <h4>{t('menu:categories')}</h4>
        <Button
          variant={ButtonVariants.SECONDARY}
          text={`+ ${t('menu:addcategory')}`}
          onClick={openCategoryCreateDialog}
        ></Button>
      </div>
      <MenuCategoryList
        actions={menuCategoriesActions}
        categoryItems={categoriesList}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};
