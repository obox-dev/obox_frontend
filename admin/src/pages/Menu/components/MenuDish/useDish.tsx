import { useState } from "react";
import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { IAction } from "@shared/components/atoms/ActionMenu";
import { useTranslation } from "@libs/react-i18next";
import {
  CreateDishRequest,
  Dish,
  DishesService,
  UpdateDishRequest,
} from "@shared/services/DishService";
import { CategoriesService } from "@shared/services/CategoriesService";
import { useNavigate, useParams } from "react-router";

export const useDish = (categoryId: string) => {
  const { t } = useTranslation();
  const { openDialog } = useDialog();
  const [dishList, setDishList] = useState<Dish[]>([]);

  const { menuId } = useParams();

  const navigate = useNavigate();
  const navigateToDish = (dishId: string) => {
    navigate(`/menu/${menuId}/category/${categoryId}/dish/${dishId}`);
  };

  const loadDishes = async (category_id: string) => {
    try {
      const dish = await CategoriesService.getDishesByCategoryId(category_id);
      setDishList(dish);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onCreateSubmit = async (
    data: CreateDishRequest,
    afterSubmit: () => void
  ) => {
    try {
      await DishesService.create(data);
      afterSubmit();
    } catch (error) {
      throw error;
    }
  };

  const onEditSubmit = async (
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
    }: UpdateDishRequest,
    afterSubmit: () => void
  ) => {
    try {
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
      await DishesService.update(id, request);
      afterSubmit();
    } catch (error) {
      throw error;
    }
  };

  const onDeleteSubmit = async ({ dish_id }: Dish) => {
    try {
      await DishesService.delete(dish_id);
      await loadDishes(categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openDishDeleteDialog = (dish: Dish) =>
    openDialog(({ closeDialog }) => {
      return (
        <Dialog
          okCallback={() => {
            onDeleteSubmit(dish);
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
  };
};
