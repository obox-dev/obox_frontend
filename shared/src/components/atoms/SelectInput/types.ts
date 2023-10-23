export type OptionType<T = unknown> = {
  value?: T;
  label: string;
};

type Options<T> = Array<OptionType<T>>;

export interface ISelectInput<T> {
  defaultValue: null | OptionType;
  isDisabled?: boolean;
  name: string;
  options: Options<T>;
  className?: string;
}
