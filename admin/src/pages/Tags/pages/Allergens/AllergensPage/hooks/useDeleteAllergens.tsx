import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { ButtonVariants } from '@shared/components/atoms/Button';
import { Dialog } from '@shared/components/molecules/Dialog';
import { AllergensResponse ,AllergensService  } from '@shared/services';

interface DeleteAllergensParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
  language: string;
}

export const useDeleteAllergens = (args: DeleteAllergensParams) => {
  const { onSuccess, onError, onFinally } = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: AllergensService.delete,
    onSuccess,
    onFinally,
    onError,
  });

  const openAllergensDeleteDialog = (allergen: AllergensResponse) =>
    openDialog(({ closeDialog }) => {

      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(allergen.allergen_id);
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t('tags:deleteAllergensForm.title')}
          size="xl"
          okText={t('common:buttons:delete')}
          cancelText={t('common:buttons:cancel')}
          okButtonVariant={ButtonVariants.PRIMARY}
          cancelButtonVariant={ButtonVariants.TERTIARY}
        >
        </Dialog>
      );
    });
  return {
    openAllergensDeleteDialog
  };
};