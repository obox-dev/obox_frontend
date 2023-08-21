import * as yup from 'yup';
export interface IForm<T> {
  onSubmit: (data: T) => void;
  children: Array<JSX.Element> | JSX.Element;
  isDisabled?: boolean;
  validationSchema?: yup.Schema<T>;
}
export interface FormRef {
  submit: () => Promise<void>;
}
