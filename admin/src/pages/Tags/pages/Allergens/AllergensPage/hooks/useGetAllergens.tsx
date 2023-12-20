import { useState } from 'react';
import { AllergensResponse , AllergensService } from '@shared/services';
import { useRequest } from '@admin/hooks';

interface GetAllergensParams {
  restaurantId: string;
}

export const useGetAllergens = (args: GetAllergensParams) => {
  const { restaurantId } = args;
  const [allergensList, setAllergensList] = useState<AllergensResponse[]>([]);
  
  const loadAllergens = () => {
    return AllergensService.getAllergensByRestaurantId(restaurantId);
  };

  const { execute: loadAllAllergens } = useRequest({
    requestFunction: loadAllergens,
    onSuccess: (result: AllergensResponse[]) => {
      setAllergensList(result);
    },
    onError: (error) => {
      console.error('Error fetching allergens:', error);
    },
  });

  return {
    loadAllAllergens,
    allergensList,
  };
};