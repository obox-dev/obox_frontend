import { CSSProperties } from 'react';

export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
  LINK = 'link',
  ICON_LINK = 'icon-link',
  TERTIARY = 'tertiary'
}

export enum ButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit'
}
export interface IButton {
  innerContent: JSX.Element | string;
  variant: ButtonVariants;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: ButtonTypes;
  className?: string;
  style?: CSSProperties;
}
