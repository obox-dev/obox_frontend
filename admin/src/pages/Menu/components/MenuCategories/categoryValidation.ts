import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
  name: Yup.string().required("Category name is required.").min(11),
});
