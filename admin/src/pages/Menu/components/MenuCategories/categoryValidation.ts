import { Category } from '@shared/services';
import * as yup from 'yup';

export const categorySchema: yup.Schema<Partial<Category>> = yup.object().shape({
  name: yup.string().required("Category name is required.").min(11),
});
