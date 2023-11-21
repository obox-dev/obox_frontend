import { useFormInput } from '@shared/hooks/useFormInput';
import { IInput, InputVariants } from './types';
import './Input.scss';

export const Input = (props: IInput<HTMLInputElement>) => {
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

  const combineClasses = (type: InputVariants, error: boolean, ): string => {
    const commonClasses = 'form-control mb-2';
    const classesByInputType: Partial<{ [key in InputVariants]: string }> = {
      [InputVariants.CHECKBOX]: 'form-check-input',
      [InputVariants.RADIO]: 'form-check-input',
    };
    return `${commonClasses}${classesByInputType[type] || ''} ${error ? 'error-input' : ''} ${сlassName || ''}`;
  };

  const options = { ...(onChange ? { onChange } : {}) };
  const { ref, registerParams, error } = useFormInput(name, options);
  const inputClassName = combineClasses(type, !!error);

  return (
    <>
      <input
        onChange={onChange}
        id={id}
        ref={ref}
        value={value}
        name={name}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        checked={checked}
        disabled={isDisabled}
        {...registerParams}
      />
      {error && <span className="text-danger">{error.message as string}</span>}
    </>
  );
};
