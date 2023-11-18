import { useTranslation } from '@libs/react-i18next';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { Dish, DishesService } from '@shared/services/DishService';
import { ButtonVariants } from '@shared/components/atoms/Button';
import { useRequest } from '@admin/hooks';
import { AxiosError } from 'axios';

interface DeleteDishParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
}

export const useDeleteDish = (args: DeleteDishParams) => {
  const { onSuccess, onError, onFinally } = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: DishesService.delete,
    onSuccess,
    onError,
    onFinally,
  });

  const openDishDeleteDialog = (dish: Dish) => {
    openDialog(({ closeDialog }) => {
      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(dish.dish_id);
            closeDialog();
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t('menu:deleteDishForm.title')}
          size="xl"
          okText={t('common:buttons:delete')}
          cancelText={t('common:buttons:cancelChanges')}
          okButtonVariant={ButtonVariants.PRIMARY}
          cancelButtonVariant={ButtonVariants.TERTIARY}
        ></Dialog>
      );
    });
  };

  return {
    openDishDeleteDialog,
  };
};
