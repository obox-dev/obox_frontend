import { useState, useMemo, ChangeEvent } from 'react';
import { EntityState } from '@shared/utils/types';
import { Input, InputVariants } from '../Input';
import { InputLabel } from '../InputLabel';
import { ISwitcher } from './types';
import './Switcher.scss';

export const Switcher = (props: ISwitcher) => {
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

  const [innerState, setInnerState] = useState(value);

  const innerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    const newValue = value ? EntityState.ENABLED : EntityState.DISABLED;
    setInnerState(newValue);
    onChange?.(value);
  };

  const finalText = useMemo(() => {
    if (text) {
      return text;
    }
    return innerState === EntityState.ENABLED
      ? textForChecked
      : textForUnchecked;
  }, [innerState]);

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
          checked={innerState === EntityState.ENABLED ? true : false}
        />
        <span className="slider round"></span>
      </InputLabel>
      <span className="switch-text">{finalText}</span>
    </div>
  );
};
