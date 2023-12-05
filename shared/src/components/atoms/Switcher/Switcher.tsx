import { useMemo, ChangeEvent, ForwardedRef, forwardRef } from 'react';
import { EntityState } from '@shared/utils/types';
import { Input, InputVariants } from '../Input';
import { InputLabel } from '../InputLabel';
import { ISwitcher } from './types';
import './Switcher.scss';

export const InnerSwitcher = (
  props: ISwitcher,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    name,
    text,
    value,
    textForChecked,
    textForUnchecked,
    isDisabled,
    stopClickPropagation = false,
    onChange,
  } = props;

  const innerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    const newValue = value ? EntityState.ENABLED : EntityState.DISABLED;
    onChange?.(newValue);
  };

  const finalText = useMemo(() => {
    if (text) {
      return text;
    }
    return value === EntityState.ENABLED ? textForChecked : textForUnchecked;
  }, [value]);

  const isChecked = useMemo(() => {
    return value === EntityState.ENABLED ? true : false;
  }, [value]);

  return (
    <div
      className={[isDisabled ? 'disabled' : '', 'switcher'].join(' ')}
      onClick={(e) => {
        // to prevent click event trigger for dish card with redirect
        if (stopClickPropagation) {
          e.stopPropagation();
        }
      }}
    >
      <InputLabel wrapperClassName="switch">
        <Input
          onChange={innerOnChange}
          name={name}
          type={InputVariants.CHECKBOX}
          isDisabled={isDisabled}
          checked={isChecked}
          ref={ref}
        />
        <span className="slider round"></span>
      </InputLabel>
      <span className="switch-text">{finalText}</span>
    </div>
  );
};

export const Switcher = forwardRef(InnerSwitcher);
