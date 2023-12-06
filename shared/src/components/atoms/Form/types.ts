import {
  Path,
  PathValue,
} from 'react-hook-form';
export interface IForm<T> {
  onSubmit: (data: T) => void;
  children: Array<JSX.Element> | JSX.Element;
  isDisabled?: boolean;
}
export interface FormRef<T> {
  submit: () => Promise<void>;
  reset: () => void;
  setValue: (key: Path<T>, value: PathValue<T, Path<T>>) => void;
  clearFieldErrors: (key: Path<T>) => void;
}
