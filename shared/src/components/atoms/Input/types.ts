export enum InputVariants {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  RADIO = "radio",
  CHECKBOX = "checkbox",
}

export interface IInput {
  name: string;
  placeholder?: string;
  onChange: () => void;
  type: InputVariants;
  value?: string;
}
