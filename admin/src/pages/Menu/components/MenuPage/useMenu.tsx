import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@libs/react-i18next';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { Menu } from '@shared/services';
import { IAction } from '@shared/components/atoms/ActionMenu';
import { useGetMenu } from './hooks/useGetMenu';
import { useCreateMenu, useDeleteMenu, useUpdateMenu } from './hooks';

interface UseMenuProps {
  restaurant_id: string;
}

export const useMenu = (props: UseMenuProps) => {
  const { t } = useTranslation();
  const { restaurant_id } = props;

  const navigate = useNavigate();
  const { closeAll } = useDialog();

  const { loadSingleMenu, loadAllMenus, menuList } = useGetMenu({
    restaurant_id,
  });

  const { openMenuCreateDialog } = useCreateMenu({
    onSuccess: async (result) => {
      await loadAllMenus();
      navigate(`/menu/${result.menu_id}`);
      closeAll();
    },
    restaurantId: restaurant_id,
  });

  const { openMenuUpdateDialog } = useUpdateMenu({
    onSuccess: async () => {
      await loadAllMenus();
      closeAll();
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllMenus();
        closeAll();
      }
    }
  });

  const { openMenuDeleteDialog } = useDeleteMenu({
    onSuccess: async () => {
      await loadAllMenus();
      navigate('/menu');
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllMenus();
        closeAll();
      }
    },
    onFinally: () => {
      closeAll();
    },
  });

  const menuActions: IAction<Menu>[] = [
    {
      label: t('common:buttons:edit'),
      callback: (menu: Menu) => openMenuUpdateDialog(menu),
    },
    {
      label: t('common:buttons:delete'),
      callback: (menu: Menu) => openMenuDeleteDialog(menu),
    },
  ];

  return {
    openMenuCreateDialog,
    menuList,
    loadSingleMenu,
    loadAllMenus,
    menuActions,
  };
};
