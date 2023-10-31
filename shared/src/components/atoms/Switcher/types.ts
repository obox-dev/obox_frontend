import { IInput } from "../Input/types";

export interface ISwitcher extends Omit<IInput<HTMLInputElement>, "type" | "onChange"> {
    text?: string;
    textForChecked?: string;
    textForUnchecked?: string;
    isDisabled?: boolean;
    onChange?: (value: boolean) => void;
};