import { useRequest } from '@admin/hooks';
import { DishesService } from '@shared/services';

interface CreateDishParams {
  onSuccess: () => Promise<void>;
}

export const useCreateDish = (args: CreateDishParams) => {
  const { onSuccess } = args;
  const { execute: onCreateSubmit } = useRequest({
    requestFunction: DishesService.create,
    onSuccess,
    onError: (error) => {
      throw error;
    },
  });

  return {
    onCreateSubmit,
  };
};