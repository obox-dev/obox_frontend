import { useState, ChangeEvent } from 'react';
import { useFormInput } from '@shared/hooks/useFormInput';
import { MenuState } from '@shared/services/MenuService';
import { Input, InputVariants } from '../Input';
import { InputLabel } from '../InputLabel';
import { ISwitcher } from './types';
import './Switcher.scss';

export const Switcher = (props: ISwitcher) => {
  const {
    name,
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

  const { ref, registerParams } = useFormInput(name, {
    onChange: innerOnChange,
  });

  return (
    <div className={[isDisabled ? 'disabled' : '', 'switcher'].join(' ')}>
      <InputLabel wrapperClassName="switch">
        <Input
          {...registerParams}
          onChange={innerOnChange}
          name={name}
          type={InputVariants.CHECKBOX}
          isDisabled={isDisabled}
          innerRef={ref}
          checked={isChecked === MenuState.ENABLED ? true : false}
        />
        <span className="slider round"></span>
      </InputLabel>
      <span className="switch-text">
        {isChecked ? textForChecked : textForUnchecked}
      </span>
    </div>
  );
};
