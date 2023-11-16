import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { ButtonVariants } from '@shared/components/atoms/Button';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { Menu, MenuService } from '@shared/services';

interface DeleteMenuParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
}

export const useDeleteMenu = (args: DeleteMenuParams) => {
  const { onSuccess, onError, onFinally } = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: MenuService.delete,
    onSuccess,
    onFinally,
    onError,
  });

  const openMenuDeleteDialog = (menu: Menu) =>
    openDialog(({ closeDialog }) => {
      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(menu.menu_id);
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t('menu:deleteMenuForm.title')}
          size="xl"
          okText={t('common:buttons:delete')}
          cancelText={t('common:buttons:cancel')}
          okButtonVariant={ButtonVariants.PRIMARY}
          cancelButtonVariant={ButtonVariants.TERTIARY}
        ></Dialog>
      );
    });
  return { openMenuDeleteDialog };
};
