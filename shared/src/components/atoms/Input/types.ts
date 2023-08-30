import { ChangeEvent } from "react";

export enum InputVariants {
  TEXT = "text",
  NUMBER = "number",
  PASSWORD = "password",
  EMAIL = "email",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  HIDDEN = "hidden",
  FILE = "file"
}

export interface IInput<T> {
  name: string;
  id?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<T>) => void;
  type: InputVariants;
  value?: string;
  checked?: boolean;
  isDisabled?: boolean;
}
