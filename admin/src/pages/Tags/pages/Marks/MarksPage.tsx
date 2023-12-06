import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { useRestaurant } from '@shared/hooks/useRestaurant';
import { useMarks } from './components/MarkPage/useMarks';
import { TabsSection } from '@admin/pages/Menu/components/TabsSection/TabsSection';
import { useNavigate } from 'react-router';

export const MarksPage = () => {
  const{ t } = useTranslation();
  const [loadingMarks, setLoadingMarks] = useState(false);
  const navigate = useNavigate();
  const { restaurantId } = useRestaurant();
  const localLang = 'uk-UA';
  
  const { openMarksCreateDialog, loadAllMarks, marksList, marksActions} = useMarks(
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
        buttonText={t('tags:createMark')}
        currentLanguage={localLang}
        mainAction={openMarksCreateDialog}
        onTabChange={(tabId) => {
          navigate(`/marks/${tabId}`);
        }}
        actions={marksActions}
      />

    </>
  );
};

