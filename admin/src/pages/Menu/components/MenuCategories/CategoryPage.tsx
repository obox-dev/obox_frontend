import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useTranslation } from '@libs/react-i18next';
import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';
import { PlusIcon } from '@admin/assets/icons';
import { useMainProvider } from '@admin/providers/main';
import { LayoutWithBackButton } from '@admin/layout/LayoutWithBackButton/LayoutWithBackButton';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { Category } from '@shared/services';
import { mapCategoryContent } from './mappers/mapCategoryContent';
import { useGetCategory } from './hooks';
import { MenuDishList } from '../MenuDish/MenuDishList';
import { useDish } from '../MenuDish/useDish';
import './CategoryPage.scss';

export const CategoryPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { menuId, categoryId } = useParams();
  const { menuLanguage } = useMainProvider();
  const { loadSingleCategory } = useGetCategory({ menuId: menuId! });
  const [category, setCategory] = useState<Category>();
  const { menuDishesActions, loadAllDishes, dishList } = useDish({
    categoryId: categoryId!,
    language: menuLanguage,
  });

  useEffect(() => {
    const loadCategory = async () => {
      const categoryData = await loadSingleCategory(categoryId!);
      setCategory(mapCategoryContent(categoryData, menuLanguage));
    };
    const loadCategoryWithDishes = async () => {
      await loadCategory();
      await loadAllDishes();
    };

    loadCategoryWithDishes();
  }, [categoryId]);

  return (
    <div className="category-page">
      <LayoutWithSearch>
        {category ? (
          <>
            <LayoutWithBackButton
              backButtonVariant={ButtonVariants.PRIMARY}
              backTo={`/menu/${menuId}`}
              title={category.name}
              description={category.description}
            >
              <div className="category-page__body">
                <p className="filler">{t('menu:categoryPage.filler')}</p>
                <Button
                  className="w-100 mb-4"
                  innerContent={
                    <>
                      <PlusIcon />
                      {t('menu:addDishButton')}
                    </>
                  }
                  variant={ButtonVariants.PRIMARY}
                  onClick={() => {
                    navigate(
                      `/menu/${menuId}/category/${categoryId}/create-dish`
                    );
                  }}
                />
                <MenuDishList
                  dishItems={dishList}
                  currentLanguage={menuLanguage}
                  actions={menuDishesActions}
                />
              </div>
            </LayoutWithBackButton>
          </>
        ) : (
          <span>Loading</span>
        )}
      </LayoutWithSearch>
    </div>
  );
};
