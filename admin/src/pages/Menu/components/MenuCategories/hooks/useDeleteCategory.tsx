import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { CategoriesService, CategoryResponse } from '@shared/services';
import { Dialog } from '@shared/components/molecules/Dialog';
import { ButtonVariants } from '@shared/components/atoms/Button';


interface DeleteCategoryParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
  language: string;
}

export const useDeleteCategory = (args: DeleteCategoryParams) => {
  const { onSuccess, onFinally, } = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: CategoriesService.delete,
    onSuccess,
    onFinally,
  });

  const openCategoryDeleteDialog = (category: CategoryResponse) =>
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
          size="xl"
          okText={t('common:buttons:delete')}
          cancelText={t('common:buttons:cancel')}
          okButtonVariant={ButtonVariants.PRIMARY}
          cancelButtonVariant={ButtonVariants.TERTIARY}
        >
        </Dialog>
      );
    });

  return { openCategoryDeleteDialog };
};
