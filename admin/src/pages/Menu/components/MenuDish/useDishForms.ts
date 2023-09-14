import * as yup from "yup";
import { useTranslation } from '@libs/react-i18next';
import {
  CreateDishRequest,
  Dish,
  DishState,
} from "@shared/services/DishService";

type ExcludeKeys = 'price' | 'weight' | 'calories';
type ExcludedAsOptionalString = Record<ExcludeKeys, string | null>;
export type DishDefaultValues = Omit<CreateDishRequest, ExcludeKeys> & ExcludedAsOptionalString;

const mapDishToDefaultValues = (dish: Dish): DishDefaultValues => ({
  category_id: dish.category_id,
  name: dish.name,
  description: dish.description || "",
  price: dish.price.toString() || "",
  weight: dish.weight?.toString() || "",
  calories: dish.calories?.toString() || "",
  allergens: dish.allergens,
  tags: dish.tags,
  state: dish.state,
});

export const useDishForms = (categoryId: string) => {
  const { t } = useTranslation();

  const createDishDefaultValues: DishDefaultValues = {
    category_id: categoryId,
    name: "",
    description: "",
    price: "",
    weight: "",
    calories: "",
    allergens: [],
    tags: [],
    state: DishState.ENABLED,
  };

  const createDishValidationSchema = yup.object().shape({
    name: yup.string().required(t('common:validation:isRequired', { field: t('dishForm:name') })).min(1, t('common:validation:morethan', { field: t('common:name') }))
    .max(200, t('common:validation:lessthan', { field: t('common:name') })).trim(),
    price: yup.number().required(t('common:validation:isRequired', { field: t('dishForm:price') }))
    .typeError(t('common:validation:isRequired', { field: t('dishForm:price') })).positive().max(100000, t('dishForm:maxprice', { field: t('dishForm:price') })),
    description: yup.string(),
    weight: yup.mixed().nullable().test('min-max', t('dishForm:weightbetween'), (value) => {
      if (value as number === null) return true;
      return value as number >= 1 && value as number <= 100000;
    }),
    calories: yup.mixed().nullable().test('min-max', t('dishForm:caloriesbetween'), (value) => {
      if (value as number === null) return true;
      return value as number >= 1 && value as number <= 30000;
    }),
    state: yup.string(),
  }) as yup.ObjectSchema<Partial<Dish>>;

  const getDefaultValues = (dish?: Dish): DishDefaultValues => {
    if (dish) {
      return mapDishToDefaultValues(dish);
    }
    return createDishDefaultValues;
  }

  return {
    getDefaultValues,
    createDishValidationSchema,
    createDishDefaultValues
  }
}
