import { AxiosError } from "axios";
import { useRequest } from "@admin/hooks";
import { DishesService } from "@shared/services";
import { UpdateDishRequest } from "@shared/services/DishService";

interface UpdateDishParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
}

export const useUpdateDish = (args: UpdateDishParams) => {
  const { onSuccess, onError } = args;

  const editSubmit = async (
    dish_id: string,
    {
      name,
      description,
      price,
      associated_id,
      weight,
      calories,
      allergens,
      tags,
    }: UpdateDishRequest) => {
    const id = dish_id;
    const request: UpdateDishRequest = {
      name,
      description,
      price,
      associated_id,
      weight,
      calories,
      allergens,
      tags,
    };
    return DishesService.update(id, request);
  };

  const { execute: onUpdateSubmit } = useRequest({
    requestFunction: editSubmit,
    onSuccess,
    onError,
  });

  return {
    onUpdateSubmit,
  }
}