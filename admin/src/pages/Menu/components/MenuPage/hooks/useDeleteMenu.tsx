import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { ButtonVariants } from '@shared/components/atoms/Button';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { MenuResponse, MenuService } from '@shared/services';
import { mapMenuContent } from '../mappers/mapMenuContent';

interface DeleteMenuParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
  language: string;
}

export const useDeleteMenu = (args: DeleteMenuParams) => {
  const { onSuccess, onError, onFinally, language } = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: MenuService.delete,
    onSuccess,
    onFinally,
    onError,
  });

  const openMenuDeleteDialog = (menu: MenuResponse) =>
    openDialog(({ closeDialog }) => {
      const menuContent = mapMenuContent(menu, language);

      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(menu.menu_id);
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t('menu:deleteMenuForm.title')}
          size="lg"
          okText={t('common:buttons:confirm')}
          cancelText={t('common:buttons:cancel')}
          okButtonVariant={ButtonVariants.DANGER}
        >
          <p>
            {t('menu:deleteMenuForm.message')}{' '}
            <strong>{menuContent.name}</strong>?
          </p>
        </Dialog>
      );
    });
  return { openMenuDeleteDialog };
};
