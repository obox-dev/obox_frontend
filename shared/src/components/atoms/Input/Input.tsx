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
    className,
  } = props;

  const combineClasses = (type: InputVariants): string => {
    const commonClasses = 'form-control mb-2';
    const classesByInputType: Partial<{ [key in InputVariants]: string }> = {
      [InputVariants.CHECKBOX]: 'form-check-input',
      [InputVariants.RADIO]: 'form-check-input',
    };
    return `${commonClasses} ${classesByInputType[type] || ''} ${className}`;
  };

  const options = { ...(onChange ? { onChange } : {}) };

  const { ref, registerParams, error } = useFormInput(name, options);

  return (
    <>
      <input
        onChange={onChange}
        id={id}
        ref={ref}
        value={value}
        name={name}
        type={type}
        className={combineClasses(type)}
        placeholder={placeholder}
        checked={checked}
        disabled={isDisabled}
        {...registerParams}
      />
      {error && <span className="text-danger">{error.message as string}</span>}
    </>
  );
};
