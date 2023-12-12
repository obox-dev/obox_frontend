import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { ButtonVariants } from '@shared/components/atoms/Button';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { MarksResponse ,MarksService  } from '@shared/services';

interface DeleteMarksParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
  language: string;
}

export const useDeleteMarks = (args: DeleteMarksParams) => {
  const { onSuccess, onError, onFinally } = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: MarksService.delete,
    onSuccess,
    onFinally,
    onError,
  });

  const openMarksDeleteDialog = (mark: MarksResponse) =>
    openDialog(({ closeDialog }) => {

      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(mark.mark_id);
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t('tags:deleteMarksForm.title')}
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
    openMarksDeleteDialog
  };
};