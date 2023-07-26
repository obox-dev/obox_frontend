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

export interface IButton {
  text: string;
  onClick?: () => void;
  variant: ButtonVariants;
  isDisabled?: boolean;
}
