import { ForwardedRef, forwardRef } from 'react';
import { useFormInput } from '@shared/hooks/useFormInput';
import { IInput, InputVariants } from './types';
import './Input.scss';

export const InnerInput = (
  props: IInput<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    id,
    name,
    placeholder,
    onChange,
    type,
    value,
    checked,
    isDisabled,
    сlassName,
  } = props;

  const combineClasses = (type: InputVariants, error: boolean): string => {
    const commonClasses = 'form-control mb-2';
    const classesByInputType: Partial<{ [key in InputVariants]: string }> = {
      [InputVariants.CHECKBOX]: 'form-check-input',
      [InputVariants.RADIO]: 'form-check-input',
    };
    return `${commonClasses}${classesByInputType[type] || ''} ${
      error ? 'error-input' : ''
    } ${сlassName || ''}`;
  };

  const options = { ...(onChange ? { onChange } : {}) };

  const ignoreFormContext =
    type === InputVariants.FILE || type === InputVariants.CHECKBOX;

  const {
    ref: innerRef,
    registerParams,
    error,
  } = useFormInput(name, options, ignoreFormContext);
  const inputClassName = combineClasses(type, !!error);

  let resultingProps = {
    id,
    onChange,
    ref: innerRef || ref,
    value,
    name,
    type,
    className: inputClassName,
    placeholder,
    checked,
    disabled: isDisabled,
  };

  if (type !== InputVariants.FILE) {
    resultingProps = {
      ...resultingProps,
      ...registerParams,
    };
  }

  return (
    <>
      <input {...resultingProps} />
      {error && <span className="text-danger">{error.message as string}</span>}
    </>
  );
};

export const Input = forwardRef(InnerInput);
