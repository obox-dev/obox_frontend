import { IInput } from "../Input/types";

type IInputWithoutTypePlaceholder = Omit<IInput, "placeholder" | "type">

export interface IRadioInput extends IInputWithoutTypePlaceholder {
  label: string;
}
