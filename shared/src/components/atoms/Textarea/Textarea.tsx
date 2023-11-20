import { ChangeEvent, useMemo } from 'react';
import { useFormInput } from '@shared/hooks/useFormInput';
import { TextareaProps } from './types';
import './Textarea.scss';

export const Textarea = (
  props: Omit<TextareaProps<HTMLTextAreaElement>, 'type'>
) => {
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

  const options = { ...(onChange ? { onChange } : {}) };
  const { ref, watch, registerParams, error } = useFormInput(name, options);
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const watchedValue = watch?.(name);

  const innerValue = useMemo(() => {
    return value || watchedValue;
  }, [value, watchedValue]);
  
  return (
    <div className="textarea-wrapper">
      {showCounter && (
        <p className="textarea-count">
          {innerValue?.length}/{maxLength}
        </p>
      )}
      <textarea
        id={id}
        ref={ref}
        value={innerValue}
        name={name}
        onChange={handleTextareaChange}
        className={className}
        placeholder={placeholder}
        disabled={isDisabled}
        maxLength={maxLength}
        {...registerParams}
      />
      {error && <span className="text-danger">{error.message as string}</span>}
    </div>
  );
};
