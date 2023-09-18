import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from '@libs/react-i18next';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { IAction } from '@shared/components/atoms/ActionMenu';
import { Dish } from '@shared/services/DishService';
import {
  useGetDish,
  useCreateDish,
  useUpdateDish,
  useDeleteDish,
} from './hooks';

export const useDish = (categoryId: string) => {
  const { t } = useTranslation();
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

  const { onUpdateSubmit } = useUpdateDish({
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
    }
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
    }
  });

  const menuDishesActions: IAction<Dish>[] = [
    {
      label: t('common:buttons:edit'),
      callback: (dish: Dish) => navigateToDish(dish.dish_id),
    },
    {
      label: t('common:buttons:delete'),
      callback: (dish: Dish) => openDishDeleteDialog(dish),
    },
  ];

  return {
    onCreateSubmit,
    onUpdateSubmit,
    dishList,
    menuDishesActions,
    loadSingleDish,
    loadAllDishes,
  };
};
