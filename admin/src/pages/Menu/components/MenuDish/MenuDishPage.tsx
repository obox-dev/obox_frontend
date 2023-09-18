import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateDishRequest,
  UpdateDishRequest,
  DishesService,
  Dish,
} from "@shared/services/DishService";
import { DishForm } from "./MenuDishForm";
import { useDish } from "./useDish";
import { useDishForms } from "./hooks/useDishForms";
import type { DishDefaultValues } from './hooks/useDishForms';

export const MenuDishPage = () => {
  const [defaultValues, setDefaultValues] = useState<DishDefaultValues | null>(null);
  const [loading, setLoading] = useState<boolean>(!!useParams().dishId);
  const { menuId, categoryId, dishId } = useParams();

  const { onCreateSubmit, onUpdateSubmit } = useDish(categoryId!);
  const { createDishSchema, getDefaultValues } = useDishForms(categoryId!);
  const navigate = useNavigate();

  const navigateToCategory = useCallback(() => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  }, [navigate, menuId, categoryId]);

  useEffect(() => {
    const loadDish = async (id: string) => {
      const response = await DishesService.getDishById(id);
      setDefaultValues(getDefaultValues(response));
      setLoading(false);
    };

    if (dishId) {
      loadDish(dishId);
    } else {
      setDefaultValues(getDefaultValues());
      setLoading(false);
    }
  }, [dishId]);

  const handleOnSubmit = useCallback(async (data: Partial<Dish>) => {
    if (dishId) {
      await onUpdateSubmit(dishId, data as UpdateDishRequest);
    } else {
      await onCreateSubmit(data as CreateDishRequest);
    }
  }, [dishId, onUpdateSubmit, onCreateSubmit, navigateToCategory]);

  return loading || !defaultValues ? (
    <div>Loading...</div>
  ) : (
    <DishForm
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
      validationSchema={createDishSchema}
    />
  );
};

