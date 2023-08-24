export enum ButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
  LINK = "link",
}

export enum ButtonTypes {
  BUTTON = "button",
  SUBMIT = "submit"
}
export interface IButton {
  text: string;
  onClick?: () => void;
  variant: ButtonVariants;
  isDisabled?: boolean;
  type?: ButtonTypes;
}
