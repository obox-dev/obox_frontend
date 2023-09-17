import { useRequest } from '@admin/hooks';
import { Category, CategoriesService, MenuService } from '@shared/services';
import { useState } from 'react';

interface GetCategoryParams {
  menuId: string;
}

export const useGetCategory = (args: GetCategoryParams) => {
  const { menuId } = args;
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const loadCategories = () => {
    return MenuService.getCategoriesByMenuId(menuId);
  };

  const { execute: loadAllCategories } = useRequest({
    requestFunction: loadCategories,
    onSuccess: (result: Category[]) => {
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
