import { useState } from 'react';
import { EntitySearchResponse, SearchService } from '@shared/services';
import { useRequest } from '@admin/hooks';

interface GetDishesParams {
  markId: string;
}

export const useSearchDishesForMarks = (args: GetDishesParams) => {
  const { markId } = args;

  const [categoriesDishesList, setCategoriesDishesList] = useState<EntitySearchResponse[]>([]);

  const loadDishes = () => {
    return SearchService.searchByMarkId(markId);
  };

  const { execute: loadAllDishes } = useRequest({
    requestFunction: loadDishes,
    onSuccess: (result: EntitySearchResponse[]) => {
      setCategoriesDishesList(result);
    },
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
  });

  return {
    loadAllDishes,
    categoriesDishesList,
  };
};