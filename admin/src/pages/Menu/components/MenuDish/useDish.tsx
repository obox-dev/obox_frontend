import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import {
  CreateDishResponse,
  DishInStock,
  DishResponse,
} from '@shared/services/DishService';
import { mapDishContent } from './mappers/mapDishContent';
import { EntityState } from '@shared/utils/types';
import {
  useGetDish,
  useCreateDish,
  useUpdateDish,
  useDeleteDish,
} from './hooks';
import { DishActions, DishActionTypes } from './types';

interface UseDishProps {
  menuId: string;
  dishId?: string;
  categoryId: string;
  language: string;
  onCreateSuccess?: (dishId: string) => unknown | Promise<unknown>;
  onUpdateSuccess?: (dishId: string) => unknown | Promise<unknown>;
}

export const useDish = (props: UseDishProps) => {
  const { menuId,dishId, categoryId, language, onCreateSuccess, onUpdateSuccess } = props;
  const { closeAll } = useDialog();

  const navigate = useNavigate();

  const navigateToDish = (dishId: string) => {
    navigate(`/menu/${menuId}/category/${categoryId}/dish/${dishId}`);
  };

  const navigateToCategory = () => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  };

  const { loadAllDishes, loadSingleDish, dishList } = useGetDish({
    categoryId,
  });

  const { onCreateSubmit } = useCreateDish({
    onSuccess: async (dish: CreateDishResponse) => {
      await onCreateSuccess?.(dish.dish_id);
    },
  });

  const { onUpdateSubmit, updateState, updateInStock } = useUpdateDish({
    onSuccess: async () => {
      await onUpdateSuccess?.(dishId!);
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllDishes();
        closeAll();
      }
    },
    language,
  });

  const { openDishDeleteDialog } = useDeleteDish({
    onSuccess: async () => {
      navigateToCategory();
    },
    
  });

  const changeState = useCallback(async (dish: DishResponse) => {
    const dishContent = {
      ...mapDishContent(dish, language),
      state:
        dish.state === EntityState.ENABLED
          ? EntityState.DISABLED
          : EntityState.ENABLED,
    };

    await updateState(dishContent);
    await loadAllDishes();
  }, []);

  const changeInStock = useCallback(async (dish: DishResponse) => {
    const dishContent = {
      ...mapDishContent(dish, language),
      in_stock:
        dish.in_stock === DishInStock.ENABLED
          ? DishInStock.DISABLED
          : DishInStock.ENABLED,
    };

    await updateInStock(dishContent);
    await loadAllDishes();
  }, []);

  const menuDishesActions: DishActions = {
    [DishActionTypes.UPDATE_STATE]: changeState,
    [DishActionTypes.EDIT]: (dish: DishResponse) => {
      navigateToDish(dish.dish_id);
    },
    [DishActionTypes.DELETE]: openDishDeleteDialog,
    [DishActionTypes.CHANGE_IN_STOCK]: changeInStock,
  };

  return {
    onCreateSubmit,
    onUpdateSubmit,
    dishList,
    menuDishesActions,
    loadSingleDish,
    loadAllDishes,
  };
};
