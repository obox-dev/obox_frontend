import { useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { DishResponse } from '@shared/services/DishService';
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
  categoryId: string;
  language: string;
}

export const useDish = (props: UseDishProps) => {
  // const { t } = useTranslation();
  const { categoryId, language } = props;
  const { closeAll } = useDialog();

  const { menuId } = useParams();

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

  const { onUpdateSubmit, updateState } = useUpdateDish({
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
      await loadAllDishes();
    },
    onFinally: () => {
      closeAll();
    },
    onError: async (error) => {
      if (error.response?.status === 404) {
        await loadAllDishes();
        closeAll();
      }
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

  const toggleDiscount = () => {
    // toggle discount logic
  };

  const changeInStock = () => {
    // change InStock logic
  };

  const menuDishesActions: DishActions = {
    [DishActionTypes.UPDATE_STATE]: changeState,
    [DishActionTypes.EDIT]: (dish: DishResponse) => {
      navigateToDish(dish.dish_id);
    },
    [DishActionTypes.DELETE]: openDishDeleteDialog,
    [DishActionTypes.TOGGLE_DISCOUNT]: toggleDiscount,
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
