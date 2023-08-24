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
    description: yup.string(),
    price: yup.mixed().required(t('common:validation:isRequired', { field: t('dishForm:price') }))
      .typeError(t('common:validation:isNumber', { field: t('dishForm:price') })),
    weight: yup.mixed().nullableNumber(t('common:validation:isNumber', { field: t('dishForm:weight') })),
    calories: yup.mixed().nullableNumber(t('common:validation:isNumber', { field: t('dishForm:calories') })),
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
