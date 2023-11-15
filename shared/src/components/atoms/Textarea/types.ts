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
  showCounter?: boolean;
}

type PropsWithCounter<T> = ITextArea<T> & {
  showCounter: true;
  maxLength: number;
};

type PropsWithoutCounter<T> = ITextArea<T> & {
  showCounter?: false;
  maxLength?: number;
};

export type TextareaProps<T> = PropsWithCounter<T> | PropsWithoutCounter<T>;