import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import _ from 'lodash';
import { useTranslation } from '@libs/react-i18next';
import { ReferenceType } from '@shared/utils/types';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { Category, OrderService } from '@shared/services';
import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';
import { PlusIcon } from '@admin/assets/icons';
import { useMainProvider } from '@admin/providers/main';
import { LayoutWithBackButton } from '@admin/layout/LayoutWithBackButton/LayoutWithBackButton';
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
    menuId: menuId!,
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

  const dishListIsEmpty = useMemo(() => {
    return dishList.length === 0;
  }, [dishList.length]);

  const reorder = useCallback(
    _.throttle((newOrder: string[]) => {
      OrderService.orderById({
        reference_id: categoryId!,
        reference_type: ReferenceType.CATEGORY,
        sorted_list: newOrder,
      });
    }, 5000),
    [categoryId]
  );

  return (
    <div className="category-page container">
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
                {dishListIsEmpty && (
                  <p className="filler">{t('menu:categoryPage.filler')}</p>
                )}
                <Button
                  className="w-100"
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
                  onReorder={reorder}
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
