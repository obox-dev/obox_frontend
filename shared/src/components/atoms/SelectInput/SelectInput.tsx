import { forwardRef, useImperativeHandle, ForwardedRef } from 'react';
import Select, { StylesConfig } from 'react-select';
import { ISelectInput } from './types';
import './SelectInput.scss';

export const InnerSelectInput = <T,>(
  props: ISelectInput<T>,
  ref: ForwardedRef<unknown>
) => {
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
    value,
    error,
  } = props;

  const customStyle: StylesConfig = {
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
    }),
  };

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  return (
    <>
      <Select
        value={value}
        name={name}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        className={[className, 'basic-single', 'mb-2'].join(' ')}
        classNamePrefix="select"
        components={{ IndicatorSeparator: () => null }}
        styles={customStyle}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isClearable={isClearable || isMulti}
      />
      {error && <span className="text-danger">{error.message as string}</span>}
    </>
  );
};

export const SelectInput = forwardRef(InnerSelectInput);
