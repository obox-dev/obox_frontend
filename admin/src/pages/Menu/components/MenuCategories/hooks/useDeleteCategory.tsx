import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { CategoriesService, Category } from '@shared/services';
import { Dialog } from '@shared/components/molecules/Dialog';
import { ButtonVariants } from '@shared/components/atoms/Button';

interface DeleteCategoryParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
}

export const useDeleteCategory = (args: DeleteCategoryParams) => {
  const { onSuccess, onFinally } = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: CategoriesService.delete,
    onSuccess,
    onFinally,
  });

  const openCategoryDeleteDialog = (category: Category) =>
    openDialog(({ closeDialog }) => {
      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(category.category_id);
            closeDialog();
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t('menu:deleteCategoryForm.title')}
          size="lg"
          okText={t('common:buttons:confirm')}
          cancelText={t('common:buttons:cancel')}
          okButtonVariant={ButtonVariants.DANGER}
        >
          <p>
            {t('menu:deleteCategoryForm.message')}{' '}
            <strong>{category.name}</strong>
          </p>
        </Dialog>
      );
    });

  return { openCategoryDeleteDialog };
};
