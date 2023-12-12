import { useTranslation } from '@libs/react-i18next';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { useCreateAllergens, useDeleteAllergens, useGetAllergens, useUpdateAllergens } from './hooks';
import { useRestaurant } from '@shared/hooks/useRestaurant';
import { DeleteIcon, EditIcon } from '@admin/assets/icons';
import { AllergensResponse } from '@shared/services';
import { IAction } from '@shared/components/atoms/ActionMenu';


interface UseAllergensProps {
  language: string;
}

export const useAllergens = (props: UseAllergensProps) => {
  
  const { t } = useTranslation();
  const { language } = props;
  const referenceType = 'restaurant';
  const { restaurantId } = useRestaurant();

  const { closeAll } = useDialog();
  const { loadAllAllergens, allergensList, } = useGetAllergens({ restaurantId });

  const { openAllergensCreateDialog } = useCreateAllergens({
    onSuccess: async () => {
      await loadAllAllergens();
      closeAll();
    },
    referenceType,
    restaurantId,
    language,
  });

  const { openAllergensUpdateDialog } = useUpdateAllergens({
    onSuccess: async () => {
      await loadAllAllergens();
      closeAll();
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllAllergens();
        closeAll();
      }
    },
    language,
  });

  const { openAllergensDeleteDialog } = useDeleteAllergens({
    onSuccess: async () => {
      await loadAllAllergens();
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllAllergens();
        closeAll();
      }
    },
    onFinally: () => {
      closeAll();
    },
    language,
  });

  const allergensActions: IAction<AllergensResponse>[] = [
    {
      label: (
        <>
          <EditIcon />
          {t('tags:actions.edit')}
        </>
      ),
      callback: (allergen: AllergensResponse) => openAllergensUpdateDialog(allergen),
    },
    {
      label: (
        <>
          <DeleteIcon />
          {t('tags:actions.delete')}
        </>
      ),
      callback: (allergen: AllergensResponse) => openAllergensDeleteDialog(allergen),
    },
  ];

  return {
    openAllergensCreateDialog,
    allergensList,
    loadAllAllergens,
    allergensActions,
  };
};