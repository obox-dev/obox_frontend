import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { useTranslation } from '@libs/react-i18next';
import { CategoryResponse, CreateCategoryResponse } from '@shared/services';
import { IAction } from '@shared/components/atoms/ActionMenu';
import { useNavigate } from 'react-router-dom';
import { useCreateCategory, useGetCategory, useUpdateCategory } from './hooks';
import { useDeleteCategory } from './hooks/useDeleteCategory';
import { IActionLabelRenderParams } from '@shared/components/atoms/ActionMenu/types';
import { EntityState } from '@shared/utils/types';
import { Switcher } from '@shared/components/atoms/Switcher';
import { mapCategoryContent } from './mappers/mapCategoryContent';

export const useCategories = (menuId: string, language: string) => {
  const { t } = useTranslation(['common', 'menu']);
  const { closeAll } = useDialog();
  const navigate = useNavigate();

  const { loadSingleCategory, loadAllCategories, categoriesList } =
    useGetCategory({
      menuId,
    });

  const { openCategoryCreateDialog } = useCreateCategory({
    onSuccess: async (result: CreateCategoryResponse) => {
      await loadAllCategories();
      navigate(`/menu/${menuId}/category/${result.category_id}`);
      closeAll();
    },
    menuId: menuId,
    language,
  });

  const { openCategoryUpdateDialog, updateState } = useUpdateCategory({
    onSuccess: async () => {
      await loadAllCategories();
      closeAll();
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllCategories();
        closeAll();
      }
    },
    language,
  });

  const { openCategoryDeleteDialog } = useDeleteCategory({
    onSuccess: async () => {
      await loadAllCategories();
      navigate(`/menu/${menuId}`);
    },
    onFinally: () => closeAll(),
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllCategories();
        closeAll();
      }
    },
    language,
  });

  const menuCategoriesActions: IAction<CategoryResponse>[] = [
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
      callback: async (category: CategoryResponse) => {
        const categoryContent = {
          ...mapCategoryContent(category, language),
          state:
            category.state === EntityState.ENABLED
              ? EntityState.DISABLED
              : EntityState.ENABLED,
        };
        
        await updateState(categoryContent);
        await loadAllCategories();
      },
    },
    {
      label: t('common:buttons:edit'),
      callback: (category: CategoryResponse) => openCategoryUpdateDialog(category),
    },
    {
      label: t('common:buttons:delete'),
      callback: (category: CategoryResponse) => openCategoryDeleteDialog(category),
    },
  ];

  return {
    openCategoryCreateDialog,
    categoriesList,
    menuCategoriesActions,
    loadAllCategories,
    loadSingleCategory,
  };
};
