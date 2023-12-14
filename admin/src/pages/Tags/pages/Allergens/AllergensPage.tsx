import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { useRestaurant } from '@shared/hooks/useRestaurant';
import { TabsSection } from '@admin/pages/Menu/components/TabsSection/TabsSection';
import { useNavigate, useParams } from 'react-router';
import { useSearchDishesForAllergen } from './AllergensPage/hooks';
import { useAllergens } from './AllergensPage/useAllergens';


export const AllergensPage = () => {
  const { t } = useTranslation();
  const localLang = 'uk-UA';
  const { allergenId } = useParams();
  
  const [loadingAllergens, setLoadingAllergens] = useState(false);
  const [loadingDishes, setLoadingDishes] = useState(false);
  const { restaurantId } = useRestaurant();
  const { loadAllDishes, dishesList } = useSearchDishesForAllergen({ allergenId: allergenId! });
  
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
      {allergenId && !loadingDishes && dishesList.length && (
        <div>
          {/* {dishesList.map(dish => DishCard(передать парамерты))} */}
        </div>
        // при клике на блюдо делать навигацию.
      )}
    </>
    
  );
};



