import { useFormContext } from 'react-hook-form';
import { TextareaProps } from './types';
import './Textarea.scss';
import { ChangeEvent, useState } from 'react';

export const Textarea = (
  props: Omit<TextareaProps<HTMLTextAreaElement>, 'type'>
) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const {
    id,
    name,
    placeholder,
    onChange,
    value,
    isDisabled,
    className,
    maxLength,
    showCounter,
  } = props;

  const [count, setCount] = useState(value ? value.length : 0);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value.length);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="textarea-wrapper">
      {showCounter && (
        <p className="textarea-count">
          {count}/{maxLength}
        </p>
      )}
      <textarea
        {...register(name, {
          onChange,
        })}
        id={id}
        value={value}
        name={name}
        onChange={handleTextareaChange}
        className={className}
        placeholder={placeholder}
        disabled={isDisabled}
        maxLength={maxLength}
      />
      {errors[name] && (
        <span className="text-danger">{errors[name]?.message as string}</span>
      )}
    </div>
  );
};
