import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from '@libs/react-i18next';
import { useRestaurant } from '@shared/hooks/useRestaurant';
import { TabsSection } from '@admin/pages/Menu/components/TabsSection/TabsSection';
import { CategoryWithDishes } from '@admin/components/molecules/CategoryWithDishes/CategoryWithDishes';
import { useSearchDishesForAllergen } from './AllergensPage/hooks';
import { useAllergens } from './AllergensPage/useAllergens';


export const AllergensPage = () => {
  const { t } = useTranslation();
  const localLang = 'uk-UA';
  const { allergenId } = useParams();
  
  const [loadingAllergens, setLoadingAllergens] = useState(false);
  const [loadingDishes, setLoadingDishes] = useState(false);
  const { restaurantId } = useRestaurant();
  const { loadAllDishes, categoriesDishesList } = useSearchDishesForAllergen({ allergenId: allergenId! });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const load = async () => {
      setLoadingDishes(true);
      await loadAllDishes();
      setLoadingDishes(false);
    };
    if (allergenId) {
      load();
    }
  }, [allergenId]);

  const { openAllergensCreateDialog,
    allergensList,
    loadAllAllergens,
    allergensActions, } = useAllergens(
    {
      language: localLang,
    }
  );

  useEffect(() => {
    const load = async () => {
      setLoadingAllergens(true);
      await loadAllAllergens();
      setLoadingAllergens(false);
    };
    if (restaurantId) {
      load();
    }
  }, [restaurantId]);

  return (
    <>
      <TabsSection
        isLoading={loadingAllergens}
        items={allergensList.map((allergen) => {
          return {
            id: allergen.allergen_id,
            ...allergen,
          };
        })}
        buttonText={t('tags:createAllergen')}
        currentLanguage={localLang}
        mainAction={openAllergensCreateDialog}
        onTabChange={(allergenId) => {
          navigate(`/tags/allergens/${allergenId}`);
        }}
        actions={allergensActions}
        selected={allergenId}
      />
      {allergenId && !loadingDishes && categoriesDishesList.length && (
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



