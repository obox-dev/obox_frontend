import { Input, InputVariants } from '../Input';
import { IRadioInput } from './types';
import { InputLabel } from '../InputLabel';

export const RadioInput = (props: IRadioInput) => {
  const { name, onChange, label, value, checked, isDisabled, id } = props;

  return (
    <div className="form-check">
      <InputLabel className="form-check-label" forInput={id} text={label} wrapperClassName={checked ? "active" : ""}>
        <Input
          id={id}
          value={value}
          name={name}
          checked={checked}
          onChange={onChange}
          type={InputVariants.RADIO}
          isDisabled={isDisabled}
        />
      </InputLabel>
    </div>
  );
};
