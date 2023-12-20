import { useState } from 'react';
import { EntitySearchResponse, SearchService } from '@shared/services';
import { useRequest } from '@admin/hooks';

interface GetDishesParams {
  allergenId: string;
}

export const useSearchDishesForAllergen = (args: GetDishesParams) => {
  const { allergenId } = args;

  const [categoriesDishesList, setCategoriesDishesList] = useState<EntitySearchResponse[]>([]);

  const loadDishes = () => {
    return SearchService.searchByAllergenId(allergenId);
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