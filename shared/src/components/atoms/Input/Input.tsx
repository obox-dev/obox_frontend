import { IInput, InputVariants } from "./types";

export const Input = (props: IInput) => {
  const { name, placeholder, onChange, type } = props;
  const getClass = (type: InputVariants):string => {
    const classes: Partial<{ [key in InputVariants]: string }> = {
      [InputVariants.CHECKBOX]: 'form-check-input',
      [InputVariants.RADIO]: 'form-check-input',
    }
    return classes[type] || "form-control";
  }

  return (
    <div className="input-group flex-nowrap">
  <input name={name} type={type} onChange={onChange} className={getClass(type)} placeholder={placeholder}></input>
</div>
  )
}
