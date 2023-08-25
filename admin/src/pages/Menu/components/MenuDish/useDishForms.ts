import * as yup from "yup";
import { useTranslation } from '@libs/react-i18next';
import {
  CreateDishRequest,
  Dish,
  DishState,
  UpdateDishRequest,
} from "@shared/services/DishService";

type CreateExcludeKeys = 'price' | 'weight' | 'calories';
type ExcludedAsOptionalString = Record<CreateExcludeKeys, string | null>;
type CreateDishDefaultValues = Omit<CreateDishRequest, CreateExcludeKeys> & ExcludedAsOptionalString;

export const useDishForms = (categoryId: string) => {
  const { t } = useTranslation();

  const createDishDefaultValues: CreateDishDefaultValues = {
    category_id: categoryId,
    name: "",
    description: "",
    price: null,
    weight: null,
    calories: null,
    allergens: "",
    tags: "",
    state: DishState.ENABLED,
    image: "",
  };

  const createDishValidationSchema = yup.object().shape({
    name: yup.string().required(t('common:validation:isRequired', { field: t('dishForm:name') })),
    price: yup.number().required()
    .typeError(t('common:validation:isRequired', { field: t('dishForm:price') })),
    description: yup.string(),
    weight: yup.mixed().nullable(),
    calories: yup.mixed().nullable(),
    state: yup.string(),
  }) as yup.ObjectSchema<Partial<Dish>>;

  const getDefaultValues = (dish?: Dish) => {
    if (dish) {
      return {
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
