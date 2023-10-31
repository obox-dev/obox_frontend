import Select from 'react-select';
import { ISelectInput } from './types';

export const SelectInput = <T, >(props: ISelectInput<T>) => {
  const { defaultValue, name, options, isDisabled, className } = props;

  return (
    <Select
      className={[className, 'basic-single'].join(' ')}
      classNamePrefix="select"
      defaultValue={defaultValue}
      name={name}
      options={options}
      isDisabled={isDisabled}
    />
  );
};
