import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from '@libs/react-i18next';
import { useRestaurant } from '@shared/hooks/useRestaurant';
import { TabsSection } from '@admin/pages/Menu/components/TabsSection/TabsSection';
import { useSearchDishesForMarks } from './MarksPage/hooks';
import { useMarks } from './MarksPage/useMarks';
import { CategoryWithDishes } from '@admin/components/molecules/CategoryWithDishes';

export const MarksPage = () => {
  const { t } = useTranslation();
  const localLang = 'uk-UA';
  const { markId } = useParams();
  
  const [loadingMarks, setLoadingMarks] = useState(false);
  const [loadingDishes, setLoadingDishes] = useState(false);
  const { restaurantId } = useRestaurant();
  const { loadAllDishes, categoriesDishesList } = useSearchDishesForMarks({ markId: markId! });
 
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoadingDishes(true);
      await loadAllDishes();
      setLoadingDishes(false);
    };
    if (markId) {
      load();
    }
  }, [markId]);
  
  const {
    openMarksCreateDialog,
    loadAllMarks,
    marksList,
    marksActions } = useMarks(
    {
      language: localLang,
    }
  );
  
  useEffect(() => {
    const load = async () => {
      setLoadingMarks(true);
      await loadAllMarks();
      setLoadingMarks(false);
    };
    if (restaurantId) {
      load();
    }
  }, [restaurantId]);

  return (
    <>
      <TabsSection
        isLoading={loadingMarks}
        items={marksList.map((mark) => {
          return {
            id: mark.mark_id,
            ...mark,
          };
        })}
        buttonText={t('tags:addMarkButton')}
        currentLanguage={localLang}
        mainAction={openMarksCreateDialog}
        onTabChange={(markId) => {
          navigate(`/tags/marks/${markId}`);
        }}
        actions={marksActions}
        selected={markId}
      />
      {markId && !loadingDishes && categoriesDishesList.length > 0  && (
        <div className="allergens-categories-list">
          {categoriesDishesList.map(category => {
            return (
              <CategoryWithDishes
                key={category.category_id}
                category={category}
                language={localLang}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

