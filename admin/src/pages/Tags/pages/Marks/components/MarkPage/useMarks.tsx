import { useTranslation } from '@libs/react-i18next';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { useGetMarks } from './hooks/useGetMarks';
import { useRestaurant } from '@shared/hooks/useRestaurant';
import { useCreateMarks, useDeleteMarks, useUpdateMarks } from './hooks';
import { DeleteIcon, EditIcon } from '@admin/assets/icons';
import { MarksResponse } from '@shared/services';
import { IAction } from '@shared/components/atoms/ActionMenu';

interface UseMarksProps {
  language: string;
}

export const useMarks = (props: UseMarksProps) => {
  
  const { t } = useTranslation();
  const { language } = props;
  const referenceType = 'restaurant';
  const { restaurantId } = useRestaurant();

  const { closeAll } = useDialog();
  const { loadAllMarks, marksList, } = useGetMarks({ restaurantId });

  const { openMarksCreateDialog } = useCreateMarks({
    onSuccess: async () => {
      await loadAllMarks();
      closeAll();
    },
    referenceType,
    restaurantId,
    language,
  });

  const { openMarksUpdateDialog } = useUpdateMarks({
    onSuccess: async () => {
      await loadAllMarks();
      closeAll();
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllMarks();
        closeAll();
      }
    },
    language,
  });

  const { openMarksDeleteDialog } = useDeleteMarks({
    onSuccess: async () => {
      await loadAllMarks();
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllMarks();
        closeAll();
      }
    },
    onFinally: () => {
      closeAll();
    },
    language,
  });

  const marksActions: IAction<MarksResponse>[] = [
    {
      label: (
        <>
          <EditIcon />
          {t('menu:actions.edit')}
        </>
      ),
      callback: (mark: MarksResponse) => openMarksUpdateDialog(mark),
    },
    {
      label: (
        <>
          <DeleteIcon />
          {t('menu:actions.delete')}
        </>
      ),
      callback: (mark: MarksResponse) => openMarksDeleteDialog(mark),
    },
  ];

  return {
    openMarksCreateDialog,
    marksList,
    loadAllMarks,
    marksActions,
  };
};