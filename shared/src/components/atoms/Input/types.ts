import { ChangeEvent } from "react";

export enum InputVariants {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  RADIO = "radio",
  CHECKBOX = "checkbox",
}

export interface IInput<T> {
  name: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<T>) => void;
  type: InputVariants;
  value?: string;
  checked?: boolean;
}
