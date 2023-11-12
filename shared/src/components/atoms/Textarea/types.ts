import { ChangeEvent} from 'react';

export interface ITextArea<T> {
  name: string;
  id?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<T>) => void;
  value?: string;
  checked?: boolean;
  isDisabled?: boolean;
  className?: string;
  maxLength?: number;
}