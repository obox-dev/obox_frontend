import { Input, InputVariants } from "../Input";
import { IRadioInput } from "./types";
import { InputLabel } from "../InputLabel";

export const RadioInput = (props: IRadioInput) => {
  const {
    name,
    onChange,
    label,
    value,
    checked,
    isDisabled,
  } = props;

  return (
    <div className="form-check mb-2">
      <Input
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        type={InputVariants.RADIO}
        isDisabled={isDisabled}
      />
      <InputLabel
        className="form-check-label"
        forInput={name}
        text={label}
      />
    </div>
  )
}
