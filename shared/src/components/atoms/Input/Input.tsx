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
    className,
    innerRef,
  } = props;

  const combineClasses = (type: InputVariants):string => {
    const commonClasses = "form-control mb-2";
    const classesByInputType: Partial<{ [key in InputVariants]: string }> = {
      [InputVariants.CHECKBOX]: 'form-check-input',
      [InputVariants.RADIO]: 'form-check-input',
    }
    return `${commonClasses} ${classesByInputType[type] || ''} ${className}`;;
  }

  return (
    <input
      id={id}
      ref={innerRef}
      value={value}
      name={name}
      type={type}
      onChange={onChange}
      className={combineClasses(type)}
      placeholder={placeholder}
      checked={checked}
      disabled={isDisabled}
      />
  )
}
