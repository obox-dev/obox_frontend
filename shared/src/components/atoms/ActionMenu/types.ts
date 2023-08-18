import { IButton, ButtonVariants } from "../Button/types";

export interface IActionToggle extends IButton {
  id: string;
  dataBsToggle: string;
  ariaExpanded: boolean;
}

export interface IAction<T> {
  label: string;
  callback: (item: T) => void;
}

export interface IActionMenu<T> {
  actions: IAction<T>[];
  category: T;
}
