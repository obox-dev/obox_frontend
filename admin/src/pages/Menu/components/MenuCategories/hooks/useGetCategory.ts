import { useState } from 'react';
import { useRequest } from '@admin/hooks';
import { CategoriesService, MenuService, CategoryResponse } from '@shared/services';

interface GetCategoryParams {
  menuId: string;
}

export const useGetCategory = (args: GetCategoryParams) => {
  const { menuId } = args;
  const [categoriesList, setCategoriesList] = useState<CategoryResponse[]>([]);

  const loadCategories = () => {
    return MenuService.getCategoriesByMenuId(menuId);
  };

  const { execute: loadAllCategories } = useRequest({
    requestFunction: loadCategories,
    onSuccess: (result: CategoryResponse[]) => {
      setCategoriesList(result);
    },
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
  });

  const { execute: loadSingleCategory } = useRequest({
    requestFunction: CategoriesService.getById,
    redirect404: true,
  });

  return {
    loadSingleCategory,
    loadAllCategories,
    loadCategories,
    categoriesList,
  };
};
