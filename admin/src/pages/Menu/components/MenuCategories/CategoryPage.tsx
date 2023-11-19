import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useTranslation } from '@libs/react-i18next';
import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';
import { PlusIcon } from '@admin/assets/icons';
import { useMainProvider } from '@admin/providers/main';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { Category } from '@shared/services';
import { mapCategoryContent } from './mappers/mapCategoryContent';
import { useGetCategory } from './hooks';
import { LayoutWithBackButton } from '@admin/layout/LayoutWithBackButton/LayoutWithBackButton';
import './CategoryPage.scss';

export const CategoryPage = () => {
  const { t } = useTranslation();

  const [category, setCategory] = useState<Category>();

  const { menuId, categoryId } = useParams();
  const { menuLanguage } = useMainProvider();
  const navigate = useNavigate();
  const { loadSingleCategory } = useGetCategory({ menuId: menuId! });

  useEffect(() => {
    const loadCategory = async () => {
      const categoryData = await loadSingleCategory(categoryId!);
      setCategory(mapCategoryContent(categoryData, menuLanguage));
    };

    loadCategory();
  }, [categoryId]);

  return (
    <div className="category-page">
      <LayoutWithSearch>
        {category ? (
          <>
            <LayoutWithBackButton backButtonVariant={ButtonVariants.PRIMARY} backTo={`/menu/${menuId}`} title={category.name} description={category.description}>
              <div className="category-page__body">
                <p className="filler">{t('menu:categoryPage.filler')}</p>
                <div className="dish-card"></div>
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
