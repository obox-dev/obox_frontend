import { IInput, InputVariants } from "./types";

export const Input = (props: IInput<HTMLInputElement>) => {
  const {
    id,
    name,
    placeholder,
    onChange,
    type,
    value,
    checked,
    isDisabled,
  } = props;

  const getClass = (type: InputVariants):string => {
    const classes: Partial<{ [key in InputVariants]: string }> = {
      [InputVariants.CHECKBOX]: 'form-check-input',
      [InputVariants.RADIO]: 'form-check-input',
    }
    return classes[type] || "form-control mb-2";
  }

  return (
    <input
      id={id}
      value={value}
      name={name}
      type={type}
      onChange={onChange}
      className={getClass(type)}
      placeholder={placeholder}
      checked={checked}
      disabled={isDisabled}
    />
  )
}
