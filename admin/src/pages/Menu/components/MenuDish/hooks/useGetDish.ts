import { useRequest } from "@admin/hooks";
import { CategoriesService } from "@shared/services";
import { Dish, DishesService } from "@shared/services/DishService";
import { useState } from "react";

interface GetDishParams {
  categoryId: string;
}

export const useGetDish = (args: GetDishParams) => {
  const { categoryId } = args;

  const [dishList, setDishList] = useState<Dish[]>([]);

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

  return {
    loadSingleDish,
    loadAllDishes,
    dishList,
  }
}