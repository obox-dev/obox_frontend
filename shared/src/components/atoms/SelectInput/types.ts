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
  onChange?: (data: Options<T> | OptionType<T>) => void;
  defaultValue?: OptionType<T> | OptionType<T>[];
  placeholder?: string;
  isClearable?: boolean;
}
