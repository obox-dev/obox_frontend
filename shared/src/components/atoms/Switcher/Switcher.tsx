import { Input } from '../Input';
import { InputVariants } from '../Input';
import { InputLabel } from '../InputLabel';
import { ISwitcher } from './types';
import './Switcher.scss';
import { useState } from 'react';
import { ChangeEvent } from 'react';

export const Switcher = (props: ISwitcher) => {
  const { name, onChange, textForChecked, textForUnchecked, isDisabled } =
    props;
  const [isChecked, setChecked] = useState(false);

  const innerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setChecked(value);
    onChange?.(e);
  };

  return (
    <div className={[isDisabled ? 'disabled' : '', 'switcher'].join(' ')}>
      <InputLabel wrapperClassName="switch">
        <Input
          onChange={innerOnChange}
          name={name}
          type={InputVariants.CHECKBOX}
          isDisabled={isDisabled}
        />
        <span className="slider round"></span>
      </InputLabel>
      <span className="switch-text">
        {isChecked ? textForChecked : textForUnchecked}
      </span>
    </div>
  );
};
