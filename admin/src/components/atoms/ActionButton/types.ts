import { ITabItem } from '@admin/components/molecules/Tabs';
import { IAction } from '@shared/components/atoms/ActionMenu';
import { ButtonVariants } from '@shared/components/atoms/Button';

export interface ActionButtonProps<T> extends ITabItem<T> {
  actions: IAction<T>[];
  variant: ButtonVariants;
}
