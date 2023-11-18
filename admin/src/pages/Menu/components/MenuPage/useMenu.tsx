import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@libs/react-i18next';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { MenuResponse } from '@shared/services';
import { IAction } from '@shared/components/atoms/ActionMenu';
import { useGetMenu } from './hooks/useGetMenu';
import { useCreateMenu, useDeleteMenu, useUpdateMenu } from './hooks';
import { Switcher } from '@shared/components/atoms/Switcher';
import { IActionLabelRenderParams } from '@shared/components/atoms/ActionMenu/types';
import { EntityState } from '@shared/utils/types';
import { mapMenuContent } from './mappers/mapMenuContent';

interface UseMenuProps {
  restaurant_id: string;
  language: string;
}

export const useMenu = (props: UseMenuProps) => {
  const { t } = useTranslation();
  const { restaurant_id, language } = props;

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
    language,
  });

  const { openMenuUpdateDialog, updateState } = useUpdateMenu({
    onSuccess: async () => {
      await loadAllMenus();
      closeAll();
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllMenus();
        closeAll();
      }
    },
    language,
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
    language,
  });

  const menuActions: IAction<MenuResponse>[] = [
    {
      renderLabel: (params?: IActionLabelRenderParams) => {
        const value =
          params?.state === EntityState.ENABLED
            ? EntityState.ENABLED
            : EntityState.DISABLED;
        return (
          <>
            <Switcher
              textForChecked="checked"
              textForUnchecked="unchecked"
              name="state"
              value={value}
            />
          </>
        );
      },
      callback: async (menu: MenuResponse) => {
        const menuContent = {
          ...mapMenuContent(menu, language),
          state:
            menu.state === EntityState.ENABLED
              ? EntityState.DISABLED
              : EntityState.ENABLED,
        };
        
        await updateState(menuContent);
        await loadAllMenus();
      },
    },
    {
      label: t('common:buttons:edit'),
      callback: (menu: MenuResponse) => openMenuUpdateDialog(menu),
    },
    {
      label: t('common:buttons:delete'),
      callback: (menu: MenuResponse) => openMenuDeleteDialog(menu),
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
