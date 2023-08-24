import { ChangeEvent } from "react";

export enum InputVariants {
  TEXT = "text",
  NUMBER = "number",
  PASSWORD = "password",
  EMAIL = "email",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  HIDDEN = "hidden",
}

export interface IInput<T> {
  name: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<T>) => void;
  type: InputVariants;
  value?: string;
  checked?: boolean;
  isDisabled?: boolean;
}
