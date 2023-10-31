import { useState, ChangeEvent } from 'react';
import { MenuState } from '@shared/services/MenuService';
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
    onChange,
  } = props;

  const [isChecked, setChecked] = useState(value);

  const innerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    const newValue = value ? MenuState.ENABLED : MenuState.DISABLED;
    setChecked(newValue);
    onChange?.(value);
  };

  const finalText = () => {
    if (text) {
      return text;
    }
    return isChecked ? textForChecked : textForUnchecked;
  };

  return (
    <div className={[isDisabled ? 'disabled' : '', 'switcher'].join(' ')}>
      <InputLabel wrapperClassName="switch">
        <Input
          onChange={innerOnChange}
          name={name}
          type={InputVariants.CHECKBOX}
          isDisabled={isDisabled}
          checked={isChecked === MenuState.ENABLED ? true : false}
        />
        <span className="slider round"></span>
      </InputLabel>
      <span className="switch-text">
        {finalText()}
      </span>
    </div>
  );
};
