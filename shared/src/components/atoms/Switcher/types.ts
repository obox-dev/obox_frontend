import { IInput  } from "../Input/types";

export interface ISwitcher extends Omit<IInput<HTMLInputElement>, "type"> {
    text?: string;
    textForChecked?: string;
    textForUnchecked?: string;
    isDisabled?: boolean;
};