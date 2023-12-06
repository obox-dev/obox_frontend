import { object, string } from 'yup';
import { useTranslation } from '@libs/react-i18next';

export const useDishFormValidation = () => {
  const { t } = useTranslation();

  const MIN_NAME_LENGTH = 1;
  const MAX_NAME_LENGTH = 200;
  const MIN_PRICE = 0;
  const MAX_PRICE = 100000;
  const MIN_COOKING_TIME = 0;
  const MAX_COOKING_TIME = 600;
  const MIN_WEIGHT = 1;
  const MAX_WEIGHT = 100000;
  const MIN_CALORIES = 1;
  const MAX_CALORIES = 30000;

  const REGEXP_FLOAT_NUMBER = /^(0(?!\d)(?:\.\d+)?|[1-9]\d*(?:\.\d+)?|\.\d+)$/;
  const REGEXP_INTEGER = /^(0|[1-9]\d*)$/;
  const REGEXP_WEIGHT = /^(\d+\/?)*\d+$/;

  const NAME_IS_REQUIRED_MESSAGE = t('common:validation:isRequired', {
    field: t('dishForm:dishName'),
  });

  const MIN_NAME_LENGTH_MESSAGE = t('common:validation:morethan', {
    field: t('dishForm:dishName'),
    min: MIN_NAME_LENGTH,
  });

  const MAX_NAME_LENGTH_MESSAGE = t('common:validation:lessthan', {
    field: t('dishForm:dishName'),
    max: MAX_NAME_LENGTH,
  });

  const PRICE_IS_REQUIRED_MESSAGE = t('common:validation:isRequired', {
    field: t('dishForm:price'),
  });

  const PRICE_FIELD = t('dishForm:price');
  const SPECIAL_PRICE_FIELD = t('dishForm:specialPrice');
  const WEIGHT_FIELD = t('dishForm:weight');

  const getFloatFormatMessageFor = (field: string) => {
    return t('common:validation:floatFormat', { field });
  };

  const getIntegerMessageFor = (field: string) => {
    return t('common:validation:isInteger', { field });
  };

  const getWeightMessageFor = (field: string) => {
    return t('common:validation:weightFormat', { field });
  };

  const getRangeMessageFor = (field: string, min: number, max: number) => {
    return t('dishForm:isInRange', {
      field,
      min,
      max,
    });
  };

  const getSymbolPositionMessage = (field: string, symbol: string) => {
    return t('common:validation.symbolPosition', {
      field,
      symbol,
    });
  };

  const createDishSchema = object({
    name: string()
      .required(NAME_IS_REQUIRED_MESSAGE)
      .min(MIN_NAME_LENGTH, MIN_NAME_LENGTH_MESSAGE)
      .max(MAX_NAME_LENGTH, MAX_NAME_LENGTH_MESSAGE)
      .trim(),
    price: string()
      .required(PRICE_IS_REQUIRED_MESSAGE)
      .test('symbol', getSymbolPositionMessage(PRICE_FIELD, '.'), (value) => {
        if (value) {
          const firstSymbol = value.charAt(0);
          const lastSymbol = value.charAt(value.length - 1);
          return firstSymbol !== '.' && lastSymbol !== '.';
        }
        return true;
      })
      .matches(
        REGEXP_FLOAT_NUMBER,
        getFloatFormatMessageFor(t('dishForm:price'))
      )
      .test(
        'min-max',
        getRangeMessageFor(t('dishForm:price'), MIN_PRICE, MAX_PRICE),
        (value) => {
          if (value) {
            return +value > MIN_PRICE && +value <= MAX_PRICE;
          }
          return true;
        }
      ),
    special_price: string()
      .test('symbol', getSymbolPositionMessage(SPECIAL_PRICE_FIELD, '.'), (value) => {
        if (value) {
          const firstSymbol = value.charAt(0);
          const lastSymbol = value.charAt(value.length - 1);
          return firstSymbol !== '.' && lastSymbol !== '.';
        }
        return true;
      })
      .matches(REGEXP_FLOAT_NUMBER, {
        excludeEmptyString: true,
        message: getFloatFormatMessageFor(t('dishForm:specialPrice')),
      })
      .test(
        'min-max',
        getRangeMessageFor(t('dishForm:specialPrice'), MIN_PRICE, MAX_PRICE),
        (value) => {
          if (value) {
            return +value > MIN_PRICE && +value <= MAX_PRICE;
          }
          return true;
        }
      ),
    cooking_time: string()
      .matches(REGEXP_INTEGER, {
        excludeEmptyString: true,
        message: getIntegerMessageFor(t('dishForm:cookingTime')),
      })
      .test(
        'min-max',
        getRangeMessageFor(
          t('dishForm:cookingTime'),
          MIN_COOKING_TIME,
          MAX_COOKING_TIME
        ),
        (value) => {
          if (value) {
            return +value > MIN_COOKING_TIME && +value <= MAX_COOKING_TIME;
          }
          return true;
        }
      ),
    description: string(),
    weight: string()
      .test('symbol', getSymbolPositionMessage(WEIGHT_FIELD, '/'), (value) => {
        if (value) {
          const firstSymbol = value.charAt(0);
          const lastSymbol = value.charAt(value.length - 1);
          return firstSymbol !== '/' && lastSymbol !== '/';
        }
        return true;
      })
      .matches(REGEXP_WEIGHT, {
        excludeEmptyString: true,
        message: getWeightMessageFor(t('dishForm:weight')),
      })
      .test(
        'min-max',
        getRangeMessageFor(t('dishForm:weight'), MIN_WEIGHT, MAX_WEIGHT),
        (value) => {
          if (value) {
            const parts = value.split('/');
            return parts.every((part) => {
              const num = parseInt(part, 10);
              return !isNaN(num) && num >= MIN_WEIGHT && num <= MAX_WEIGHT;
            });
          }
          return true;
        }
      ),
    calories: string()
      .matches(REGEXP_INTEGER, {
        excludeEmptyString: true,
        message: getIntegerMessageFor(t('dishForm:calories')),
      })
      .test(
        'min-max',
        getRangeMessageFor(t('dishForm:calories'), MIN_CALORIES, MAX_CALORIES),
        (value) => {
          if (value) {
            return +value >= MIN_CALORIES && +value <= MAX_CALORIES;
          }
          return true;
        }
      ),
  });
  return { createDishSchema };
};
