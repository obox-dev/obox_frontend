import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { useRestaurant } from '@shared/hooks/useRestaurant';
import { TabsSection } from '@admin/pages/Menu/components/TabsSection/TabsSection';
import { useNavigate } from 'react-router';
import { useAllergens } from './components/AllergensPage/useAllergens';


export const AllergensPage = () => {
  const{ t } = useTranslation();
  const [loadingAllergens, setLoadingAllergens] = useState(false);
  const navigate = useNavigate();
  const { restaurantId } = useRestaurant();
  const localLang = 'uk-UA';
  
  const { openAllergensCreateDialog,
    allergensList,
    loadAllAllergens,
    allergensActions,} = useAllergens(
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
        onTabChange={(tabId) => {
          navigate(`/allergen/${tabId}`);
        }}
        actions={allergensActions}
      />

    </>
  );
};



