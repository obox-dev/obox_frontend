import { IAction } from '@shared/components/atoms/ActionMenu';

export interface TabsSectionProps<T> {
  items: T[];
  title: string;
  buttonText: string;
  currentLanguage: string;
  actions: IAction<T>[];
  mainAction: () => void;
  onTabChange: (tabId: string) => void;
}
