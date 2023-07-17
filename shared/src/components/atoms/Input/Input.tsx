import { IInput, InputVariants } from "./types";

export const Input = (props: IInput<HTMLInputElement>) => {
  const { name, placeholder, onChange, type, value, checked } = props;
  const getClass = (type: InputVariants):string => {
    const classes: Partial<{ [key in InputVariants]: string }> = {
      [InputVariants.CHECKBOX]: 'form-check-input',
      [InputVariants.RADIO]: 'form-check-input',
    }
    return classes[type] || "form-control";
  }

  return (
    <input
      value={value}
      name={name}
      type={type}
      onChange={onChange}
      className={getClass(type)}
      placeholder={placeholder}
      checked={checked}
    />
  )
}
