import * as yup from "yup";
import {
  CreateDishRequest,
  Dish,
  DishState,
  UpdateDishRequest,
} from "@shared/services/DishService";

type CreateExcludeKeys = 'price' | 'weight' | 'calories';
type ExcludedAsOptionalString = Record<CreateExcludeKeys, string | undefined>;
type CreateDishDefaultValues = Omit<CreateDishRequest, CreateExcludeKeys> & ExcludedAsOptionalString;

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
    weight: yup.mixed().nullableNumber('Weight must be a number'),
    calories: yup.mixed().nullableNumber('Weight must be a number'),
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
    createDishValidationSchema,
    createDishDefaultValues
  }
}
