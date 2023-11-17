import { ChangeEvent, Ref } from 'react';

export enum InputVariants {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  HIDDEN = 'hidden',
  FILE = 'file'
}

export interface IInput<T> {
  name: string;
  type: InputVariants;
  id?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<T>) => void;
  value?: string;
  checked?: boolean;
  isDisabled?: boolean;
  innerRef?: Ref<T>;
  сlassName?: string;
}
