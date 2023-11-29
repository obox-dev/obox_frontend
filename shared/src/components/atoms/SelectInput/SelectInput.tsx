import Select from 'react-select';
import { StylesConfig } from 'react-select';
import { useFormInput } from '@shared/hooks/useFormInput';
import { ISelectInput, OptionType } from './types';
import './SelectInput.scss';

export const SelectInput = <T,>(props: ISelectInput<T>) => {
  const {
    defaultValue,
    name,
    options,
    isDisabled,
    className,
    isMulti = false,
    closeMenuOnSelect = true,
    onChange,
    placeholder,
    isClearable = false,
  } = props;

  const customStyle: StylesConfig = {
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
    }),
  };

  const { ref } = useFormInput(name);

  const innerOnChange = (e: OptionType<T> | OptionType<T>[]) => {
    if (isMulti) {
      onChange?.(e as OptionType<T>[]);
    } else {
      onChange?.(e as OptionType<T>);
    }
  };

  return (
    <Select
      ref={ref}
      className={[className, 'basic-single'].join(' ')}
      classNamePrefix="select"
      defaultValue={defaultValue}
      name={name}
      options={options}
      isDisabled={isDisabled}
      components={{ IndicatorSeparator: () => null }}
      styles={customStyle}
      isMulti={isMulti}
      closeMenuOnSelect={closeMenuOnSelect}
      onChange={(e) => {
        innerOnChange(e as OptionType<T>[] | OptionType<T>);
      }}
      placeholder={placeholder}
      isClearable={isClearable || isMulti}
    />
  );
};
