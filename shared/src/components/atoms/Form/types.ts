export interface IForm<T> {
  onSubmit: (data: T) => void;
  children: Array<JSX.Element> | JSX.Element;
  isDisabled?: boolean;
}
export interface FormRef {
  submit: () => Promise<void>;
}
