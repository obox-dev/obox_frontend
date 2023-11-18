import { IAction } from '@shared/components/atoms/ActionMenu';
import { ButtonVariants } from '@shared/components/atoms/Button';

export interface ActionButtonProps<T> {
  id: string;
  label: string;
  actions: IAction<T>[];
  entity: T;
  isSelected: boolean;
  onClick: (id: string) => void;
  variant: ButtonVariants;
}
