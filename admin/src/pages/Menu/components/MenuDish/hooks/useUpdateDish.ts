import { AxiosError } from 'axios';
import { DishesService } from '@shared/services';
import {
  Dish,
  UpdateDishRequest,
  UpdateInStockRequest,
} from '@shared/services/DishService';
import { UpdateStateRequest } from '@shared/utils/types';
import { useRequest } from '@admin/hooks';

interface UpdateDishParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  language: string;
}

export const useUpdateDish = (args: UpdateDishParams) => {
  const { onSuccess, onError, language } = args;

  const editSubmit = async (
    dish_id: string,
    params: UpdateDishRequest,
  ) => {
    const id = dish_id;
    return DishesService.update(id, params);
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
    updateInStock,
  };
};
