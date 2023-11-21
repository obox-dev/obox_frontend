import { IAction } from '@shared/components/atoms/ActionMenu';

export interface ITabItem<T> {
  id: string;
  label: string;
  entity: T,
  isSelected: boolean;
  isDisabled: boolean;
  onClick: (id: string) => void;
}

export interface ITabs<T> {
  items: ITabItem<T>[];
  actions: IAction<T>[];
  addToList: JSX.Element;
}
