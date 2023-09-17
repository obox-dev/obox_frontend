import * as yup from 'yup';
import { useTranslation } from '@libs/react-i18next';

export const useCategoryFormValidation = () => {
  const { t } = useTranslation();
  const MIN_NAME_LENGTH = 1;
  const MAX_NAME_LENGTH = 200;

  const NAME_IS_REQUIRED_MESSAGE = t('common:validation:isRequired', {
    field: t('dishForm:name'),
  });

  const MIN_NAME_LENGTH_MESSAGE = t('common:validation:morethan', {
    field: t('common:name'),
    min: MIN_NAME_LENGTH,
  });

  const MAX_NAME_LENGTH_MESSAGE = t('common:validation:lessthan', {
    field: t('common:name'),
    max: MAX_NAME_LENGTH,
  });

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(NAME_IS_REQUIRED_MESSAGE)
      .min(MIN_NAME_LENGTH, t(MIN_NAME_LENGTH_MESSAGE))
      .max(MAX_NAME_LENGTH, t(MAX_NAME_LENGTH_MESSAGE))
      .trim(),
  });
  return { validationSchema };
};
