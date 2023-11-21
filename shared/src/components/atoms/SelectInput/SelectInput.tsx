import Select from 'react-select';
import { StylesConfig } from 'react-select';
import { ISelectInput } from './types';
import './SelectInput.scss';

export const SelectInput = <T,>(props: ISelectInput<T>) => {
  const { defaultValue, name, options, isDisabled, className } = props;

  const customStyle: StylesConfig = {
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
    }),
  };

  return (
    <Select
      className={[className, 'basic-single'].join(' ')}
      classNamePrefix="select"
      defaultValue={defaultValue}
      name={name}
      options={options}
      isDisabled={isDisabled}
      components={{ IndicatorSeparator: () => null }}
      styles={customStyle}
    />
  );
};
