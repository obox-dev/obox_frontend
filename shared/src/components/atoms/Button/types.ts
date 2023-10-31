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
  ICON_LINK = "icon-link"
}

export enum ButtonTypes {
  BUTTON = "button",
  SUBMIT = "submit"
}
export interface IButton {
  text: string;
  variant: ButtonVariants;
  icon?: JSX.Element;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: ButtonTypes;
}
