import { useNavigate } from 'react-router-dom';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import {
  DishInStock,
  DishResponse,
} from '@shared/services/DishService';
import {
  useGetDish,
  useCreateDish,
  useUpdateDish,
  useDeleteDish,
} from './hooks';
import { mapDishContent } from '@shared/mappers/DishMapper';
import { EntityState } from '@shared/utils/types';
import { DishActions, DishActionTypes } from './types';
import { useCallback } from 'react';

interface UseDishProps {
  menuId: string;
  categoryId: string;
  language: string;
}

export const useDish = (props: UseDishProps) => {
  const { menuId,categoryId, language } = props;
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
    onSuccess: async () => {
      await loadAllDishes();
      navigateToCategory();
      closeAll();
    },
  });

  const { onUpdateSubmit, updateState, updateInStock } = useUpdateDish({
    onSuccess: async () => {
      await loadAllDishes();
      navigateToCategory();
      closeAll();
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
