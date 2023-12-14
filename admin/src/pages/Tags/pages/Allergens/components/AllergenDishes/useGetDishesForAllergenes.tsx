import { useRequest } from '@admin/hooks';
import { EntitySearchResponse, SearchService } from '@shared/services';
import { useState } from 'react';

interface GetDishesParams {
  allergenId: string;
}

export const useGetDishesForAllergen = (args: GetDishesParams) => {
  const { allergenId } = args;

  const [dishesList, setDishesList] = useState<EntitySearchResponse[]>([]);

  const loadDishes = () => {
    return SearchService.searchByAllergenId(allergenId);
  };

  const { execute: loadAllDishes } = useRequest({
    requestFunction: loadDishes,
    onSuccess: (result: EntitySearchResponse[]) => {
      setDishesList(result);
    },
    onError: (error) => {
      console.error('Error fetching categories:', error);
    },
  });

  return {
    loadAllDishes,
    dishesList,
  };
};