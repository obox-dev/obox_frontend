import { AxiosError } from 'axios';
import { useRequest } from '@admin/hooks';
import { DishesService } from '@shared/services';
import { Dish, UpdateDishRequest, UpdateInStockRequest } from '@shared/services/DishService';
import { UpdateStateRequest } from '@shared/utils/types';

interface UpdateDishParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  language: string;
}

export const useUpdateDish = (args: UpdateDishParams) => {
  const { onSuccess, onError, language } = args;

  const editSubmit = async (
    dish_id: string,
    {
      name,
      description,
      price,
      associated_id,
      weight,
      calories,
      // allergens,
      // marks,
      in_stock,
      language,
    }: UpdateDishRequest
  ) => {
    const id = dish_id;
    const request: UpdateDishRequest = {
      name,
      description,
      price,
      associated_id,
      weight,
      calories,
      // allergens,
      // marks,
      in_stock,
      language,
    };
    return DishesService.update(id, request);
  };

  const updateState = async ({ dish_id, state }: Dish) => {
    const id = dish_id;
    const request: UpdateStateRequest = {
      state,
      language,
    };

    await DishesService.update(id, request);
  };

  const updateInStock = async ({ dish_id, in_stock }: Dish) => {
    const id = dish_id;
    const request: UpdateInStockRequest = {
      in_stock,
      language,
    };

    await DishesService.update(id, request);
  };

  const { execute: onUpdateSubmit } = useRequest({
    requestFunction: editSubmit,
    onSuccess,
    onError,
  });

  return {
    onUpdateSubmit,
    updateState,
    updateInStock
  };
};
