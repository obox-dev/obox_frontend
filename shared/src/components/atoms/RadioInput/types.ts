import { IInput } from "../Input/types";

type IInputWithoutTypePlaceholder = Omit<IInput<HTMLInputElement>, "placeholder" | "type">

export interface IRadioInput extends IInputWithoutTypePlaceholder {
  label: string;
  value: string;
}
