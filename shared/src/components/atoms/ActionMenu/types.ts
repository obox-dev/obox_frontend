import { EntityState, WithEntityState } from '@shared/utils/types';
import { ButtonVariants } from '../Button/types';

export interface IActionLabelRenderParams {
  state?: EntityState;
}
export interface IAction<T> {
  label?: JSX.Element | string;
  renderLabel?: (params?: IActionLabelRenderParams) => JSX.Element;
  callback: (item: T) => void;
}

export interface IActionMenu<T extends WithEntityState> {
  actions: IAction<T>[];
  entity: T;
  toggleContent: JSX.Element | string;
  toggleVariant?: ButtonVariants;
  isDisabled?: boolean;
}
