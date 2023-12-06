import { FieldError } from 'react-hook-form';

export type OptionType<T = unknown> = {
  value: T;
  label: string;
};

type Options<T> = Array<OptionType<T>>;

export interface ISelectInput<T> {
  name: string;
  options: Options<T>;
  className?: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  closeMenuOnSelect?: boolean;
  onChange?: (data: unknown) => void;
  value?: OptionType<T> | OptionType<T>[];
  defaultValue?: OptionType<T> | OptionType<T>[] | null;
  placeholder?: string;
  isClearable?: boolean;
  error?: FieldError;
}
