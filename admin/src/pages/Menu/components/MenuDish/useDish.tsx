import { useState } from "react";
import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { IAction } from "@shared/components/atoms/ActionMenu";
import { useTranslation } from "@libs/react-i18next";
import {
  Dish,
  DishesService,
  UpdateDishRequest,
} from "@shared/services/DishService";
import { CategoriesService } from "@shared/services/CategoriesService";
import { useNavigate, useParams } from "react-router-dom";
import { useRequest } from "@admin/hooks";

export const useDish = (categoryId: string) => {
  const { t } = useTranslation();
  const { openDialog, closeAll } = useDialog();
  const [dishList, setDishList] = useState<Dish[]>([]);

  const { menuId } = useParams();

  const navigate = useNavigate();
  const navigateToDish = (dishId: string) => {
    navigate(`/menu/${menuId}/category/${categoryId}/dish/${dishId}`);
  };

  const navigateToCategory = () => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  };

  const loadDishes = () => {
    return CategoriesService.getDishesByCategoryId(categoryId);
  };

  const { execute: loadAllDishes } = useRequest({
    requestFunction: loadDishes,
    onSuccess: (result: Dish[]) => {
      setDishList(result);
    },
    onError: (error) => {
      console.error("Error fetching categories:", error);
    },
  });

  const { execute: loadSingleDish } = useRequest({
    requestFunction: DishesService.getDishById,
    redirect404: true,
  });

  const { execute: onCreateSubmit } = useRequest({
    requestFunction: DishesService.create,
    onSuccess: async () => {
      await loadAllDishes();
      navigateToCategory();
      closeAll();
    },
    onError: (error) => {
      throw error;
    },
  });

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
      images,
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
        images,
      };
      return DishesService.update(id, request);
  };

  const { execute: onEditSubmit } = useRequest({
    requestFunction: editSubmit,
    onSuccess: async () => {
      await loadAllDishes();
      navigateToCategory();
      closeAll();
    },
    onError: (error) => {
      throw error;
    },
  });

  const { execute: onDeleteSubmit } = useRequest({
    requestFunction: DishesService.delete,
    onSuccess: async () => {
      await loadAllDishes();
    },
    onFinally: () => closeAll(),
    onError: (error) => {
      console.error("Error deleting category:", error);
    },
  });

  const openDishDeleteDialog = (dish: Dish) =>
    openDialog(({ closeDialog }) => {
      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(dish.dish_id);
            closeDialog();
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t("menu:deleteMenuForm.title")}
          size="lg"
          okText={t("common:buttons:confirm")}
          cancelText={t("common:buttons:cancel")}
          okButtonVariant={ButtonVariants.DANGER}
        >
          <p>
            {t("menu:deleteMenuForm.message")} <strong>{dish.name}</strong>?
          </p>
        </Dialog>
      );
    });

  const menuDishesActions: IAction<Dish>[] = [
    {
      label: t("common:buttons:edit"),
      callback: (dish: Dish) => navigateToDish(dish.dish_id),
    },
    {
      label: t("common:buttons:delete"),
      callback: (dish: Dish) => openDishDeleteDialog(dish),
    },
  ];

  return {
    loadDishes,
    onCreateSubmit,
    onEditSubmit,
    dishList,
    menuDishesActions,
    loadSingleDish,
    loadAllDishes,
  };
};
