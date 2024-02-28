import { ReactNode } from 'react';

export interface ICustomDropdown {
  onClick?: () => void;
  buttonText: string;
  body: ReactNode;
  isOpenColorPicker: boolean;
  initialColor: string;
}

export interface IDropdownButton {
  onClick?: () => void;
  isOpenColorPicker: boolean;
  initialColor: string;
  buttonText: string;
}