import * as yup from "yup";
import {
  CreateDishRequest,
  Dish,
  DishState,
  UpdateDishRequest,
} from "@shared/services/DishService";

type CreateDishDefaultValues = Omit<CreateDishRequest, 'price'> & { price?: string };

export const useDishForms = (categoryId: string) => {

  const createDishDefaultValues: CreateDishDefaultValues = {
    category_id: categoryId,
    name: "",
    description: "",
    price: undefined,
    weight: undefined,
    calories: undefined,
    allergens: "",
    tags: "",
    state: DishState.ENABLED,
    image: "",
  };


  const createDishValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string(),
    price: yup.number().required("Price is required").typeError('Price must be a number'),
    weight: yup.number().notRequired().nullable().typeError('Weight must be a number'),
    calories: yup.number().notRequired().nullable().typeError('Calories must be a number'),
    state: yup.string(),
  }) as yup.ObjectSchema<Partial<Dish>>;

  const getDefaultValues = (dish?: Dish) => {
    if (dish) {
      return {
        ...createDishDefaultValues,
        ...dish,
      } as UpdateDishRequest;
    }
    return createDishDefaultValues;
  }

  return {
    getDefaultValues,
    createDishValidationSchema
  }
}
